---
page_title: f5xc_gettopriskyipaddresse - f5xc-api-mcp
subcategory: Shape
description: GetTopRiskyIpAddresses.
---

# Gettopriskyipaddresse

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET top risky IP addresses data request in a time range.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-gettopriskyipaddresse-create` | GetTopRiskyIpAddresses. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- gettopriskyipaddresse

## Example Usage

Ask Claude to help you work with Gettopriskyipaddresse resources:

### Create Gettopriskyipaddresse

> "Create a gettopriskyipaddresse named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create gettopriskyipaddresse -n <namespace> -i gettopriskyipaddresse.yaml

# Get
xcsh shape get gettopriskyipaddresse <name> -n <namespace>

# List
xcsh shape list gettopriskyipaddresse -n <namespace>

# Delete
xcsh shape delete gettopriskyipaddresse <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_gettopriskyipaddresse" "example" {
  name      = "example-gettopriskyipaddresse"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
