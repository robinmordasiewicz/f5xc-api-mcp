# Health Check

Health Checks monitor the availability and responsiveness of backend services, enabling
automatic failover and ensuring traffic is only sent to healthy endpoints.

!!! info "Subscription Tier"
    **STANDARD** - Available with standard F5XC subscription.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-healthcheck-create` | Create a Health Check |
| `f5xc-api-core-healthcheck-get` | Get Health Check details |
| `f5xc-api-core-healthcheck-list` | List Health Checks in namespace |
| `f5xc-api-core-healthcheck-update` | Update Health Check configuration |
| `f5xc-api-core-healthcheck-delete` | Delete Health Check |

## Required Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| namespace | string | Target namespace |
| name | string | Health check name |
| timeout | integer | Health check timeout in seconds |
| interval | integer | Interval between checks in seconds |

## Example Usage

### Create Health Check

Ask Claude:

> "Create an HTTP health check named 'example-health' that checks /health endpoint every 15 seconds"

### f5xcctl Equivalent

```bash
f5xcctl apply -f - <<EOF
apiVersion: config.volterra.io/v1
kind: healthcheck
metadata:
  name: example-health
  namespace: production
spec:
  http_health_check:
    path: /health
    expected_status_codes:
      - "200"
      - "204"
    headers:
      - name: Host
        value: api.example.com
  timeout: 5
  interval: 15
  unhealthy_threshold: 3
  healthy_threshold: 2
EOF
```

### Terraform Resource

```hcl
resource "volterra_healthcheck" "example_health" {
  name      = "example-health"
  namespace = "production"

  http_health_check {
    path = "/health"
    expected_status_codes = ["200", "204"]
    headers {
      name  = "Host"
      value = "api.example.com"
    }
  }

  timeout             = 5
  interval            = 15
  unhealthy_threshold = 3
  healthy_threshold   = 2
}
```

## Health Check Types

| Type | Description |
|------|-------------|
| `http_health_check` | HTTP/HTTPS endpoint check |
| `tcp_health_check` | TCP connection check |
| `udp_health_check` | UDP datagram check |
| `grpc_health_check` | gRPC health protocol |

## Common Configurations

### HTTP Health Check

```json
{
  "name": "example-health",
  "namespace": "production",
  "http_health_check": {
    "path": "/health",
    "expected_status_codes": ["200"]
  },
  "timeout": 5,
  "interval": 15,
  "unhealthy_threshold": 3,
  "healthy_threshold": 2
}
```

### HTTPS Health Check

```json
{
  "name": "example-health",
  "http_health_check": {
    "use_tls": {
      "tls_config": {
        "default_security": {}
      }
    },
    "path": "/healthz",
    "expected_status_codes": ["200"]
  },
  "timeout": 5,
  "interval": 30
}
```

### TCP Health Check

```json
{
  "name": "example-tcp-health",
  "namespace": "production",
  "tcp_health_check": {
    "send_payload": "",
    "receive_payload": ""
  },
  "timeout": 3,
  "interval": 10,
  "unhealthy_threshold": 2,
  "healthy_threshold": 2
}
```

### gRPC Health Check

```json
{
  "name": "example-grpc-health",
  "namespace": "production",
  "grpc_health_check": {
    "service_name": "myapp.HealthService"
  },
  "timeout": 5,
  "interval": 15
}
```

### With Custom Headers

```json
{
  "name": "example-health",
  "http_health_check": {
    "path": "/health",
    "expected_status_codes": ["200"],
    "headers": [
      {"name": "Host", "value": "api.example.com"},
      {"name": "X-Health-Check", "value": "true"}
    ]
  },
  "timeout": 5,
  "interval": 15
}
```

## Apply to Origin Pool

Reference health check in Origin Pool:

```json
{
  "name": "example-pool",
  "namespace": "production",
  "healthcheck": [{
    "namespace": "production",
    "name": "example-health"
  }]
}
```

## Threshold Settings

| Parameter | Description |
|-----------|-------------|
| `unhealthy_threshold` | Consecutive failures to mark unhealthy |
| `healthy_threshold` | Consecutive successes to mark healthy |
| `timeout` | Max wait time for response |
| `interval` | Time between checks |

## Related Resources

- [Origin Pool](origin-pool.md) - Uses health checks
- [DNS LB Pool](dns-lb-pool.md) - DNS pool health monitoring
- [HTTP Load Balancer](http-loadbalancer.md) - Load balancing with health

## Troubleshooting

### Endpoints Always Unhealthy

1. Verify health check path is accessible
2. Check expected status codes include actual response
3. Confirm network path from F5XC to endpoint
4. Review timeout settings

### Health Check Flapping

!!! tip "Adjust Thresholds"
    Increase `unhealthy_threshold` to prevent flapping from transient failures.

1. Increase unhealthy threshold
2. Extend timeout for slow endpoints
3. Review interval settings
4. Check for network instability

### Health Check Not Running

1. Verify health check is attached to origin pool
2. Check origin pool is used by load balancer
3. Confirm namespace references are correct
4. Review health check configuration for errors
