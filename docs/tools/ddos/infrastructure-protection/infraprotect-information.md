---
page_title: f5xc_infraprotect_information - f5xc-api-mcp
subcategory: Ddos
description: GET Infraprotect Information.
---

# Infraprotect Information

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET organisation information.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-ddos-infraprotect-information-get` | GET Infraprotect Information. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Name` |
| `namespace` | Namespace | `Ns1` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |

## Example Usage

Ask Claude to help you work with Infraprotect Information resources:

### Get Infraprotect Information Details

> "Get details of the infraprotect-information named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh ddos create infraprotect_information -n <namespace> -i infraprotect_information.yaml

# Get
xcsh ddos get infraprotect_information <name> -n <namespace>

# List
xcsh ddos list infraprotect_information -n <namespace>

# Delete
xcsh ddos delete infraprotect_information <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_infraprotect_information" "example" {
  name      = "example-infraprotect-information"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
