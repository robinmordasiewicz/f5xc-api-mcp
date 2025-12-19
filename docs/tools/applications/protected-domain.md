---
page_title: f5xc_protected_domain - f5xc-api-mcp
subcategory: Applications
description: Create Domain to protect
---

# Protected Domain

List the set of protected_domain in a namespace

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-protected-domain-create` | Create Domain to protect |
| `f5xc-api-core-protected-domain-get` | Get Protected Domain |
| `f5xc-api-core-protected-domain-list` | List Client-Side Defense Domain to Protect |
| `f5xc-api-core-protected-domain-delete` | Delete Client-Side Defense Domain to Protect |

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

Ask Claude to help you work with Protected Domain resources:

### Create Protected Domain

> "Create a protected-domain named 'example' in the 'production' namespace"

### List Protected Domains

> "List all protected-domains in the 'production' namespace"

### Get Protected Domain Details

> "Get details of the protected-domain named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create protected_domain -n <namespace> -i protected_domain.yaml

# Get
f5xcctl configuration get protected_domain -n <namespace> <name>

# List
f5xcctl configuration list protected_domain -n <namespace>

# Delete
f5xcctl configuration delete protected_domain -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_protected_domain" "example" {
  name      = "example-protected-domain"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
