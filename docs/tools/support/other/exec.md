---
page_title: f5xc_exec - f5xc-api-mcp
subcategory: Support
description: Exec
---

# Exec

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Run supported exec command on node.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-support-exec-create` | Exec |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |
| `node` | Node Name | `Master-0` |
| `site` | Site Name | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- exec

## Example Usage

Ask Claude to help you work with Exec resources:

### Create Exec

> "Create a exec named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh support create exec -n <namespace> -i exec.yaml

# Get
xcsh support get exec <name> -n <namespace>

# List
xcsh support list exec -n <namespace>

# Delete
xcsh support delete exec <name> -n <namespace>
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
