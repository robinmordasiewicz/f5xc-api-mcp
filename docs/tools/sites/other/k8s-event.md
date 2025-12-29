---
page_title: f5xc_k8s_event - f5xc-api-mcp
subcategory: Sites
description: K8s Events Query.
---

# K8S Event

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Request to GET physical K8s events that matches the criteria in request for a given namespace.
If no
match conditions are specified in the request, then the response contains all
K8s events in the
namespace. User with access to the `system` namespace may query for K8s events across
all namespaces
in a K8s Cluster.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-k8s-event-create` | K8s Events Query. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |
| `site` | Site | `CE-1` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- k8s-event

## Example Usage

Ask Claude to help you work with K8S Event resources:

### Create K8S Event

> "Create a k8s-event named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl data k8s-event create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl data k8s-event create {name} --namespace {namespace}
```

Create k8s-event

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl sites create k8s_event -n <namespace> -i k8s_event.yaml

# Get
f5xcctl sites get k8s_event <name> -n <namespace>

# List
f5xcctl sites list k8s_event -n <namespace>

# Delete
f5xcctl sites delete k8s_event <name> -n <namespace>
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
