---
page_title: f5xc_service_policy_set - f5xc-api-mcp
subcategory: Virtual
description: GET Service Policy Set.
---

# Service Policy Set

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET service_policy_set reads a given object from storage backend for metadata.namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-virtual-service-policy-set-get` | GET Service Policy Set. |
| `f5xc-api-virtual-service-policy-set-list` | List Service Policy Set. |

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

Ask Claude to help you work with Service Policy Set resources:

### List Service Policy Sets

> "List all service-policy-sets in the 'production' namespace"

### Get Service Policy Set Details

> "Get details of the service-policy-set named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### get_specific

```bash
f5xcctl config service-policy-set get {name} --namespace {namespace}
```

Get specific service-policy-set

### list_all

```bash
f5xcctl config service-policy-set list --namespace {namespace}
```

List all service-policy-sets

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl virtual create service_policy_set -n <namespace> -i service_policy_set.yaml

# Get
f5xcctl virtual get service_policy_set <name> -n <namespace>

# List
f5xcctl virtual list service_policy_set -n <namespace>

# Delete
f5xcctl virtual delete service_policy_set <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_service_policy_set" "example" {
  name      = "example-service-policy-set"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
