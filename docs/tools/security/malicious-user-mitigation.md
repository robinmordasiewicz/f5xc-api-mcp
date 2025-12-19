---
page_title: f5xc_malicious_user_mitigation - f5xc-api-mcp
subcategory: Security
description: Create Malicious User Mitigation
---

# Malicious User Mitigation

Replace malicious_user_mitigation replaces an existing object in the storage backend for
metadata.namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-malicious-user-mitigation-create` | Create Malicious User Mitigation |
| `f5xc-api-security-malicious-user-mitigation-get` | Get Malicious User Mitigation |
| `f5xc-api-security-malicious-user-mitigation-list` | List Malicious User Mitigation |
| `f5xc-api-security-malicious-user-mitigation-update` | Replace Malicious User Mitigation |
| `f5xc-api-security-malicious-user-mitigation-delete` | Delete Malicious User Mitigation |

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

Ask Claude to help you work with Malicious User Mitigation resources:

### Create Malicious User Mitigation

> "Create a malicious-user-mitigation named 'example' in the 'production' namespace"

### List Malicious User Mitigations

> "List all malicious-user-mitigations in the 'production' namespace"

### Get Malicious User Mitigation Details

> "Get details of the malicious-user-mitigation named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create malicious_user_mitigation -n <namespace> -i malicious_user_mitigation.yaml

# Get
f5xcctl configuration get malicious_user_mitigation -n <namespace> <name>

# List
f5xcctl configuration list malicious_user_mitigation -n <namespace>

# Delete
f5xcctl configuration delete malicious_user_mitigation -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_malicious_user_mitigation" "example" {
  name      = "example-malicious-user-mitigation"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
