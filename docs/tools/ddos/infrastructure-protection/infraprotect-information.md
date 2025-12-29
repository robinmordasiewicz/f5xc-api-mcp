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

## CLI Examples

Examples from the enriched OpenAPI specifications:

### get_specific

```bash
f5xcctl infraprotect infraprotect-information get {name} --namespace {namespace}
```

Get specific infraprotect-information

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl ddos create infraprotect_information -n <namespace> -i infraprotect_information.yaml

# Get
f5xcctl ddos get infraprotect_information <name> -n <namespace>

# List
f5xcctl ddos list infraprotect_information -n <namespace>

# Delete
f5xcctl ddos delete infraprotect_information <name> -n <namespace>
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
