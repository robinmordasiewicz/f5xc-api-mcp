# DNS LB Pool

DNS LB Pools define the backend endpoints for DNS Load Balancers, including health check
configuration and endpoint prioritization.

!!! info "Subscription Tier"
    **STANDARD** - Available with standard F5XC subscription.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-dns-dns-lb-pool-create` | Create a new DNS LB Pool |
| `f5xc-api-dns-dns-lb-pool-get` | Get DNS LB Pool details |
| `f5xc-api-dns-dns-lb-pool-list` | List DNS LB Pools in namespace |
| `f5xc-api-dns-dns-lb-pool-update` | Update DNS LB Pool configuration |
| `f5xc-api-dns-dns-lb-pool-delete` | Delete DNS LB Pool |

## Required Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| namespace | string | Target namespace |
| name | string | Pool name |
| members | array | Pool member definitions |
| load_balancing_mode | string | Load balancing algorithm |

## Example Usage

### Create DNS LB Pool

Ask Claude:

> "Create a DNS LB pool named 'example-pool' with endpoints in us-east-1 and us-west-2"

### f5xcctl Equivalent

```bash
f5xcctl apply -f - <<EOF
apiVersion: config.volterra.io/v1
kind: dns_lb_pool
metadata:
  name: example-pool
  namespace: production
spec:
  load_balancing_mode: ROUND_ROBIN
  members:
    - address:
        ipv4_address: "203.0.113.10"
      priority: 1
      ratio: 1
    - address:
        ipv4_address: "203.0.113.20"
      priority: 1
      ratio: 1
  health_check:
    - namespace: production
      name: http-health
EOF
```

### Terraform Resource

```hcl
resource "volterra_dns_lb_pool" "example_pool" {
  name      = "example-pool"
  namespace = "production"

  load_balancing_mode = "ROUND_ROBIN"

  members {
    address {
      ipv4_address = "203.0.113.10"
    }
    priority = 1
    ratio    = 1
  }

  members {
    address {
      ipv4_address = "203.0.113.20"
    }
    priority = 1
    ratio    = 1
  }

  health_check {
    namespace = "production"
    name      = volterra_healthcheck.http.name
  }
}
```

## Member Types

### IPv4 Address

```json
{
  "members": [{
    "address": {
      "ipv4_address": "203.0.113.10"
    }
  }]
}
```

### IPv6 Address

```json
{
  "members": [{
    "address": {
      "ipv6_address": "2001:db8::1"
    }
  }]
}
```

### DNS Name

```json
{
  "members": [{
    "address": {
      "dns_name": "backend.example.com"
    }
  }]
}
```

## Load Balancing Modes

| Mode | Description |
|------|-------------|
| `ROUND_ROBIN` | Distribute evenly across members |
| `RATIO` | Distribute based on member ratios |
| `PRIORITY` | Use highest priority healthy member |
| `STATIC_PERSIST` | Consistent hashing for persistence |

## Common Configurations

### Ratio-Based Distribution

```json
{
  "name": "example-pool",
  "load_balancing_mode": "RATIO",
  "members": [
    {
      "address": {"ipv4_address": "203.0.113.10"},
      "ratio": 3
    },
    {
      "address": {"ipv4_address": "203.0.113.20"},
      "ratio": 1
    }
  ]
}
```

### Priority-Based Failover

```json
{
  "name": "example-pool",
  "load_balancing_mode": "PRIORITY",
  "members": [
    {
      "address": {"ipv4_address": "203.0.113.10"},
      "priority": 1
    },
    {
      "address": {"ipv4_address": "203.0.113.20"},
      "priority": 2
    }
  ]
}
```

### With Health Check

```json
{
  "name": "example-pool",
  "members": [{
    "address": {"ipv4_address": "203.0.113.10"}
  }],
  "health_check": [{
    "namespace": "production",
    "name": "tcp-health"
  }]
}
```

## Related Resources

- [DNS Load Balancer](dns-loadbalancer.md) - Uses DNS LB pools
- [DNS Zone](dns-zone.md) - DNS zone configuration
- [Health Check](health-check.md) - Health check definitions

## Troubleshooting

### Pool Members Unhealthy

1. Verify member addresses are reachable
2. Check health check configuration
3. Confirm firewall rules allow health probes
4. Review member endpoint status

### Traffic Distribution Uneven

!!! tip "Check Member Ratios"
    Verify ratio values when using RATIO mode.

1. Confirm load balancing mode is correct
2. Check member priority settings
3. Review health status of all members
4. Verify TTL allows for distribution changes
