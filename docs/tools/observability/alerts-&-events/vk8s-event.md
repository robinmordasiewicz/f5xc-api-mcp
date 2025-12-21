---
page_title: f5xc_vk8s_event - f5xc-api-mcp
subcategory: Observability
description: VK8s Events Query.
---

# Vk8s Event

Request to GET Virtual K8s events that matches the criteria in request for a given namespace.
If no
match conditions are specified in the request, then the response contains all
vK8s events in the
namespace. User with access to the `system` namespace may query for vK8s across
all namespaces for a
given tenant.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-vk8s-event-create` | VK8s Events Query. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Vk8s Event resources:

### Create Vk8s Event

> "Create a vk8s-event named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create vk8s_event -n <namespace> -i vk8s_event.yaml

# Get
f5xcctl configuration get vk8s_event -n <namespace> <name>

# List
f5xcctl configuration list vk8s_event -n <namespace>

# Delete
f5xcctl configuration delete vk8s_event -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_vk8s_event" "example" {
  name      = "example-vk8s-event"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
