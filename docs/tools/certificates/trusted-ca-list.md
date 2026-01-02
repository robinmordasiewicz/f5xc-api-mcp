---
page_title: f5xc_trusted_ca_list - f5xc-api-mcp
subcategory: Certificates
description: Create Root CA Certificate.
---

# Trusted Ca List

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Shape of the Root CA Certificate specification.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-certificates-trusted-ca-list-create` | Create Root CA Certificate. |
| `f5xc-api-certificates-trusted-ca-list-get` | GET Root CA Certificate. |
| `f5xc-api-certificates-trusted-ca-list-list` | List Root CA Certificate. |
| `f5xc-api-certificates-trusted-ca-list-update` | Replace Root CA Certificate. |
| `f5xc-api-certificates-trusted-ca-list-delete` | DELETE Root CA Certificate. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `metadata.namespace` | Namespace | `Staging` |
| `name` | Name | `Name` |
| `namespace` | Namespace | `Ns1` |
| `metadata.name` | Name | `Example-corp-web.` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. | `Env in (staging, testing), tier in (web, db)` |
| `report_fields` | The report_fields parameter | `-` |
| `report_status_fields` | The report_status_fields parameter | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- trusted-ca-list

**Modifies:**

- trusted-ca-list

**Deletes:**

- trusted-ca-list
- contained_resources

## Example Usage

Ask Claude to help you work with Trusted Ca List resources:

### Create Trusted Ca List

> "Create a trusted-ca-list named 'example' in the 'production' namespace"

### List Trusted Ca Lists

> "List all trusted-ca-lists in the 'production' namespace"

### Get Trusted Ca List Details

> "Get details of the trusted-ca-list named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh certificates create trusted_ca_list -n <namespace> -i trusted_ca_list.yaml

# Get
xcsh certificates get trusted_ca_list <name> -n <namespace>

# List
xcsh certificates list trusted_ca_list -n <namespace>

# Delete
xcsh certificates delete trusted_ca_list <name> -n <namespace>
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
