---
page_title: f5xc_secret_policy - f5xc-api-mcp
subcategory: Certificates
description: Create Secret Policy
---

# Secret Policy

Replace secret_policy replaces an existing object in the storage backend for metadata.namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-secret-policy-create` | Create Secret Policy |
| `f5xc-api-core-secret-policy-get` | Get Secret Policy |
| `f5xc-api-core-secret-policy-list` | List Secret Policy |
| `f5xc-api-core-secret-policy-update` | Replace Secret Policy |
| `f5xc-api-core-secret-policy-delete` | Delete Secret Policy |

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

Ask Claude to help you work with Secret Policy resources:

### Create Secret Policy

> "Create a secret-policy named 'example' in the 'production' namespace"

### List Secret Policys

> "List all secret-policys in the 'production' namespace"

### Get Secret Policy Details

> "Get details of the secret-policy named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create secret_policy -n <namespace> -i secret_policy.yaml

# Get
f5xcctl configuration get secret_policy -n <namespace> <name>

# List
f5xcctl configuration list secret_policy -n <namespace>

# Delete
f5xcctl configuration delete secret_policy -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_secret_policy" "example" {
  name      = "example-secret-policy"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
