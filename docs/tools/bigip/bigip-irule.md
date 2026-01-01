---
page_title: f5xc_bigip_irule - f5xc-api-mcp
subcategory: BIG-IP Integration
description: Specification.
---

# Bigip Irule

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

List the set of bigip_irule in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-bigip-bigip-irule-create` | Specification. |
| `f5xc-api-bigip-bigip-irule-get` | Specification. |
| `f5xc-api-bigip-bigip-irule-list` | List BIG-IP iRule as a Service. |
| `f5xc-api-bigip-bigip-irule-update` | Specification. |
| `f5xc-api-bigip-bigip-irule-delete` | DELETE BIG-IP iRule as a Service. |

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

- bigip-irule

**Modifies:**

- bigip-irule

**Deletes:**

- bigip-irule
- contained_resources

## Example Usage

Ask Claude to help you work with Bigip Irule resources:

### Create Bigip Irule

> "Create a bigip-irule named 'example' in the 'production' namespace"

### List Bigip Irules

> "List all bigip-irules in the 'production' namespace"

### Get Bigip Irule Details

> "Get details of the bigip-irule named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh bigip create bigip_irule -n <namespace> -i bigip_irule.yaml

# Get
xcsh bigip get bigip_irule <name> -n <namespace>

# List
xcsh bigip list bigip_irule -n <namespace>

# Delete
xcsh bigip delete bigip_irule <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_bigip_irule" "example" {
  name      = "example-bigip-irule"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
