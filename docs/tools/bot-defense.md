# Bot Defense

Bot Defense provides automated detection and mitigation of malicious bot traffic, protecting
applications from credential stuffing, scraping, and other automated attacks.

!!! info "Subscription Tier"
    **ADVANCED** - Requires advanced F5XC subscription tier.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-bot-defense-create` | Create Bot Defense configuration |
| `f5xc-api-security-bot-defense-get` | Get Bot Defense details |
| `f5xc-api-security-bot-defense-list` | List Bot Defense in namespace |
| `f5xc-api-security-bot-defense-update` | Update Bot Defense configuration |
| `f5xc-api-security-bot-defense-delete` | Delete Bot Defense |

## Required Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| namespace | string | Target namespace |
| name | string | Bot defense configuration name |
| protected_endpoints | array | Endpoints to protect |

## Example Usage

### Create Bot Defense

Ask Claude:

> "Create a bot defense configuration named 'example-bot-defense' to protect login and checkout endpoints"

### f5xcctl Equivalent

```bash
f5xcctl apply -f - <<EOF
apiVersion: config.volterra.io/v1
kind: bot_defense
metadata:
  name: example-bot-defense
  namespace: production
spec:
  protected_endpoints:
    - path:
        prefix: /api/login
      http_methods:
        - POST
      mitigation:
        block:
          body: "Bot traffic blocked"
          status: 403
    - path:
        prefix: /checkout
      http_methods:
        - POST
      mitigation:
        challenge:
          type: CAPTCHA
  javascript_injection:
    enabled: true
    path: /api/*
EOF
```

### Terraform Resource

```hcl
resource "volterra_bot_defense" "example_bot_defense" {
  name      = "example-bot-defense"
  namespace = "production"

  protected_endpoints {
    path {
      prefix = "/api/login"
    }
    http_methods = ["POST"]
    mitigation {
      block {
        body   = "Bot traffic blocked"
        status = 403
      }
    }
  }

  protected_endpoints {
    path {
      prefix = "/checkout"
    }
    http_methods = ["POST"]
    mitigation {
      challenge {
        type = "CAPTCHA"
      }
    }
  }

  javascript_injection {
    enabled = true
    path    = "/api/*"
  }
}
```

## Mitigation Actions

| Action | Description |
|--------|-------------|
| `block` | Block request with custom response |
| `challenge` | Present challenge (CAPTCHA, JavaScript) |
| `flag` | Mark request for monitoring |
| `redirect` | Redirect to specified URL |
| `rate_limit` | Apply rate limiting |

## Challenge Types

| Type | Description |
|------|-------------|
| `CAPTCHA` | Visual CAPTCHA challenge |
| `JAVASCRIPT` | JavaScript-based challenge |
| `INVISIBLE` | Invisible browser validation |

## Common Configurations

### Login Protection

```json
{
  "name": "example-bot-defense",
  "protected_endpoints": [{
    "path": {"exact": "/api/login"},
    "http_methods": ["POST"],
    "mitigation": {
      "block": {
        "status": 403,
        "body": "Access denied"
      }
    }
  }]
}
```

### API Protection with JavaScript Challenge

```json
{
  "name": "example-bot-defense",
  "protected_endpoints": [{
    "path": {"prefix": "/api/"},
    "http_methods": ["GET", "POST"],
    "mitigation": {
      "challenge": {
        "type": "JAVASCRIPT"
      }
    }
  }],
  "javascript_injection": {
    "enabled": true,
    "path": "/*"
  }
}
```

### Checkout Flow Protection

```json
{
  "name": "example-bot-defense",
  "protected_endpoints": [
    {
      "path": {"exact": "/cart/add"},
      "http_methods": ["POST"],
      "mitigation": {"flag": {}}
    },
    {
      "path": {"exact": "/checkout"},
      "http_methods": ["POST"],
      "mitigation": {
        "challenge": {"type": "CAPTCHA"}
      }
    }
  ]
}
```

### Multi-Path Protection

```json
{
  "name": "example-bot-defense",
  "protected_endpoints": [
    {
      "path": {"prefix": "/api/auth"},
      "mitigation": {"block": {"status": 403}}
    },
    {
      "path": {"prefix": "/api/data"},
      "mitigation": {"rate_limit": {"rate": 100, "unit": "MINUTE"}}
    }
  ]
}
```

## Apply to Load Balancer

Reference in HTTP Load Balancer:

```json
{
  "name": "example-app",
  "bot_defense": {
    "namespace": "production",
    "name": "example-bot-defense"
  }
}
```

## Related Resources

- [HTTP Load Balancer](http-loadbalancer.md) - Applies bot defense
- [App Firewall](app-firewall.md) - WAF protection
- [Malicious User Detection](malicious-user-detection.md) - User threat tracking
- [Rate Limiter](rate-limiter.md) - Rate limiting

## Troubleshooting

### Legitimate Users Blocked

1. Review protection sensitivity settings
2. Check challenge configuration
3. Verify JavaScript injection paths
4. Review endpoint matching rules

### Bots Not Being Blocked

!!! tip "Enable JavaScript Injection"
    JavaScript injection is required for advanced bot detection capabilities.

1. Verify bot defense is attached to load balancer
2. Check endpoint path matching
3. Confirm JavaScript injection is enabled
4. Review mitigation action configuration

### Challenge Not Displaying

1. Verify JavaScript is injected in HTML pages
2. Check client browser compatibility
3. Review CORS and CSP headers
4. Confirm challenge page is accessible
