---
page_title: f5xc_diagnosi - f5xc-api-mcp
subcategory: Support
description: Diagnosis
---

# Diagnosi

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET VPM network information.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-support-diagnosi-list` | Diagnosis |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `site` | Site Name | `Value` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `console_user` | Name of the console user who runs this command. | `Console-user.` |

## Example Usage

Ask Claude to help you work with Diagnosi resources:

### List Diagnosis

> "List all diagnosis in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### list_all

```bash
f5xcctl operate diagnosi list --namespace {namespace}
```

List all diagnosis

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl support create diagnosi -n <namespace> -i diagnosi.yaml

# Get
f5xcctl support get diagnosi <name> -n <namespace>

# List
f5xcctl support list diagnosi -n <namespace>

# Delete
f5xcctl support delete diagnosi <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_diagnosi" "example" {
  name      = "example-diagnosi"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
