---
page_title: f5xc_sensitive_data_policy - f5xc-api-mcp
subcategory: Security
description: Create Sensitive Data Discovery
---

# Sensitive Data Policy

Replace sensitive_data_policy replaces an existing object in the storage backend for
metadata.namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-sensitive-data-policy-create` | Create Sensitive Data Discovery |
| `f5xc-api-core-sensitive-data-policy-get` | Get Sensitive Data Discovery |
| `f5xc-api-core-sensitive-data-policy-list` | List Sensitive Data Discovery |
| `f5xc-api-core-sensitive-data-policy-update` | Replace Sensitive Data Discovery |
| `f5xc-api-core-sensitive-data-policy-delete` | Delete Sensitive Data Discovery |

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

Ask Claude to help you work with Sensitive Data Policy resources:

### Create Sensitive Data Policy

> "Create a sensitive-data-policy named 'example' in the 'production' namespace"

### List Sensitive Data Policys

> "List all sensitive-data-policys in the 'production' namespace"

### Get Sensitive Data Policy Details

> "Get details of the sensitive-data-policy named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create sensitive_data_policy -n <namespace> -i sensitive_data_policy.yaml

# Get
f5xcctl configuration get sensitive_data_policy -n <namespace> <name>

# List
f5xcctl configuration list sensitive_data_policy -n <namespace>

# Delete
f5xcctl configuration delete sensitive_data_policy -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_sensitive_data_policy" "example" {
  name      = "example-sensitive-data-policy"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
