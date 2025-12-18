# Rate Limiter

Rate Limiter protects applications from abuse by limiting request rates per client, user, or other criteria.

!!! info "Subscription Tier"
    **STANDARD** - Available with standard F5XC subscription.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-waap-rate-limiter-create` | Create a new Rate Limiter policy |
| `f5xc-api-waap-rate-limiter-get` | Get Rate Limiter details |
| `f5xc-api-waap-rate-limiter-list` | List Rate Limiters in namespace |
| `f5xc-api-waap-rate-limiter-update` | Update Rate Limiter configuration |
| `f5xc-api-waap-rate-limiter-delete` | Delete Rate Limiter |

## Required Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| namespace | string | Target namespace |
| name | string | Rate limiter name |
| threshold | integer | Maximum requests allowed |
| unit | string | Time unit (second, minute, hour) |

## Example Usage

### Create Rate Limiter

Ask Claude:

> "Create a rate limiter named 'api-limit' that allows 100 requests per minute per IP address"

### f5xcctl Equivalent

```bash
f5xcctl apply -f - <<EOF
apiVersion: config.volterra.io/v1
kind: rate_limiter
metadata:
  name: api-limit
  namespace: production
spec:
  threshold: 100
  unit: MINUTE
  policies:
    - keys:
        - type: IP_ADDRESS
      burst_multiplier: 2
EOF
```

### Terraform Resource

```hcl
resource "volterra_rate_limiter" "api_limit" {
  name      = "api-limit"
  namespace = "production"

  threshold = 100
  unit      = "MINUTE"

  policies {
    keys {
      type = "IP_ADDRESS"
    }
    burst_multiplier = 2
  }
}
```

## Common Configurations

### Per-IP Rate Limiting

```json
{
  "name": "per-ip-limit",
  "namespace": "production",
  "threshold": 100,
  "unit": "MINUTE",
  "policies": [{
    "keys": [{
      "type": "IP_ADDRESS"
    }],
    "burst_multiplier": 2
  }]
}
```

### Per-User Rate Limiting

```json
{
  "name": "per-user-limit",
  "namespace": "production",
  "threshold": 1000,
  "unit": "HOUR",
  "policies": [{
    "keys": [{
      "type": "HTTP_HEADER",
      "header_name": "X-User-ID"
    }]
  }]
}
```

### Combined Keys

```json
{
  "policies": [{
    "keys": [
      {"type": "IP_ADDRESS"},
      {"type": "HTTP_PATH"}
    ],
    "threshold": 50,
    "unit": "MINUTE"
  }]
}
```

## Apply to Load Balancer

Reference the rate limiter in an HTTP Load Balancer:

```json
{
  "name": "example-app",
  "rate_limiter": {
    "namespace": "production",
    "name": "api-limit"
  }
}
```

## Related Resources

- [HTTP Load Balancer](http-loadbalancer.md) - Applies rate limiting
- [Service Policy](service-policy.md) - Fine-grained access control
- [App Firewall](app-firewall.md) - WAF protection

## Troubleshooting

### Rate Limiter Not Applied

1. Verify the rate limiter is referenced in the load balancer
2. Check namespace matches between resources
3. Confirm the rate limiter is active (not in draft state)

### Legitimate Traffic Blocked

!!! tip "Adjust Burst Multiplier"
    Increase `burst_multiplier` to handle short traffic spikes without blocking users.

1. Review threshold settings
2. Check key configuration matches expected traffic patterns
3. Consider per-user rather than per-IP for authenticated APIs
