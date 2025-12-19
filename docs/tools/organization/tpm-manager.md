---
page_title: f5xc_tpm_manager - f5xc-api-mcp
subcategory: Organization
description: Create TPM Manager
---

# Tpm Manager

List the set of tpm_manager in a namespace

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-tpm-manager-create` | Create TPM Manager |
| `f5xc-api-core-tpm-manager-get` | Get TPM Manager |
| `f5xc-api-core-tpm-manager-list` | List TPM Manager |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `metadata.namespace` | namespace |
| `name` | name |
| `namespace` | namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | The label_filter parameter |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with Tpm Manager resources:

### Create Tpm Manager

> "Create a tpm-manager named 'example' in the 'production' namespace"

### List Tpm Managers

> "List all tpm-managers in the 'production' namespace"

### Get Tpm Manager Details

> "Get details of the tpm-manager named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create tpm_manager -n <namespace> -i tpm_manager.yaml

# Get
f5xcctl configuration get tpm_manager -n <namespace> <name>

# List
f5xcctl configuration list tpm_manager -n <namespace>

# Delete
f5xcctl configuration delete tpm_manager -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_tpm_manager" "example" {
  name      = "example-tpm-manager"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
