---
page_title: f5xc_unsubscribe - f5xc-api-mcp
subcategory: Observability
description: Unsubscribe to Observability Synthetic Monitor.
---

# Unsubscribe

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Unsubscribe to Observability Synthetic Monitor.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-unsubscribe-create` | Unsubscribe to Observability Synthetic Monitor. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- unsubscribe

## Example Usage

Ask Claude to help you work with Unsubscribe resources:

### Create Unsubscribe

> "Create a unsubscribe named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl observability unsubscribe create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl observability unsubscribe create {name} --namespace {namespace}
```

Create unsubscribe

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl observability create unsubscribe -n <namespace> -i unsubscribe.yaml

# Get
f5xcctl observability get unsubscribe <name> -n <namespace>

# List
f5xcctl observability list unsubscribe -n <namespace>

# Delete
f5xcctl observability delete unsubscribe <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_unsubscribe" "example" {
  name      = "example-unsubscribe"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
