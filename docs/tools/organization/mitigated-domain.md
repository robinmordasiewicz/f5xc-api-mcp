---
page_title: f5xc_mitigated_domain - f5xc-api-mcp
subcategory: Organization
description: Create Mitigated Domain
---

# Mitigated Domain

List the set of mitigated_domain in a namespace

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-mitigated-domain-create` | Create Mitigated Domain |
| `f5xc-api-core-mitigated-domain-get` | Get Mitigated Domain |
| `f5xc-api-core-mitigated-domain-list` | List Client-Side Defense Mitigated Domain |
| `f5xc-api-core-mitigated-domain-delete` | Delete Client-Side Defense Mitigated Domain |

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
f5xcctl apply -f mitigated_domain.yaml

# Get
f5xcctl get mitigated_domain {name} -n {namespace}

# List
f5xcctl get mitigated_domains -n {namespace}

# Delete
f5xcctl delete mitigated_domain {name} -n {namespace}
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
