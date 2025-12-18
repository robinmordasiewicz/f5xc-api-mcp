# HTTP Load Balancer

The HTTP Load Balancer is the primary resource for exposing applications through F5 Distributed Cloud.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-waap-http-loadbalancer-create` | Create a new HTTP Load Balancer |
| `f5xc-api-waap-http-loadbalancer-get` | Get HTTP Load Balancer details |
| `f5xc-api-waap-http-loadbalancer-list` | List HTTP Load Balancers in namespace |
| `f5xc-api-waap-http-loadbalancer-update` | Update HTTP Load Balancer configuration |
| `f5xc-api-waap-http-loadbalancer-delete` | Delete HTTP Load Balancer |

## Required Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| namespace | string | Target namespace |
| name | string | Load balancer name |
| domains | array | Domain names to serve |
| default_route_pools | array | Origin pools for traffic |

## Example Usage

### Create Load Balancer

Ask Claude:

> "Create an HTTP load balancer named 'my-app' in the 'production' namespace for domain 'app.example.com' with origin pool 'backend-pool'"

### f5xcctl Equivalent

```bash
f5xcctl apply -f - <<EOF
apiVersion: config.volterra.io/v1
kind: http_loadbalancer
metadata:
  name: my-app
  namespace: production
spec:
  domains:
    - app.example.com
  http:
    dns_volterra_managed: true
  default_route_pools:
    - pool:
        tenant: your-tenant
        namespace: production
        name: backend-pool
      weight: 1
  advertise_on_public_default_vip: {}
EOF
```

### Terraform Resource

```hcl
resource "volterra_http_loadbalancer" "my_app" {
  name      = "my-app"
  namespace = "production"

  domains = ["app.example.com"]

  http {
    dns_volterra_managed = true
  }

  default_route_pools {
    pool {
      name      = volterra_origin_pool.backend.name
      namespace = "production"
    }
    weight = 1
  }

  advertise_on_public_default_vip = true
}
```

## Common Configurations

### Basic HTTP

```json
{
  "name": "my-app",
  "namespace": "production",
  "domains": ["app.example.com"],
  "http": {
    "dns_volterra_managed": true
  },
  "default_route_pools": [{
    "pool": {
      "namespace": "production",
      "name": "backend-pool"
    },
    "weight": 1
  }],
  "advertise_on_public_default_vip": {}
}
```

### HTTPS with Auto Certificate

```json
{
  "name": "my-app",
  "namespace": "production",
  "domains": ["app.example.com"],
  "https_auto_cert": {
    "http_redirect": true,
    "add_hsts": true
  },
  "default_route_pools": [{
    "pool": {
      "namespace": "production",
      "name": "backend-pool"
    }
  }]
}
```

### With WAF Protection

```json
{
  "name": "my-app",
  "namespace": "production",
  "domains": ["app.example.com"],
  "app_firewall": {
    "namespace": "production",
    "name": "my-waf-policy"
  },
  "default_route_pools": [{
    "pool": {
      "namespace": "production",
      "name": "backend-pool"
    }
  }]
}
```

### Multiple Origin Pools (Weighted)

```json
{
  "default_route_pools": [
    {
      "pool": {"namespace": "production", "name": "primary-pool"},
      "weight": 80
    },
    {
      "pool": {"namespace": "production", "name": "secondary-pool"},
      "weight": 20
    }
  ]
}
```

## Advertise Options

### Public VIP (Default)

```json
{
  "advertise_on_public_default_vip": {}
}
```

### Private Network

```json
{
  "advertise_custom": {
    "advertise_where": [{
      "site": {
        "network": "SITE_NETWORK_INSIDE",
        "site": {
          "namespace": "system",
          "name": "my-site"
        }
      }
    }]
  }
}
```

## Related Resources

- [Origin Pool](origin-pool.md) - Backend server configuration
- [App Firewall](app-firewall.md) - WAF protection
- [DNS Zone](dns-zone.md) - DNS management

## Subscription Tier

**STANDARD** - Available with standard F5XC subscription.

## Troubleshooting

### "Domain already in use"

Another load balancer is using the domain. List existing LBs:

> "List all HTTP load balancers across all namespaces"

### "Origin pool not found"

The referenced origin pool doesn't exist. Create it first:

> "Create an origin pool named 'backend-pool' with server at 10.0.0.1:8080"

### "Certificate error"

For HTTPS, ensure:

- Domain ownership is verified
- Auto-cert is enabled, or
- Custom certificate is uploaded
