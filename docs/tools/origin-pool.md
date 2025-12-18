# Origin Pool

Origin Pools define the backend servers that receive traffic from HTTP Load Balancers.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-waap-origin-pool-create` | Create a new Origin Pool |
| `f5xc-api-waap-origin-pool-get` | Get Origin Pool details |
| `f5xc-api-waap-origin-pool-list` | List Origin Pools in namespace |
| `f5xc-api-waap-origin-pool-update` | Update Origin Pool configuration |
| `f5xc-api-waap-origin-pool-delete` | Delete Origin Pool |

## Required Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| namespace | string | Target namespace |
| name | string | Origin pool name |
| origin_servers | array | Backend server definitions |
| port | integer | Backend port |

## Example Usage

### Create Origin Pool

Ask Claude:

> "Create an origin pool named 'backend-pool' in 'production' with servers at 10.0.0.1 and 10.0.0.2 on port 8080"

### f5xcctl Equivalent

```bash
f5xcctl apply -f - <<EOF
apiVersion: config.volterra.io/v1
kind: origin_pool
metadata:
  name: backend-pool
  namespace: production
spec:
  origin_servers:
    - public_ip:
        ip: 10.0.0.1
    - public_ip:
        ip: 10.0.0.2
  port: 8080
  no_tls: {}
  endpoint_selection: LOCAL_PREFERRED
  loadbalancer_algorithm: ROUND_ROBIN
EOF
```

### Terraform Resource

```hcl
resource "volterra_origin_pool" "backend" {
  name      = "backend-pool"
  namespace = "production"

  origin_servers {
    public_ip {
      ip = "10.0.0.1"
    }
  }

  origin_servers {
    public_ip {
      ip = "10.0.0.2"
    }
  }

  port               = 8080
  no_tls             = true
  endpoint_selection = "LOCAL_PREFERRED"
  loadbalancer_algorithm = "ROUND_ROBIN"
}
```

## Origin Server Types

### Public IP

```json
{
  "origin_servers": [{
    "public_ip": {
      "ip": "203.0.113.10"
    }
  }]
}
```

### Private IP (Site Network)

```json
{
  "origin_servers": [{
    "private_ip": {
      "ip": "10.0.0.1",
      "site_locator": {
        "site": {
          "namespace": "system",
          "name": "example-site"
        }
      }
    }
  }]
}
```

### DNS Name

```json
{
  "origin_servers": [{
    "public_name": {
      "dns_name": "api.backend.example.com"
    }
  }]
}
```

### Kubernetes Service

```json
{
  "origin_servers": [{
    "k8s_service": {
      "service_name": "example-service",
      "site_locator": {
        "site": {
          "namespace": "system",
          "name": "example-k8s-site"
        }
      },
      "vk8s_networks": {}
    }
  }]
}
```

## TLS Configuration

### No TLS (HTTP Backend)

```json
{
  "no_tls": {}
}
```

### TLS to Origin

```json
{
  "use_tls": {
    "tls_config": {
      "default_security": {}
    },
    "skip_server_verification": {}
  }
}
```

### mTLS to Origin

```json
{
  "use_tls": {
    "tls_config": {
      "default_security": {}
    },
    "use_mtls": {
      "tls_certificates": [{
        "certificate_url": "string:///...",
        "private_key": {
          "secret_encoding_type": "EncodingPEM",
          "blindfold_secret_info": {
            "location": "string:///..."
          }
        }
      }]
    }
  }
}
```

## Load Balancing Algorithms

| Algorithm | Description |
|-----------|-------------|
| `ROUND_ROBIN` | Distribute evenly across servers |
| `LEAST_ACTIVE` | Send to server with fewest active connections |
| `RANDOM` | Random server selection |
| `SOURCE_IP_STICKINESS` | Same client IP goes to same server |
| `COOKIE_STICKINESS` | Session affinity via cookie |
| `RING_HASH` | Consistent hashing |

## Health Checks

### HTTP Health Check

```json
{
  "healthcheck": [{
    "namespace": "production",
    "name": "http-health"
  }]
}
```

Create health check separately:

```bash
f5xcctl apply -f - <<EOF
apiVersion: config.volterra.io/v1
kind: healthcheck
metadata:
  name: http-health
  namespace: production
spec:
  http_health_check:
    path: /health
    expected_status_codes:
      - "200"
  timeout: 3
  interval: 15
  unhealthy_threshold: 2
  healthy_threshold: 3
EOF
```

## Related Resources

- [HTTP Load Balancer](http-loadbalancer.md) - Uses origin pools

## Subscription Tier

**STANDARD** - Available with standard F5XC subscription.

## Troubleshooting

### "Connection refused"

- Verify backend server is running
- Check firewall rules allow F5XC IPs
- Verify port number is correct

### "TLS handshake failed"

- Check TLS configuration matches backend
- Verify certificates are valid
- Try `skip_server_verification` for testing

### "All origins unhealthy"

- Check health check configuration
- Verify health endpoint returns expected status
- Review health check logs in F5XC Console
