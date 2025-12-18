# K8s Cluster

K8s Clusters provide managed Kubernetes infrastructure deployed on F5 Distributed Cloud sites,
enabling container workload orchestration with integrated networking and security.

!!! info "Subscription Tier"
    **ADVANCED** - Requires advanced F5XC subscription tier.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-appstack-k8s-cluster-create` | Create a K8s Cluster |
| `f5xc-api-appstack-k8s-cluster-get` | Get K8s Cluster details |
| `f5xc-api-appstack-k8s-cluster-list` | List K8s Clusters in namespace |
| `f5xc-api-appstack-k8s-cluster-update` | Update K8s Cluster configuration |
| `f5xc-api-appstack-k8s-cluster-delete` | Delete K8s Cluster |

## Required Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| namespace | string | Target namespace |
| name | string | Cluster name |
| site | object | Site reference for deployment |

## Example Usage

### Create K8s Cluster

Ask Claude:

> "Create a Kubernetes cluster named 'example-k8s' on the 'example-site' with default configuration"

### f5xcctl Equivalent

```bash
f5xcctl apply -f - <<EOF
apiVersion: config.volterra.io/v1
kind: k8s_cluster
metadata:
  name: example-k8s
  namespace: production
spec:
  site:
    namespace: system
    name: example-site
  local_access_config:
    local_domain: example-k8s.local
  use_default_cluster_roles: {}
  use_default_psp: {}
EOF
```

### Terraform Resource

```hcl
resource "volterra_k8s_cluster" "example_k8s" {
  name      = "example-k8s"
  namespace = "production"

  site {
    namespace = "system"
    name      = "example-site"
  }

  local_access_config {
    local_domain = "example-k8s.local"
  }

  use_default_cluster_roles = true
  use_default_psp           = true
}
```

## Configuration Options

### Cluster Roles

| Option | Description |
|--------|-------------|
| `use_default_cluster_roles` | Use F5XC default RBAC roles |
| `custom_cluster_roles` | Define custom RBAC configuration |

### Pod Security Policies

| Option | Description |
|--------|-------------|
| `use_default_psp` | Use F5XC default pod security |
| `use_custom_psp` | Define custom pod security policies |

## Common Configurations

### Basic Cluster

```json
{
  "name": "example-k8s",
  "namespace": "production",
  "site": {
    "namespace": "system",
    "name": "example-site"
  },
  "use_default_cluster_roles": {},
  "use_default_psp": {}
}
```

### With Custom Domain

```json
{
  "name": "example-k8s",
  "site": {
    "namespace": "system",
    "name": "example-site"
  },
  "local_access_config": {
    "local_domain": "k8s.internal.example.com",
    "port": 65443
  }
}
```

### With Global Access

```json
{
  "name": "example-k8s",
  "site": {
    "namespace": "system",
    "name": "example-site"
  },
  "global_access_config": {
    "global_domain": "k8s.example.com"
  }
}
```

### Multi-Site Cluster

```json
{
  "name": "example-k8s",
  "site_selector": {
    "expressions": ["site in (site-a, site-b, site-c)"]
  },
  "use_default_cluster_roles": {},
  "use_default_psp": {}
}
```

## Access Methods

### Local Access

Access cluster from within the site network:

```bash
kubectl --kubeconfig=./kubeconfig get pods
```

### Global Access

Access cluster from F5XC network:

```bash
kubectl --kubeconfig=./kubeconfig-global get pods
```

## Related Resources

- [Virtual K8s](virtual-k8s.md) - Virtual Kubernetes namespaces
- [Workload](workload.md) - Container workload deployment
- [Customer Edge](customer-edge.md) - On-premises site deployment

## Troubleshooting

### Cluster Not Ready

1. Verify site is healthy and online
2. Check site has sufficient resources
3. Review cluster events for errors
4. Confirm network connectivity

### Cannot Access Cluster

!!! tip "Download Kubeconfig"
    Download the kubeconfig from F5XC Console under the cluster details.

1. Verify kubeconfig is current
2. Check access method (local vs global)
3. Confirm network path to cluster
4. Review RBAC permissions

### Pods Not Scheduling

1. Check node resources and capacity
2. Review pod resource requests/limits
3. Verify pod security policy compliance
4. Check for node taints and tolerations
