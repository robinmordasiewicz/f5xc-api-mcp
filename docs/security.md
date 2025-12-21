# Security Best Practices

## Credential Storage Security

### File Permissions

The configuration file is protected with strict POSIX permissions:

- **Directory (`~/.f5xc/`)**: `0700` (user read/write/execute only)
- **File (`credentials.json`)**: `0600` (user read/write only)

No group or other users can access your credentials. The system automatically:

- Creates directories with correct permissions
- Detects and corrects insecure permissions
- Warns if improper permissions are detected

### Plaintext Storage

Credentials are stored in plaintext JSON. This is the same approach used by:

- AWS CLI (`.aws/credentials`)
- kubectl (`~/.kube/config`)
- Cloud SDKs (gcloud, az, etc.)

**Security relies on file system protection**, not encryption. Secure your system:

1. **Use Full-Disk Encryption**
   - macOS: Enable FileVault
   - Linux: Use LUKS or dm-crypt
   - Windows: Enable BitLocker

2. **Minimize Credential Exposure**
   - Never commit credentials to version control
   - Never share credentials via email/chat
   - Never display credentials in logs or output
   - Use `.gitignore` to protect config files

3. **Restrict File Access**

   ```bash
   # Verify permissions
   ls -la ~/.f5xc/credentials.json
   # Should show: -rw------- (600)

   # Verify directory permissions
   ls -la ~/.f5xc
   # Should show: drwx------ (700)
   ```

## Credential Management

### API Token Security

API tokens are:

- Long-lived credentials with full tenant access
- Should be treated like passwords
- Cannot be revoked at the token level (must revoke and re-issue)

**Best Practices:**

- Create tokens with minimal scope if your XC Console supports scoped tokens
- Rotate tokens regularly (quarterly or as part of security policy)
- Revoke old tokens immediately after rotating
- Never share tokens with untrusted parties
- Never include tokens in error messages or logs

### P12 Certificate Security

P12 certificates are:

- Used for mutual TLS (mTLS) authentication
- Password-protected private key + certificate
- More secure than API tokens for automated integrations

**Best Practices:**

- Use strong passwords for P12 certificates (16+ characters, mixed case/numbers/symbols)
- Store passwords separately from the certificate file
- Restrict certificate file access: `chmod 400 certificate.p12`
- Use certificate rotation policies
- Enable certificate expiration monitoring

### Environment Variable Security

When using environment variables:

- Do not add them to shell profile files (`.bashrc`, `.zshrc`, etc.)
- Use temporary session variables: `export F5XC_API_TOKEN=xxx && command`
- Clear history: `history -c`
- Use CI/CD secrets management instead of hardcoding

## CI/CD Integration

### GitHub Actions

Use GitHub Secrets for credentials:

```yaml
env:
  F5XC_API_URL: ${{ secrets.F5XC_API_URL }}
  F5XC_API_TOKEN: ${{ secrets.F5XC_API_TOKEN }}
```

Never:

- Hardcode credentials in workflows
- Log secrets in output
- Pass secrets as command arguments

### GitLab CI

Use CI/CD variables (masked and protected):

```yaml
F5XC_API_URL:
  value: "https://tenant.console.ves.volterra.io"
  protected: true
  masked: false

F5XC_API_TOKEN:
  value: "your-token"
  protected: true
  masked: true
```

### Jenkins

Use Jenkins Credentials Plugin:

```groovy
withCredentials([string(credentialsId: 'f5xc-token', variable: 'F5XC_API_TOKEN')]) {
  // Build step
}
```

## Authentication Methods

### API Token (Default)

**Pros:**

- Simplest to use
- Immediate activation
- Easy to manage in profiles

**Cons:**

- Long-lived credentials
- No client certificate verification
- Full tenant access unless scoped

**Use Cases:**

- Development and testing
- Single-tenant environments
- Automated tasks with limited scope

### P12 Certificate (mTLS)

**Pros:**

- Mutual authentication (both client and server verified)
- Private key stays local
- Better for production integrations
- Can be rotated more frequently

**Cons:**

- More setup complexity
- Requires certificate management infrastructure
- Password required for key

**Use Cases:**

- Production automation
- Multi-tenant environments
- High-security requirements
- Regulatory compliance needs

## Profile Security

### Securing Profile Files

- Never commit `~/.f5xc/credentials.json` to version control
- Add to `.gitignore`:

  ```bash
  .f5xc/
  ~/.f5xc/
  ```

- Never copy profile files between machines
- Use `f5xc-api-mcp --setup` on each machine to create profiles

### Profile Isolation

