# TCP Load Balancer

The TCP Load Balancer provides Layer 4 load balancing for non-HTTP traffic such as databases,
custom protocols, and other TCP-based applications through F5 Distributed Cloud.

!!! info "Subscription Tier"
    **STANDARD** - Available with standard F5XC subscription.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-waap-tcp-loadbalancer-create` | Create a new TCP Load Balancer |
| `f5xc-api-waap-tcp-loadbalancer-get` | Get TCP Load Balancer details |
| `f5xc-api-waap-tcp-loadbalancer-list` | List TCP Load Balancers in namespace |
| `f5xc-api-waap-tcp-loadbalancer-update` | Update TCP Load Balancer configuration |
| `f5xc-api-waap-tcp-loadbalancer-delete` | Delete TCP Load Balancer |

## Required Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| namespace | string | Target namespace |
| name | string | Load balancer name |
| listen_port | integer | Port to listen on |
| origin_pools_weights | array | Origin pools with weights |

## Example Usage

### Create TCP Load Balancer

Ask Claude:

> "Create a TCP load balancer named 'db-proxy' in the 'production' namespace
> listening on port 5432 with origin pool 'postgres-pool'"

### f5xcctl Equivalent

```bash
f5xcctl apply -f - <<EOF
apiVersion: config.volterra.io/v1
kind: tcp_loadbalancer
metadata:
  name: db-proxy
  namespace: production
spec:
  listen_port: 5432
  origin_pools_weights:
    - pool:
        tenant: your-tenant
        namespace: production
        name: postgres-pool
      weight: 1
  advertise_on_public_default_vip: {}
EOF
```

### Terraform Resource

```hcl
resource "volterra_tcp_loadbalancer" "db_proxy" {
  name      = "db-proxy"
  namespace = "production"

  listen_port = 5432

  origin_pools_weights {
    pool {
      name      = volterra_origin_pool.postgres.name
      namespace = "production"
    }
    weight = 1
  }

  advertise_on_public_default_vip = true
}
```

## Common Configurations

### Basic TCP Load Balancer

```json
{
  "name": "db-proxy",
  "namespace": "production",
  "listen_port": 5432,
  "origin_pools_weights": [{
    "pool": {
      "namespace": "production",
      "name": "postgres-pool"
    },
    "weight": 1
  }],
  "advertise_on_public_default_vip": {}
}
```

### With TLS Termination

```json
{
  "name": "secure-tcp-lb",
  "namespace": "production",
  "listen_port": 443,
  "tls_tcp": {
    "tls_cert_params": {
      "certificates": [{
        "certificate_url": "string:///...",
        "private_key": {
          "blindfold_secret_info": {
            "location": "string:///..."
          }
        }
      }]
    }
  },
  "origin_pools_weights": [{
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
  "name": "ha-tcp-lb",
  "namespace": "production",
  "listen_port": 3306,
  "origin_pools_weights": [
    {
      "pool": {"namespace": "production", "name": "primary-db"},
      "weight": 80
    },
    {
      "pool": {"namespace": "production", "name": "replica-db"},
      "weight": 20
    }
  ]
}
```

### With SNI Routing

```json
{
  "name": "sni-tcp-lb",
  "namespace": "production",
  "listen_port": 443,
  "with_sni": {
    "sni_config": [{
      "domain": "db1.example.com",
      "pools": [{
        "pool": {"namespace": "production", "name": "db1-pool"}
      }]
    }, {
      "domain": "db2.example.com",
      "pools": [{
        "pool": {"namespace": "production", "name": "db2-pool"}
      }]
    }]
  }
}
```

### Private Network Advertisement

```json
{
  "name": "internal-tcp-lb",
  "namespace": "production",
  "listen_port": 6379,
  "origin_pools_weights": [{
    "pool": {"namespace": "production", "name": "redis-pool"}
  }],
  "advertise_custom": {
    "advertise_where": [{
      "site": {
        "network": "SITE_NETWORK_INSIDE",
        "site": {
          "namespace": "system",
          "name": "example-site"
        }
      }
    }]
  }
}
```

## Use Cases

### Database Proxy

Load balance connections to PostgreSQL, MySQL, or other databases:

```json
{
  "name": "mysql-proxy",
  "listen_port": 3306,
  "origin_pools_weights": [{
    "pool": {"namespace": "production", "name": "mysql-cluster"}
  }]
}
```

### Message Queue

Load balance connections to Redis, RabbitMQ, or Kafka:

```json
{
  "name": "redis-lb",
  "listen_port": 6379,
  "origin_pools_weights": [{
    "pool": {"namespace": "production", "name": "redis-sentinel"}
  }]
}
```

### Custom Protocol

Load balance any TCP-based custom protocol:

```json
{
  "name": "custom-proto-lb",
  "listen_port": 9000,
  "origin_pools_weights": [{
    "pool": {"namespace": "production", "name": "custom-app"}
  }]
}
```

## Related Resources

- [Origin Pool](origin-pool.md) - Backend server configuration
- [Health Check](health-check.md) - TCP health monitoring
- [HTTP Load Balancer](http-loadbalancer.md) - Layer 7 HTTP/HTTPS load balancing
- [Certificate](certificate.md) - TLS certificate management

## Troubleshooting

### "Port already in use"

Another load balancer is using the same port. Check existing TCP LBs:

> "List all TCP load balancers in the production namespace"

### "Origin pool not found"

The referenced origin pool doesn't exist. Create it first:

> "Create an origin pool named 'postgres-pool' with server at 10.0.0.1:5432"

### "Connection timeout"

1. Verify origin servers are accessible
2. Check health check configuration
3. Review firewall rules on origin servers
4. Ensure correct port configuration

!!! tip "Health Check Configuration"
    For TCP load balancers, use TCP health checks instead of HTTP:

    > "Create a TCP health check for port 5432"

### "TLS handshake failure"

For TLS-enabled TCP load balancers:

1. Verify certificate is valid and not expired
2. Check certificate chain is complete
3. Ensure private key matches certificate
4. Review SNI configuration if using SNI routing
