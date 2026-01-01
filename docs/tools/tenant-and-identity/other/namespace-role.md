---
page_title: f5xc_namespace_role - f5xc-api-mcp
subcategory: Tenant And Identity
description: GET Namespace Role.
---

# Namespace Role

!!! info "Low Risk"
    Operations on this resource are generally safe.

Allows listing a role of a user in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-namespace-role-get` | GET Namespace Role. |
| `f5xc-api-tenantandidentity-namespace-role-list` | List Namespace Role. |

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

Ask Claude to help you work with Namespace Role resources:

### List Namespace Roles

> "List all namespace-roles in the 'production' namespace"

### Get Namespace Role Details

> "Get details of the namespace-role named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh tenant_and_identity create namespace_role -n <namespace> -i namespace_role.yaml

# Get
xcsh tenant_and_identity get namespace_role <name> -n <namespace>

# List
xcsh tenant_and_identity list namespace_role -n <namespace>

# Delete
xcsh tenant_and_identity delete namespace_role <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_namespace_role" "example" {
  name      = "example-namespace-role"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
