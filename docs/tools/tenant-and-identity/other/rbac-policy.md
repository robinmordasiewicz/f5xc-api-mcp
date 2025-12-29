---
page_title: f5xc_rbac_policy - f5xc-api-mcp
subcategory: Tenant And Identity
description: GET RBAC Policy.
---

# Rbac Policy

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET rbac_policy reads a given object from storage backend for metadata.namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-rbac-policy-get` | GET RBAC Policy. |
| `f5xc-api-tenantandidentity-rbac-policy-list` | List RBAC Policy. |

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

Ask Claude to help you work with Rbac Policy resources:

### List Rbac Policys

> "List all rbac-policys in the 'production' namespace"

### Get Rbac Policy Details

> "Get details of the rbac-policy named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### get_specific

```bash
f5xcctl web rbac-policy get {name} --namespace {namespace}
```

Get specific rbac-policy

### list_all

```bash
f5xcctl web rbac-policy list --namespace {namespace}
```

List all rbac-policys

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl tenant_and_identity create rbac_policy -n <namespace> -i rbac_policy.yaml

# Get
f5xcctl tenant_and_identity get rbac_policy <name> -n <namespace>

# List
f5xcctl tenant_and_identity list rbac_policy -n <namespace>

# Delete
f5xcctl tenant_and_identity delete rbac_policy <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_rbac_policy" "example" {
  name      = "example-rbac-policy"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
