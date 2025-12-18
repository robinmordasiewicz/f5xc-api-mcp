# Workload

Workloads provide declarative container deployment on F5 Distributed Cloud, enabling
application deployment across Virtual K8s namespaces with integrated networking.

!!! info "Subscription Tier"
    **ADVANCED** - Requires advanced F5XC subscription tier.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-appstack-workload-create` | Create a Workload |
| `f5xc-api-appstack-workload-get` | Get Workload details |
| `f5xc-api-appstack-workload-list` | List Workloads in namespace |
| `f5xc-api-appstack-workload-update` | Update Workload configuration |
| `f5xc-api-appstack-workload-delete` | Delete Workload |

## Required Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| namespace | string | Target namespace |
| name | string | Workload name |
| containers | array | Container definitions |
| deploy_options | object | Deployment target configuration |

## Example Usage

### Create Workload

Ask Claude:

> "Create a workload named 'example-app' running nginx on the 'example-vk8s' virtual kubernetes"

### f5xcctl Equivalent

```bash
f5xcctl apply -f - <<EOF
apiVersion: config.volterra.io/v1
kind: workload
metadata:
  name: example-app
  namespace: production
spec:
  service_type: SERVICE_TYPE_CLUSTERIP
  replicas: 3
  containers:
    - name: nginx
      image:
        name: nginx:1.25
        pull_policy: PULL_IF_NOT_PRESENT
      ports:
        - container_port: 80
          protocol: TCP
      resources:
        requests:
          cpu: 100m
          memory: 128Mi
        limits:
          cpu: 500m
          memory: 256Mi
  deploy_options:
    virtual_k8s:
      namespace: production
      name: example-vk8s
EOF
```

### Terraform Resource

```hcl
resource "volterra_workload" "example_app" {
  name      = "example-app"
  namespace = "production"

  service_type = "SERVICE_TYPE_CLUSTERIP"
  replicas     = 3

  containers {
    name = "nginx"
    image {
      name        = "nginx:1.25"
      pull_policy = "PULL_IF_NOT_PRESENT"
    }
    ports {
      container_port = 80
      protocol       = "TCP"
    }
    resources {
      requests = {
        cpu    = "100m"
        memory = "128Mi"
      }
      limits = {
        cpu    = "500m"
        memory = "256Mi"
      }
    }
  }

  deploy_options {
    virtual_k8s {
      namespace = "production"
      name      = volterra_virtual_k8s.example_vk8s.name
    }
  }
}
```

## Service Types

| Type | Description |
|------|-------------|
| `SERVICE_TYPE_CLUSTERIP` | Internal cluster access only |
| `SERVICE_TYPE_NODEPORT` | Expose on node ports |
| `SERVICE_TYPE_LOADBALANCER` | External load balancer |

## Common Configurations

### Basic Web Application

```json
{
  "name": "example-app",
  "namespace": "production",
  "service_type": "SERVICE_TYPE_CLUSTERIP",
  "replicas": 2,
  "containers": [{
    "name": "web",
    "image": {"name": "nginx:1.25"},
    "ports": [{"container_port": 80}]
  }],
  "deploy_options": {
    "virtual_k8s": {
      "namespace": "production",
      "name": "example-vk8s"
    }
  }
}
```

### With Environment Variables

```json
{
  "containers": [{
    "name": "app",
    "image": {"name": "example/app:v1"},
    "env": [
      {
        "name": "DATABASE_URL",
        "value": "postgres://db:5432/app"
      },
      {
        "name": "API_KEY",
        "secret_ref": {
          "namespace": "production",
          "name": "api-credentials",
          "key": "api_key"
        }
      }
    ]
  }]
}
```

### With Volume Mounts

```json
{
  "containers": [{
    "name": "app",
    "image": {"name": "example/app:v1"},
    "volume_mounts": [{
      "name": "config",
      "mount_path": "/etc/config"
    }]
  }],
  "volumes": [{
    "name": "config",
    "config_map": {
      "name": "app-config"
    }
  }]
}
```

### With Health Checks

```json
{
  "containers": [{
    "name": "app",
    "image": {"name": "example/app:v1"},
    "liveness_probe": {
      "http_get": {
        "path": "/health",
        "port": 8080
      },
      "initial_delay_seconds": 10,
      "period_seconds": 30
    },
    "readiness_probe": {
      "http_get": {
        "path": "/ready",
        "port": 8080
      },
      "initial_delay_seconds": 5,
      "period_seconds": 10
    }
  }]
}
```

### Multi-Container Pod

```json
{
  "containers": [
    {
      "name": "app",
      "image": {"name": "example/app:v1"},
      "ports": [{"container_port": 8080}]
    },
    {
      "name": "sidecar",
      "image": {"name": "example/sidecar:v1"},
      "ports": [{"container_port": 9090}]
    }
  ]
}
```

## Related Resources

- [Virtual K8s](virtual-k8s.md) - Virtual Kubernetes deployment target
- [K8s Cluster](k8s-cluster.md) - Physical Kubernetes clusters
- [Secret](secret.md) - Secret management for containers
- [Origin Pool](origin-pool.md) - Connect to workload services

## Troubleshooting

### Workload Not Starting

1. Check container image accessibility
2. Verify resource requests don't exceed limits
3. Review container logs for errors
4. Check image pull secrets if using private registry

### Pod CrashLoopBackOff

!!! tip "Check Logs"
    Use `kubectl logs` or F5XC Console to view container output.

1. Review container logs for startup errors
2. Check liveness probe configuration
3. Verify environment variables are correct
4. Ensure mounted volumes exist

### Service Not Accessible

1. Verify service type configuration
2. Check port mappings are correct
3. Review network policies
4. Confirm target pods are running and ready
