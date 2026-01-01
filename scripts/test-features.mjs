/**
 * Integration test script for new profile management features
 */

import { ProfileManager, getProfileManager } from '../dist/profile/index.js';
import { CredentialManager, AuthMode } from '../dist/auth/credential-manager.js';
import path from 'path';
import fs from 'fs';
import os from 'os';

// Use a test directory to avoid polluting real config
const TEST_CONFIG_DIR = '/tmp/test-xcsh-config';
process.env.XDG_CONFIG_HOME = TEST_CONFIG_DIR;

async function cleanup() {
  if (fs.existsSync(TEST_CONFIG_DIR)) {
    fs.rmSync(TEST_CONFIG_DIR, { recursive: true });
  }
}

async function testProfileManager() {
  console.log('\n=== Testing ProfileManager ===\n');

  // Clean up before test
  await cleanup();

  // Get singleton instance
  const pm = getProfileManager();
  console.log('✓ Got ProfileManager singleton');

  // Test directory creation
  await pm.ensureDirectories();
  const configDir = path.join(TEST_CONFIG_DIR, 'xcsh');
  const profilesDir = path.join(configDir, 'profiles');

  if (!fs.existsSync(configDir)) {
    throw new Error('Config directory not created');
  }
  if (!fs.existsSync(profilesDir)) {
    throw new Error('Profiles directory not created');
  }
  console.log('✓ Directories created at:', configDir);

  // Test list (should be empty)
  let profiles = await pm.list();
  if (profiles.length !== 0) {
    throw new Error('Expected empty profiles list');
  }
  console.log('✓ Empty profile list verified');

  // Test save profile
  const testProfile = {
    name: 'test-profile',
    apiUrl: 'https://test-tenant.console.ves.volterra.io/api',
    apiToken: 'test-token-12345',
    defaultNamespace: 'production'
  };

  const saveResult = await pm.save(testProfile);
  if (!saveResult.success) {
    throw new Error('Failed to save profile: ' + saveResult.message);
  }
  console.log('✓ Profile saved:', testProfile.name);

  // Verify file exists
  const profilePath = path.join(profilesDir, 'test-profile.json');
  if (!fs.existsSync(profilePath)) {
    throw new Error('Profile file not created');
  }
  console.log('✓ Profile file created at:', profilePath);

  // Test get profile
  const retrieved = await pm.get('test-profile');
  if (!retrieved) {
    throw new Error('Failed to get profile');
  }
  if (retrieved.name !== testProfile.name) {
    throw new Error('Profile name mismatch');
  }
  if (retrieved.apiUrl !== testProfile.apiUrl) {
    throw new Error('Profile apiUrl mismatch');
  }
  if (retrieved.apiToken !== testProfile.apiToken) {
    throw new Error('Profile apiToken mismatch');
  }
  console.log('✓ Profile retrieved successfully');

  // Test exists
  const exists = await pm.exists('test-profile');
  if (!exists) {
    throw new Error('exists() returned false for existing profile');
  }
  const notExists = await pm.exists('nonexistent');
  if (notExists) {
    throw new Error('exists() returned true for nonexistent profile');
  }
  console.log('✓ exists() works correctly');

  // Test list (should have one)
  profiles = await pm.list();
  if (profiles.length !== 1) {
    throw new Error('Expected 1 profile, got ' + profiles.length);
  }
  console.log('✓ Profile list contains 1 profile');

  // Test set active
  const setActiveResult = await pm.setActive('test-profile');
  if (!setActiveResult.success) {
    throw new Error('Failed to set active profile: ' + setActiveResult.message);
  }
  console.log('✓ Active profile set');

  // Test get active
  const activeName = await pm.getActive();
  if (activeName !== 'test-profile') {
    throw new Error('Expected active profile "test-profile", got "' + activeName + '"');
  }
  console.log('✓ Active profile name retrieved:', activeName);

  // Test get active profile
  const activeProfile = await pm.getActiveProfile();
  if (!activeProfile) {
    throw new Error('Failed to get active profile');
  }
  if (activeProfile.name !== 'test-profile') {
    throw new Error('Active profile name mismatch');
  }
  console.log('✓ Full active profile retrieved');

  // Test mask profile
  const masked = pm.maskProfile(activeProfile);
  // Masked format is ****<last4chars> for tokens > 4 chars, or **** for shorter tokens
  if (!masked.apiToken.startsWith('****')) {
    throw new Error('apiToken not masked - got: ' + masked.apiToken);
  }
  console.log('✓ Profile masking works');

  // Test save second profile
  const secondProfile = {
    name: 'staging',
    apiUrl: 'https://staging-tenant.console.ves.volterra.io/api',
    apiToken: 'staging-token',
  };
  await pm.save(secondProfile);
  profiles = await pm.list();
  if (profiles.length !== 2) {
    throw new Error('Expected 2 profiles, got ' + profiles.length);
  }
  console.log('✓ Second profile saved');

  // Test delete (non-active profile)
  const deleteResult = await pm.delete('staging');
  if (!deleteResult.success) {
    throw new Error('Failed to delete profile: ' + deleteResult.message);
  }
  profiles = await pm.list();
  if (profiles.length !== 1) {
    throw new Error('Expected 1 profile after delete, got ' + profiles.length);
  }
  console.log('✓ Profile deleted');

  // Test delete active profile (should fail or require force)
  const deleteActiveResult = await pm.delete('test-profile');
  if (deleteActiveResult.success) {
    throw new Error('Should not be able to delete active profile without force');
  }
  console.log('✓ Cannot delete active profile without force');

  // Test clear active and then delete
  await pm.clearActive();
  const clearedActive = await pm.getActive();
  if (clearedActive !== null) {
    throw new Error('Active profile should be null after clear');
  }
  console.log('✓ Active profile cleared');

  const deleteAfterClear = await pm.delete('test-profile');
  if (!deleteAfterClear.success) {
    throw new Error('Should be able to delete after clearing active');
  }
  console.log('✓ Profile deleted after clearing active');

  // Verify empty
  profiles = await pm.list();
  if (profiles.length !== 0) {
    throw new Error('Expected 0 profiles, got ' + profiles.length);
  }
  console.log('✓ All profiles deleted');

  console.log('\n=== ProfileManager Tests PASSED ===\n');
}

