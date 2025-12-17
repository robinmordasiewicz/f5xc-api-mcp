# App Firewall (WAF)

The App Firewall provides Web Application Firewall protection for HTTP Load Balancers.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-waap-app-firewall-create` | Create a new App Firewall policy |
| `f5xc-api-waap-app-firewall-get` | Get App Firewall details |
| `f5xc-api-waap-app-firewall-list` | List App Firewalls in namespace |
| `f5xc-api-waap-app-firewall-update` | Update App Firewall configuration |
| `f5xc-api-waap-app-firewall-delete` | Delete App Firewall |

## Required Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| namespace | string | Target namespace |
| name | string | Firewall policy name |

## Example Usage

### Create WAF Policy

Ask Claude:

> "Create a WAF policy named 'api-protection' in the 'production' namespace with blocking mode"

### f5xcctl Equivalent

```bash
f5xcctl apply -f - <<EOF
apiVersion: config.volterra.io/v1
kind: app_firewall
metadata:
  name: api-protection
  namespace: production
spec:
  detection_settings:
    signature_selection_setting:
      default_attack_type_settings: {}
      high_medium_accuracy_signatures: {}
    enable_suppression: {}
    enable_threat_campaigns: {}
  bot_protection_setting:
    malicious_bot_action: BLOCK
    suspicious_bot_action: REPORT
    good_bot_action: REPORT
  blocking: {}
EOF
```

### Terraform Resource

```hcl
resource "volterra_app_firewall" "api_protection" {
  name      = "api-protection"
  namespace = "production"

  detection_settings {
    signature_selection_setting {
      default_attack_type_settings {}
      high_medium_accuracy_signatures {}
    }
    enable_suppression {}
    enable_threat_campaigns {}
  }

  bot_protection_setting {
    malicious_bot_action  = "BLOCK"
    suspicious_bot_action = "REPORT"
    good_bot_action       = "REPORT"
  }

  blocking {}
}
```

## Operating Modes

### Blocking Mode

Actively blocks detected threats:

```json
{
  "blocking": {}
}
```

### Monitoring Mode

Logs threats without blocking:

```json
{
  "monitoring": {}
}
```

!!! tip "Best Practice"
    Start with monitoring mode, review logs, then enable blocking.

## Detection Settings

### Signature Selection

```json
{
  "detection_settings": {
    "signature_selection_setting": {
      "default_attack_type_settings": {},
      "high_medium_accuracy_signatures": {}
    }
  }
}
```

Options:
- `high_medium_accuracy_signatures` - Balanced (recommended)
- `high_medium_low_accuracy_signatures` - More sensitive
- `only_high_accuracy_signatures` - Fewer false positives

### Attack Types

Enable specific attack detection:

```json
{
  "detection_settings": {
    "signature_selection_setting": {
      "attack_type_settings": {
        "disabled_attack_types": ["ATTACK_TYPE_COMMAND_EXECUTION"]
      }
    }
  }
}
```

### Threat Campaigns

Enable protection against known attack campaigns:

```json
{
  "detection_settings": {
    "enable_threat_campaigns": {}
  }
}
```

## Bot Protection

### Basic Bot Settings

```json
{
  "bot_protection_setting": {
    "malicious_bot_action": "BLOCK",
    "suspicious_bot_action": "REPORT",
    "good_bot_action": "REPORT"
  }
}
```

Actions:
- `BLOCK` - Block the request
- `REPORT` - Log but allow
- `IGNORE` - No action

### Advanced Bot Defense

For advanced bot mitigation (JavaScript challenge, CAPTCHA):

```json
{
  "bot_defense_setting": {
    "regional_endpoint": "US",
    "policy": {
      "namespace": "production",
      "name": "advanced-bot-policy"
    }
  }
}
```

!!! note "Subscription Required"
    Advanced Bot Defense requires ADVANCED tier subscription.

## Exclusion Rules

### Exclude Specific Paths

```json
{
  "detection_settings": {
    "exclude_list": [{
      "path": {
        "prefix": "/api/webhook"
      },
      "methods": ["POST"],
      "metadata": {
        "name": "webhook-exclusion"
      }
    }]
  }
}
```

### Exclude Specific Signatures

```json
{
  "detection_settings": {
    "signature_selection_setting": {
      "disabled_signature_ids": [200001234, 200005678]
    }
  }
}
```

## Attach to Load Balancer

Reference the firewall in your HTTP Load Balancer:

```json
{
  "app_firewall": {
    "namespace": "production",
    "name": "api-protection"
  }
}
```

Or via Terraform:

```hcl
resource "volterra_http_loadbalancer" "my_app" {
  # ... other config ...

  app_firewall {
    namespace = volterra_app_firewall.api_protection.namespace
    name      = volterra_app_firewall.api_protection.name
  }
}
```

## Related Resources

- [HTTP Load Balancer](http-loadbalancer.md) - Applies WAF policy
- [Service Policy](service-policy.md) - Additional security rules

## Subscription Tier

**ADVANCED** - Requires advanced F5XC subscription.

## Troubleshooting

### "False positives blocking legitimate traffic"

1. Check security events in F5XC Console
2. Identify signature IDs causing blocks
3. Add exclusion rules for specific paths/signatures
4. Consider switching to monitoring mode temporarily

### "Bot protection not working"

1. Verify bot protection settings are configured
2. Check that JavaScript is enabled in client browser
3. Review bot defense logs in Console

### "Performance impact"

1. Review detection settings scope
2. Disable unnecessary attack types
3. Use exclusion rules for high-traffic, low-risk paths
