---
page_title: f5xc_allowed_domain - f5xc-api-mcp
subcategory: Organization
description: Create Allowed Domain
---

# Allowed Domain

List the set of allowed_domain in a namespace

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-allowed-domain-create` | Create Allowed Domain |
| `f5xc-api-core-allowed-domain-get` | Get Allowed Domain |
| `f5xc-api-core-allowed-domain-list` | List Client-Side Defense Allowed Domain |
| `f5xc-api-core-allowed-domain-delete` | Delete Client-Side Defense Allowed Domain |

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

Ask Claude to help you work with Allowed Domain resources:

### Create Allowed Domain

> "Create a allowed-domain named 'example' in the 'production' namespace"

### List Allowed Domains

> "List all allowed-domains in the 'production' namespace"

### Get Allowed Domain Details

> "Get details of the allowed-domain named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create allowed_domain -n <namespace> -i allowed_domain.yaml

# Get
f5xcctl configuration get allowed_domain -n <namespace> <name>

# List
f5xcctl configuration list allowed_domain -n <namespace>

# Delete
f5xcctl configuration delete allowed_domain -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_allowed_domain" "example" {
  name      = "example-allowed-domain"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
