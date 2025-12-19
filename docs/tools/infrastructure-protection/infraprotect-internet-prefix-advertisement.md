---
page_title: f5xc_infraprotect_internet_prefix_advertisement - f5xc-api-mcp
subcategory: Infrastructure Protection
description: Create DDoS transit Internet Prefix
---

# Infraprotect Internet Prefix Advertisement

List the set of infraprotect_internet_prefix_advertisement in a namespace

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-infraprotect-internet-prefix-advertisement-create` | Create DDoS transit Internet Prefix |
| `f5xc-api-core-infraprotect-internet-prefix-advertisement-get` | Get Infraprotect Internet Prefix |
| `f5xc-api-core-infraprotect-internet-prefix-advertisement-list` | List Infraprotect Internet Prefix Advertisement |
| `f5xc-api-core-infraprotect-internet-prefix-advertisement-update` | Replace DDoS transit Internet Prefix |
| `f5xc-api-core-infraprotect-internet-prefix-advertisement-delete` | Delete Infraprotect Internet Prefix Advertisement |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `metadata.namespace` | namespace |
| `name` | name |
| `namespace` | namespace |
| `metadata.name` | name |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | The label_filter parameter |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with Infraprotect Internet Prefix Advertisement resources:

### Create Infraprotect Internet Prefix Advertisement

> "Create a infraprotect-internet-prefix-advertisement named 'example' in the 'production' namespace"

### List Infraprotect Internet Prefix Advertisements

> "List all infraprotect-internet-prefix-advertisements in the 'production' namespace"

### Get Infraprotect Internet Prefix Advertisement Details

> "Get details of the infraprotect-internet-prefix-advertisement named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create infraprotect_internet_prefix_advertisement -n <namespace> -i infraprotect_internet_prefix_advertisement.yaml

# Get
f5xcctl configuration get infraprotect_internet_prefix_advertisement -n <namespace> <name>

# List
f5xcctl configuration list infraprotect_internet_prefix_advertisement -n <namespace>

# Delete
f5xcctl configuration delete infraprotect_internet_prefix_advertisement -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_infraprotect_internet_prefix_advertisement" "example" {
  name      = "example-infraprotect-internet-prefix-advertisement"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
