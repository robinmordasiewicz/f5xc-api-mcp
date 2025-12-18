# DNS Load Balancer

DNS Load Balancers provide intelligent DNS-based traffic distribution across multiple endpoints
with health checking and geographic routing capabilities.

!!! info "Subscription Tier"
    **STANDARD** - Available with standard F5XC subscription.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-dns-dns-lb-create` | Create a new DNS Load Balancer |
| `f5xc-api-dns-dns-lb-get` | Get DNS Load Balancer details |
| `f5xc-api-dns-dns-lb-list` | List DNS Load Balancers in namespace |
| `f5xc-api-dns-dns-lb-update` | Update DNS Load Balancer configuration |
| `f5xc-api-dns-dns-lb-delete` | Delete DNS Load Balancer |

## Required Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| namespace | string | Target namespace |
| name | string | DNS load balancer name |
| record_type | string | DNS record type (A, AAAA, CNAME) |
| dns_lb_pool | array | Pool references for load balancing |

## Example Usage

### Create DNS Load Balancer

Ask Claude:

> "Create a DNS load balancer named 'example-dns-lb' that distributes traffic across US and EU regions"

### f5xcctl Equivalent

```bash
f5xcctl apply -f - <<EOF
apiVersion: config.volterra.io/v1
kind: dns_load_balancer
metadata:
  name: example-dns-lb
  namespace: production
spec:
  record_type: A
  dns_lb_pool:
    - pool:
        namespace: production
        name: us-pool
      priority: 1
      weight: 50
    - pool:
        namespace: production
        name: eu-pool
      priority: 1
      weight: 50
  response_cache:
    ttl: 60
EOF
```

### Terraform Resource

```hcl
resource "volterra_dns_load_balancer" "example_dns_lb" {
  name      = "example-dns-lb"
  namespace = "production"

  record_type = "A"

  dns_lb_pool {
    pool {
      namespace = "production"
      name      = volterra_dns_lb_pool.us_pool.name
    }
    priority = 1
    weight   = 50
  }

  dns_lb_pool {
    pool {
      namespace = "production"
      name      = volterra_dns_lb_pool.eu_pool.name
    }
    priority = 1
    weight   = 50
  }

  response_cache {
    ttl = 60
  }
}
```

## Load Balancing Algorithms

| Algorithm | Description |
|-----------|-------------|
| `ROUND_ROBIN` | Distribute evenly across pools |
| `WEIGHTED` | Distribute based on pool weights |
| `PRIORITY` | Use highest priority healthy pool |
| `GEO` | Route based on client geography |

## Common Configurations

### Weighted Distribution

```json
{
  "name": "example-dns-lb",
  "namespace": "production",
  "record_type": "A",
  "dns_lb_pool": [
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

### Priority-Based Failover

```json
{
  "dns_lb_pool": [
    {
      "pool": {"namespace": "production", "name": "primary-pool"},
      "priority": 1
    },
    {
      "pool": {"namespace": "production", "name": "backup-pool"},
      "priority": 2
    }
  ]
}
```

### Geographic Routing

```json
{
  "dns_lb_pool": [
    {
      "pool": {"namespace": "production", "name": "us-east-pool"},
      "geo_location": {
        "country_codes": ["US"]
      }
    },
    {
      "pool": {"namespace": "production", "name": "eu-pool"},
      "geo_location": {
        "country_codes": ["DE", "FR", "GB"]
      }
    }
  ]
}
```

## Related Resources

- [DNS Zone](dns-zone.md) - DNS zone management
- [DNS LB Pool](dns-lb-pool.md) - Backend pool configuration
- [Health Check](health-check.md) - Endpoint health monitoring

## Troubleshooting

### DNS Not Resolving

1. Verify DNS zone delegation is correct
2. Check pool health status
3. Confirm TTL values are appropriate
4. Review DNS propagation status

### Traffic Not Balancing

!!! tip "Check Health Status"
    Unhealthy pools are automatically excluded from DNS responses.

1. Verify all pools are healthy
2. Check weight/priority configuration
3. Review geographic targeting rules
4. Confirm DNS TTL has expired for clients
