# Virtual K8s

Virtual K8s provides isolated Kubernetes namespaces within F5 Distributed Cloud, enabling
multi-tenant container workload deployment with namespace-level isolation.

!!! info "Subscription Tier"
    **ADVANCED** - Requires advanced F5XC subscription tier.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-appstack-virtual-k8s-create` | Create a Virtual K8s namespace |
| `f5xc-api-appstack-virtual-k8s-get` | Get Virtual K8s details |
| `f5xc-api-appstack-virtual-k8s-list` | List Virtual K8s in namespace |
| `f5xc-api-appstack-virtual-k8s-update` | Update Virtual K8s configuration |
| `f5xc-api-appstack-virtual-k8s-delete` | Delete Virtual K8s |

## Required Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| namespace | string | Target F5XC namespace |
| name | string | Virtual K8s name |
| vsite_refs | array | Virtual site references |

## Example Usage

### Create Virtual K8s

Ask Claude:

> "Create a virtual Kubernetes namespace named 'example-vk8s' spanning multiple sites"

### f5xcctl Equivalent

```bash
f5xcctl apply -f - <<EOF
apiVersion: config.volterra.io/v1
kind: virtual_k8s
metadata:
  name: example-vk8s
  namespace: production
spec:
  vsite_refs:
    - namespace: shared
      name: all-sites
  default_flavor_ref:
    namespace: shared
    name: default-vk8s-flavor
EOF
```

### Terraform Resource

```hcl
resource "volterra_virtual_k8s" "example_vk8s" {
  name      = "example-vk8s"
  namespace = "production"

  vsite_refs {
    namespace = "shared"
    name      = "all-sites"
  }

  default_flavor_ref {
    namespace = "shared"
    name      = "default-vk8s-flavor"
  }
}
```

## Key Concepts

### Virtual Sites

Virtual K8s runs on virtual sites, which are logical groupings of physical sites:

```json
{
  "vsite_refs": [{
    "namespace": "shared",
    "name": "us-sites"
  }]
}
```

### Flavors

Flavors define resource limits and configurations for Virtual K8s:

| Flavor | Resources |
|--------|-----------|
| `tiny` | 0.1 vCPU, 128Mi memory |
| `small` | 0.5 vCPU, 512Mi memory |
| `medium` | 1 vCPU, 1Gi memory |
| `large` | 2 vCPU, 2Gi memory |

## Common Configurations

### Basic Virtual K8s

```json
{
  "name": "example-vk8s",
  "namespace": "production",
  "vsite_refs": [{
    "namespace": "shared",
    "name": "all-sites"
  }]
}
```

### With Custom Flavor

```json
{
  "name": "example-vk8s",
  "namespace": "production",
  "vsite_refs": [{
    "namespace": "shared",
    "name": "production-sites"
  }],
  "default_flavor_ref": {
    "namespace": "shared",
    "name": "large-vk8s-flavor"
  }
}
```

### Multi-Region Deployment

```json
{
  "name": "example-vk8s",
  "namespace": "production",
  "vsite_refs": [
    {
      "namespace": "shared",
      "name": "us-east-sites"
    },
    {
      "namespace": "shared",
      "name": "eu-west-sites"
    }
  ]
}
```

### With Isolated Namespace

```json
{
  "name": "example-vk8s",
  "namespace": "production",
  "vsite_refs": [{
    "namespace": "shared",
    "name": "secure-sites"
  }],
  "isolated_namespace": {}
}
```

## Deployment Workflow

1. **Create Virtual Site**: Define site grouping
2. **Create Virtual K8s**: Deploy vK8s on virtual site
3. **Download Kubeconfig**: Get access credentials
4. **Deploy Workloads**: Use kubectl or Workload resources

## Related Resources

- [K8s Cluster](k8s-cluster.md) - Physical Kubernetes clusters
- [Workload](workload.md) - Container workload deployment
- [Origin Pool](origin-pool.md) - Backend pool for K8s services

## Troubleshooting

### Virtual K8s Not Ready

1. Verify virtual site has available sites
2. Check sites are healthy and online
3. Review namespace quota limits
4. Confirm flavor resources are available

### Kubeconfig Not Working

!!! tip "Refresh Kubeconfig"
    Kubeconfig tokens expire; download a fresh one if access fails.

1. Download new kubeconfig from Console
2. Verify correct namespace context
3. Check network connectivity
4. Review user permissions

### Workloads Not Deploying

1. Check resource quota availability
2. Verify image pull secrets
3. Review pod security constraints
4. Check site network policies
