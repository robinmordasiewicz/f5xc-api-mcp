---
page_title: f5xc_plan - f5xc-api-mcp
subcategory: Marketplace
description: GET Plan
---

# Plan

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET plan reads a given object from storage backend for metadata.namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-marketplace-plan-get` | GET Plan |
| `f5xc-api-marketplace-plan-list` | List Plan |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Name` |
| `namespace` | Namespace | `Ns1` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. | `Env in (staging, testing), tier in (web, db)` |
| `report_fields` | The report_fields parameter | `-` |
| `report_status_fields` | The report_status_fields parameter | `-` |

## Example Usage

Ask Claude to help you work with Plan resources:

### List Plans

> "List all plans in the 'production' namespace"

### Get Plan Details

> "Get details of the plan named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### get_specific

```bash
f5xcctl web plan get {name} --namespace {namespace}
```

Get specific plan

### list_all

```bash
f5xcctl web plan list --namespace {namespace}
```

List all plans

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl marketplace create plan -n <namespace> -i plan.yaml

# Get
f5xcctl marketplace get plan <name> -n <namespace>

# List
f5xcctl marketplace list plan -n <namespace>

# Delete
f5xcctl marketplace delete plan <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_plan" "example" {
  name      = "example-plan"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
