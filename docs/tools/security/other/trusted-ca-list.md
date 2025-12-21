---
page_title: f5xc_trusted_ca_list - f5xc-api-mcp
subcategory: Security
description: Create Root CA Certificate.
---

# Trusted Ca List

Shape of the Root CA Certificate specification.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-trusted-ca-list-create` | Create Root CA Certificate. |
| `f5xc-api-security-trusted-ca-list-get` | GET Root CA Certificate. |
| `f5xc-api-security-trusted-ca-list-list` | List Root CA Certificate. |
| `f5xc-api-security-trusted-ca-list-update` | Replace Root CA Certificate. |
| `f5xc-api-security-trusted-ca-list-delete` | DELETE Root CA Certificate. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `metadata.namespace` | Namespace |
| `name` | Name |
| `namespace` | Namespace |
| `metadata.name` | Name |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with Trusted Ca List resources:

### Create Trusted Ca List

> "Create a trusted-ca-list named 'example' in the 'production' namespace"

### List Trusted Ca Lists

> "List all trusted-ca-lists in the 'production' namespace"

### Get Trusted Ca List Details

> "Get details of the trusted-ca-list named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl security create trusted_ca_list -n <namespace> -i trusted_ca_list.yaml

# Get
f5xcctl security get trusted_ca_list <name> -n <namespace>

# List
f5xcctl security list trusted_ca_list -n <namespace>

# Delete
f5xcctl security delete trusted_ca_list <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_trusted_ca_list" "example" {
  name      = "example-trusted-ca-list"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
