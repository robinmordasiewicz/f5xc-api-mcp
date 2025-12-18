---
page_title: f5xc_k8s_event - f5xc-api-mcp
subcategory: Kubernetes
description: K8s Events Query
---

# K8S Event

Request to get physical K8s events that matches the criteria in request for a given namespace.
If no
match conditions are specified in the request, then the response contains all
K8s events in the
namespace. User with access to the `system` namespace may query for K8s events across
all namespaces
in a K8s Cluster.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-k8s-event-create` | K8s Events Query |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | namespace |
| `site` | site |

## Example Usage

Ask Claude to help you work with K8S Event resources:

### Create K8S Event

> "Create a k8s-event named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f k8s_event.yaml

# Get
f5xcctl get k8s_event {name} -n {namespace}

# List
f5xcctl get k8s_events -n {namespace}

# Delete
f5xcctl delete k8s_event {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_k8s_event" "example" {
  name      = "example-k8s-event"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
