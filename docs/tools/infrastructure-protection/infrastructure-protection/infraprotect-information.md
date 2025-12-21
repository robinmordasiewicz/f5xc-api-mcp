---
page_title: f5xc_infraprotect_information - f5xc-api-mcp
subcategory: Infrastructure Protection
description: GET Infraprotect Information.
---

# Infraprotect Information

GET organisation information.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-infrastructureprotection-infraprotect-information-get` | GET Infraprotect Information. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |

## Example Usage

Ask Claude to help you work with Infraprotect Information resources:

### Get Infraprotect Information Details

> "Get details of the infraprotect-information named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl infrastructure_protection create infraprotect_information -n <namespace> -i infraprotect_information.yaml

# Get
f5xcctl infrastructure_protection get infraprotect_information <name> -n <namespace>

# List
f5xcctl infrastructure_protection list infraprotect_information -n <namespace>

# Delete
f5xcctl infrastructure_protection delete infraprotect_information <name> -n <namespace>
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
