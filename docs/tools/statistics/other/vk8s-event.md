---
page_title: f5xc_vk8s_event - f5xc-api-mcp
subcategory: Statistics
description: VK8s Events Query.
---

# Vk8s Event

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

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
| `f5xc-api-statistics-vk8s-event-create` | VK8s Events Query. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- vk8s-event

## Example Usage

Ask Claude to help you work with Vk8s Event resources:

### Create Vk8s Event

> "Create a vk8s-event named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl data vk8s-event create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl data vk8s-event create {name} --namespace {namespace}
```

Create vk8s-event

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl statistics create vk8s_event -n <namespace> -i vk8s_event.yaml

# Get
f5xcctl statistics get vk8s_event <name> -n <namespace>

# List
f5xcctl statistics list vk8s_event -n <namespace>

# Delete
f5xcctl statistics delete vk8s_event <name> -n <namespace>
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
