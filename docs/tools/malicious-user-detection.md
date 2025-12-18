# Malicious User Detection

Malicious User Detection identifies and tracks suspicious user behavior patterns across your
applications, enabling automated threat response and security analytics.

!!! info "Subscription Tier"
    **ADVANCED** - Requires advanced F5XC subscription tier.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-malicious-user-detection-create` | Create Malicious User Detection config |
| `f5xc-api-security-malicious-user-detection-get` | Get configuration details |
| `f5xc-api-security-malicious-user-detection-list` | List configurations in namespace |
| `f5xc-api-security-malicious-user-detection-update` | Update configuration |
| `f5xc-api-security-malicious-user-detection-delete` | Delete configuration |

## Required Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| namespace | string | Target namespace |
| name | string | Configuration name |
| threat_score_threshold | integer | Score threshold for detection |

## Example Usage

### Create Malicious User Detection

Ask Claude:

> "Create a malicious user detection configuration named 'example-mud' with medium sensitivity"

### f5xcctl Equivalent

```bash
f5xcctl apply -f - <<EOF
apiVersion: config.volterra.io/v1
kind: malicious_user_detection
metadata:
  name: example-mud
  namespace: production
spec:
  threat_score_threshold: 70
  cooling_off_period: 300
  facets:
    - IP_ADDRESS
    - USER_ID
    - SESSION_ID
  detection_parameters:
    waf_attack_count:
      threshold: 5
      window: 60
    failed_login_count:
      threshold: 10
      window: 300
EOF
```

### Terraform Resource

```hcl
resource "volterra_malicious_user_detection" "example_mud" {
  name      = "example-mud"
  namespace = "production"

  threat_score_threshold = 70
  cooling_off_period     = 300

  facets = ["IP_ADDRESS", "USER_ID", "SESSION_ID"]

  detection_parameters {
    waf_attack_count {
      threshold = 5
      window    = 60
    }
    failed_login_count {
      threshold = 10
      window    = 300
    }
  }
}
```

## Detection Facets

| Facet | Description |
|-------|-------------|
| `IP_ADDRESS` | Track by client IP address |
| `USER_ID` | Track by authenticated user ID |
| `SESSION_ID` | Track by session identifier |
| `ASN` | Track by autonomous system number |
| `TLS_FINGERPRINT` | Track by TLS client fingerprint |

## Detection Parameters

| Parameter | Description |
|-----------|-------------|
| `waf_attack_count` | WAF attack signature matches |
| `failed_login_count` | Authentication failures |
| `api_violation_count` | API schema violations |
| `rate_limit_exceed_count` | Rate limit violations |
| `bot_score_threshold` | Bot detection score |

## Common Configurations

### High Sensitivity

```json
{
  "name": "example-mud",
  "threat_score_threshold": 50,
  "cooling_off_period": 600,
  "detection_parameters": {
    "waf_attack_count": {
      "threshold": 3,
      "window": 60
    },
    "failed_login_count": {
      "threshold": 5,
      "window": 300
    }
  }
}
```

### Low Sensitivity (Reduced False Positives)

```json
{
  "name": "example-mud",
  "threat_score_threshold": 90,
  "cooling_off_period": 120,
  "detection_parameters": {
    "waf_attack_count": {
      "threshold": 10,
      "window": 60
    },
    "failed_login_count": {
      "threshold": 20,
      "window": 300
    }
  }
}
```

### Multi-Facet Tracking

```json
{
  "name": "example-mud",
  "facets": [
    "IP_ADDRESS",
    "USER_ID",
    "TLS_FINGERPRINT"
  ],
  "correlation_criteria": {
    "any_facet_match": {}
  }
}
```

## Apply to Load Balancer

Reference in HTTP Load Balancer configuration:

```json
{
  "name": "example-app",
  "malicious_user_detection": {
    "namespace": "production",
    "name": "example-mud"
  },
  "malicious_user_mitigation": {
    "response_code": 403,
    "custom_response": "Access denied due to suspicious activity"
  }
}
```

## Related Resources

- [HTTP Load Balancer](http-loadbalancer.md) - Applies detection
- [App Firewall](app-firewall.md) - WAF protection
- [Bot Defense](bot-defense.md) - Bot detection
- [API Discovery](api-discovery.md) - API security

## Troubleshooting

### False Positives

1. Review threat score threshold settings
2. Check detection parameter thresholds
3. Verify facet configuration
4. Review cooling off period

### Users Not Being Detected

!!! tip "Check Facets"
    Ensure the configured facets match available request attributes.

1. Verify detection is enabled on load balancer
2. Check threat score threshold isn't too high
3. Review detection window settings
4. Confirm facets are present in requests

### Detection Delays

1. Check cooling off period settings
2. Review detection window configurations
3. Verify system processing capacity
4. Check for configuration propagation delays
