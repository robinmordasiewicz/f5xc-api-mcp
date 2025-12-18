# Service Policy

Service Policies define access control rules for HTTP Load Balancers, enabling fine-grained
traffic management and security.

!!! info "Subscription Tier"
    **STANDARD** - Available with standard F5XC subscription.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-service-policy-create` | Create a service policy |
| `f5xc-api-security-service-policy-get` | Get service policy details |
| `f5xc-api-security-service-policy-list` | List service policies |
| `f5xc-api-security-service-policy-update` | Update service policy |
| `f5xc-api-security-service-policy-delete` | Delete service policy |

## Required Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| namespace | string | Target namespace |
| name | string | Policy name |
| rules | array | Policy rules |

## Example Usage

### Create Service Policy

Ask Claude:

> "Create a service policy to allow only specific IP ranges"

### f5xcctl Equivalent

```bash
f5xcctl apply -f - <<EOF
apiVersion: config.volterra.io/v1
kind: service_policy
metadata:
  name: ip-allowlist
  namespace: production
spec:
  algo: FIRST_MATCH
  rules:
    - metadata:
        name: allow-office
      spec:
        action: ALLOW
        ip_prefix_list:
          prefixes:
            - "203.0.113.0/24"
    - metadata:
        name: deny-all
      spec:
        action: DENY
        any_client: {}
EOF
```

### Terraform Resource

```hcl
resource "volterra_service_policy" "ip_allowlist" {
  name      = "ip-allowlist"
  namespace = "production"

  algo = "FIRST_MATCH"

  rule {
    metadata {
      name = "allow-office"
    }
    spec {
      action = "ALLOW"
      ip_prefix_list {
        prefixes = ["203.0.113.0/24"]
      }
    }
  }

  rule {
    metadata {
      name = "deny-all"
    }
    spec {
      action = "DENY"
      any_client = true
    }
  }
}
```

## Policy Algorithms

| Algorithm | Description |
|-----------|-------------|
| FIRST_MATCH | First matching rule wins |
| DENY_OVERRIDES | Any deny rule blocks access |
| ALLOW_OVERRIDES | Any allow rule permits access |

## Rule Types

### IP-Based Rules

```json
{
  "action": "ALLOW",
  "ip_prefix_list": {
    "prefixes": ["10.0.0.0/8", "192.168.0.0/16"]
  }
}
```

### Path-Based Rules

```json
{
  "action": "DENY",
  "http_method": {
    "methods": ["DELETE", "PUT"]
  },
  "path": {
    "prefix": "/api/admin"
  }
}
```

### Header-Based Rules

```json
{
  "action": "ALLOW",
  "headers": [{
    "name": "X-API-Key",
    "exact": "secret-key-value"
  }]
}
```

## Related Resources

- [HTTP Load Balancer](http-loadbalancer.md) - Applies service policies
- [Rate Limiter](rate-limiter.md) - Traffic rate limiting
- [App Firewall](app-firewall.md) - WAF protection

## Troubleshooting

### "Policy not taking effect"

1. Verify policy is attached to load balancer
2. Check rule order (first match wins)
3. Review rule conditions for correctness

### "Unexpected blocks"

1. Check for overly broad deny rules
2. Verify IP prefix notation is correct
3. Review algorithm setting