- Each profile represents one credential set
- Use profiles to isolate different environments:
  - `production` - Production tenant
  - `staging` - Staging environment
  - `development` - Development/test
  - `demo` - Demo/sandbox tenant

- Default profile selection prevents accidents
- Environment variable override requires explicit opt-in

## Logging and Output

### Log Levels

Configure logging with `LOG_LEVEL`:

```bash
# Minimal logging (errors only)
LOG_LEVEL=error f5xc-api-mcp

# Production logging
LOG_LEVEL=info f5xc-api-mcp

# Debug logging (includes request/response details)
LOG_LEVEL=debug f5xc-api-mcp
```

### Credential Redaction

The system automatically redacts sensitive information:

- API tokens shown as `***` with last 4 characters
- P12 passwords never logged
- Full URLs shown (contains tenant name, not secrets)

### Audit Logging

Enable comprehensive logging for audit trails:

```bash
LOG_LEVEL=info F5XC_API_TOKEN=xxx f5xc-api-mcp > audit.log 2>&1
```

Review logs for:

- Unexpected authentication failures
- API calls to sensitive operations
- Profile switching events
- Error conditions

## Incident Response

### Compromised Token

If you suspect an API token is compromised:

1. **Immediate Actions:**

   ```bash
   # Remove from profile
   f5xc-api-mcp --delete-profile compromised-profile

   # Clear from environment
   unset F5XC_API_TOKEN
   ```

2. **In F5XC Console:**
   - Revoke the compromised token
   - Create a new token with the same scope
   - Update all profiles using the old token

3. **Review Activity:**
   - Check audit logs for unauthorized API calls
   - Verify all resources are in expected state
   - Check for any suspicious modifications

### Compromised Certificate

If your P12 certificate is compromised:

1. **Immediate Actions:**

   ```bash
   # Remove from profile
   f5xc-api-mcp --delete-profile compromised-cert

   # Delete the certificate file securely
   shred -vfz -n 10 certificate.p12
   ```

2. **In F5XC Console:**
   - Revoke the certificate
   - Issue a new certificate with different key
   - Update profiles with new certificate path

3. **Review Activity:**
   - Check which mTLS connections used the certificate
   - Verify timestamp of last legitimate use
   - Check for any suspicious API activity

### File System Compromise

If `~/.f5xc/credentials.json` is compromised:

1. **Immediate Actions:**

   ```bash
   # Disable all profiles immediately
   for profile in $(f5xc-api-mcp --list-profiles); do
     f5xc-api-mcp --delete-profile "$profile"
   done
   ```

2. **Revoke All Credentials:**
   - Revoke all API tokens in F5XC Console
   - Revoke all certificates
   - Create new tokens/certificates

3. **Rebuild Profiles:**

   ```bash
   f5xc-api-mcp --setup
   ```

## Compliance and Auditing

### Security Checklist

- [ ] File permissions verified: `ls -la ~/.f5xc/`
- [ ] No credentials in shell history: `history | grep F5XC`
- [ ] Credentials not in version control: `git log --all -S F5XC`
- [ ] `.gitignore` includes `.f5xc/`
- [ ] Regular token rotation schedule defined
- [ ] P12 passwords stored securely (not in email/chat)
- [ ] CI/CD secrets configured correctly
- [ ] Audit logs reviewed regularly
- [ ] Incident response plan documented
- [ ] Team trained on credential handling

### Audit Trail

Maintain audit trail of:

- Profile creation and modification times
- Token issuance and rotation dates
- Certificate expiration dates
- API calls made through each profile
- Any permission errors or security warnings

### Regular Reviews

Monthly:

- Review profile list
- Check for unused profiles
- Verify audit logs for suspicious activity

Quarterly:

- Rotate API tokens
- Review certificate expiration dates
- Update security procedures if needed
- Audit all CI/CD integrations

## Security Contacts

If you discover a security vulnerability in f5xc-api-mcp:

1. **Do not** open a public GitHub issue
2. **Do** contact the maintainer privately
3. Provide:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested remediation

## Additional Resources

- [F5XC Security Documentation](https://docs.cloud.f5.com/)
- [OWASP Secrets Management](https://owasp.org/www-project-devsecops-guidelines/latest/02a-Secrets-Management)
- [GitGuardian Secrets Detection](https://www.gitguardian.com/)
- [SonarQube Security Analysis](https://www.sonarqube.org/)

## Version History

- **v3.0.0** - Profile-based configuration with secure file permissions
- **v2.0.x** - Environment variable support
- **v1.x.x** - Initial release
