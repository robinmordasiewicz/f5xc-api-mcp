---
page_title: f5xc_exec - f5xc-api-mcp
subcategory: Organization
description: Exec
---

# Exec

Run supported exec command on node

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-exec-create` | Exec |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `node` | Node Name |
| `site` | Site Name |

## Example Usage

Ask Claude to help you work with Exec resources:

### Create Exec

> "Create a exec named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create exec -n <namespace> -i exec.yaml

# Get
f5xcctl configuration get exec -n <namespace> <name>

# List
f5xcctl configuration list exec -n <namespace>

# Delete
f5xcctl configuration delete exec -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_exec" "example" {
  name      = "example-exec"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
