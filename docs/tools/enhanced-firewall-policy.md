# Enhanced Firewall Policy

Enhanced Firewall Policies provide advanced layer 3/4 traffic filtering with stateful inspection,
application awareness, and sophisticated matching criteria.

!!! info "Subscription Tier"
    **ADVANCED** - Requires advanced F5XC subscription tier.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-network-enhanced-firewall-policy-create` | Create an Enhanced Firewall Policy |
| `f5xc-api-network-enhanced-firewall-policy-get` | Get Enhanced Firewall Policy details |
| `f5xc-api-network-enhanced-firewall-policy-list` | List Enhanced Firewall Policies |
| `f5xc-api-network-enhanced-firewall-policy-update` | Update Enhanced Firewall Policy |
| `f5xc-api-network-enhanced-firewall-policy-delete` | Delete Enhanced Firewall Policy |

## Required Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| namespace | string | Target namespace |
| name | string | Policy name |
| rule_list | array | Enhanced firewall rules |

## Example Usage

### Create Enhanced Firewall Policy

Ask Claude:

> "Create an enhanced firewall policy named 'example-efp' with application-aware rules for web traffic"

### f5xcctl Equivalent

```bash
f5xcctl apply -f - <<EOF
apiVersion: config.volterra.io/v1
kind: enhanced_firewall_policy
metadata:
  name: example-efp
  namespace: production
spec:
  rule_list:
    rules:
      - metadata:
          name: allow-https
        spec:
          action: ALLOW
          advanced_action:
            action: ALLOW
          applications:
            - HTTPS
          logging_action: LOG
      - metadata:
          name: deny-suspicious
        spec:
          action: DENY
          threat_categories:
            - MALWARE
            - BOTNET
EOF
```

### Terraform Resource

```hcl
resource "volterra_enhanced_firewall_policy" "example_efp" {
  name      = "example-efp"
  namespace = "production"

  rule_list {
    rules {
      metadata {
        name = "allow-https"
      }
      spec {
        action = "ALLOW"
        advanced_action {
          action = "ALLOW"
        }
        applications   = ["HTTPS"]
        logging_action = "LOG"
      }
    }

    rules {
      metadata {
        name = "deny-suspicious"
      }
      spec {
        action            = "DENY"
        threat_categories = ["MALWARE", "BOTNET"]
      }
    }
  }
}
```

## Advanced Features

| Feature | Description |
|---------|-------------|
| Application Awareness | Identify traffic by application signatures |
| Threat Categories | Block known malicious traffic patterns |
| URL Filtering | Filter based on URL categories |
| Stateful Inspection | Track connection states |
| Deep Packet Inspection | Analyze packet payloads |

## Common Configurations

### Application-Based Rules

```json
{
  "name": "example-efp",
  "rule_list": {
    "rules": [{
      "metadata": {"name": "allow-business-apps"},
      "spec": {
        "action": "ALLOW",
        "applications": [
          "HTTP",
          "HTTPS",
          "DNS",
          "NTP"
        ]
      }
    }]
  }
}
```

### Threat Protection

```json
{
  "rule_list": {
    "rules": [{
      "metadata": {"name": "block-threats"},
      "spec": {
        "action": "DENY",
        "threat_categories": [
          "MALWARE",
          "BOTNET",
          "PHISHING",
          "SPAM"
        ],
        "logging_action": "LOG_AND_ALERT"
      }
    }]
  }
}
```

### URL Category Filtering

```json
{
  "rule_list": {
    "rules": [{
      "metadata": {"name": "block-categories"},
      "spec": {
        "action": "DENY",
        "url_categories": [
          "GAMBLING",
          "ADULT_CONTENT",
          "MALICIOUS"
        ]
      }
    }]
  }
}
```

### Geographic Blocking

```json
{
  "rule_list": {
    "rules": [{
      "metadata": {"name": "geo-block"},
      "spec": {
        "action": "DENY",
        "source_geo_match": {
          "country_list": ["RU", "CN", "KP"]
        }
      }
    }]
  }
}
```

## Logging Actions

| Action | Description |
|--------|-------------|
| `NONE` | No logging |
| `LOG` | Log matched traffic |
| `LOG_AND_ALERT` | Log and generate alert |

## Related Resources

- [Network Firewall](network-firewall.md) - Basic firewall rules
- [Service Policy](service-policy.md) - Application-layer policies
- [App Firewall](app-firewall.md) - WAF protection

## Troubleshooting

### Application Not Identified

1. Verify application signature database is current
2. Check if traffic uses non-standard ports
3. Review encrypted traffic handling settings
4. Confirm deep packet inspection is enabled

### Performance Impact

!!! warning "Resource Considerations"
    Enhanced firewall features require additional processing resources.

1. Review rule complexity and count
2. Check logging volume settings
3. Consider rule optimization
4. Monitor site resource utilization
