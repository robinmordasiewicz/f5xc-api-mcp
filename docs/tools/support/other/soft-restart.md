---
page_title: f5xc_soft_restart - f5xc-api-mcp
subcategory: Support
description: Soft restart.
---

# Soft Restart

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Soft restart reloads VER instance on the node.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-support-soft-restart-create` | Soft restart. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |
| `node` | Node Name | `Master-0` |
| `service` | Service Name | `Vpm` |
| `site` | Site Name | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- soft-restart

## Example Usage

Ask Claude to help you work with Soft Restart resources:

### Create Soft Restart

> "Create a soft-restart named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl operate soft-restart create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl operate soft-restart create {name} --namespace {namespace}
```

Create soft-restart

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl support create soft_restart -n <namespace> -i soft_restart.yaml

# Get
f5xcctl support get soft_restart <name> -n <namespace>

# List
f5xcctl support list soft_restart -n <namespace>

# Delete
f5xcctl support delete soft_restart <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_soft_restart" "example" {
  name      = "example-soft-restart"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