async function testCredentialManagerWithProfiles() {
  console.log('\n=== Testing CredentialManager with Profiles ===\n');

  // Clean up
  await cleanup();

  // Clear env vars
  delete process.env.F5XC_API_URL;
  delete process.env.F5XC_API_TOKEN;
  delete process.env.F5XC_P12_BUNDLE;
  delete process.env.F5XC_CERT;
  delete process.env.F5XC_KEY;

  // Create a profile
  const pm = getProfileManager();
  await pm.ensureDirectories();

  const profile = {
    name: 'cred-test',
    apiUrl: 'https://cred-tenant.console.ves.volterra.io/api',
    apiToken: 'cred-token-abc',
    defaultNamespace: 'default'
  };
  await pm.save(profile);
  await pm.setActive('cred-test');
  console.log('✓ Test profile created and set as active');

  // Create CredentialManager and initialize
  const cm = new CredentialManager();
  await cm.initialize();

  // Verify it loaded from profile
  if (cm.getAuthMode() !== AuthMode.TOKEN) {
    throw new Error('Expected TOKEN auth mode, got ' + cm.getAuthMode());
  }
  console.log('✓ CredentialManager auth mode is TOKEN');

  if (cm.getApiUrl() !== profile.apiUrl) {
    throw new Error('API URL mismatch: expected ' + profile.apiUrl + ', got ' + cm.getApiUrl());
  }
  console.log('✓ API URL loaded from profile');

  if (cm.getToken() !== profile.apiToken) {
    throw new Error('Token mismatch');
  }
  console.log('✓ Token loaded from profile');

  if (cm.getTenant() !== 'cred-tenant') {
    throw new Error('Tenant mismatch: expected cred-tenant, got ' + cm.getTenant());
  }
  console.log('✓ Tenant extracted correctly');

  if (cm.getNamespace() !== profile.defaultNamespace) {
    throw new Error('Namespace mismatch');
  }
  console.log('✓ Namespace loaded from profile');

  if (!cm.isAuthenticated()) {
    throw new Error('Should be authenticated');
  }
  console.log('✓ CredentialManager is authenticated');

  // Test env var override
  process.env.F5XC_API_URL = 'https://env-tenant.console.ves.volterra.io/api';
  process.env.F5XC_API_TOKEN = 'env-token-xyz';

  await cm.reload();

  if (cm.getToken() !== 'env-token-xyz') {
    throw new Error('Env var should override profile');
  }
  console.log('✓ Environment variables override profile');

  // Clean up
  delete process.env.F5XC_API_URL;
  delete process.env.F5XC_API_TOKEN;

  console.log('\n=== CredentialManager Tests PASSED ===\n');
}

async function testDocumentationMode() {
  console.log('\n=== Testing Documentation Mode ===\n');

  // Clean up
  await cleanup();

  // Clear all env vars
  delete process.env.F5XC_API_URL;
  delete process.env.F5XC_API_TOKEN;
  delete process.env.F5XC_P12_BUNDLE;
  delete process.env.F5XC_CERT;
  delete process.env.F5XC_KEY;

  // Don't create any profiles
  const pm = getProfileManager();
  await pm.ensureDirectories();

  // Create CredentialManager
  const cm = new CredentialManager();
  await cm.initialize();

  if (cm.getAuthMode() !== AuthMode.NONE) {
    throw new Error('Expected NONE auth mode, got ' + cm.getAuthMode());
  }
  console.log('✓ Auth mode is NONE (documentation mode)');

  if (cm.isAuthenticated()) {
    throw new Error('Should not be authenticated in documentation mode');
  }
  console.log('✓ Not authenticated in documentation mode');

  if (cm.getApiUrl() !== null) {
    throw new Error('API URL should be null');
  }
  console.log('✓ API URL is null');

  if (cm.getToken() !== null) {
    throw new Error('Token should be null');
  }
  console.log('✓ Token is null');

  console.log('\n=== Documentation Mode Tests PASSED ===\n');
}

async function main() {
  try {
    await testProfileManager();
    await testCredentialManagerWithProfiles();
    await testDocumentationMode();

    console.log('\n✅ ALL INTEGRATION TESTS PASSED ✅\n');

    // Final cleanup
    await cleanup();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ TEST FAILED:', error.message);
    console.error(error.stack);
    await cleanup();
    process.exit(1);
  }
}

main();
