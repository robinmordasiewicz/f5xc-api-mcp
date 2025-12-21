---
page_title: f5xc_mitigated_domain - f5xc-api-mcp
subcategory: Shape Security (Bot Defense)
description: Create Mitigated Domain.
---

# Mitigated Domain

List the set of mitigated_domain in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shapesecurity-mitigated-domain-create` | Create Mitigated Domain. |
| `f5xc-api-shapesecurity-mitigated-domain-get` | GET Mitigated Domain. |
| `f5xc-api-shapesecurity-mitigated-domain-list` | List Client-Side Defense Mitigated Domain. |
| `f5xc-api-shapesecurity-mitigated-domain-delete` | DELETE Client-Side Defense Mitigated Domain. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `metadata.namespace` | Namespace |
| `name` | Name |
| `namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with Mitigated Domain resources:

### Create Mitigated Domain

> "Create a mitigated-domain named 'example' in the 'production' namespace"

### List Mitigated Domains

> "List all mitigated-domains in the 'production' namespace"

### Get Mitigated Domain Details

> "Get details of the mitigated-domain named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create mitigated_domain -n <namespace> -i mitigated_domain.yaml

# Get
f5xcctl configuration get mitigated_domain -n <namespace> <name>

# List
f5xcctl configuration list mitigated_domain -n <namespace>

# Delete
f5xcctl configuration delete mitigated_domain -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_mitigated_domain" "example" {
  name      = "example-mitigated-domain"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
