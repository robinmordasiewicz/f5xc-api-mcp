---
page_title: f5xc_namespace_role - f5xc-api-mcp
subcategory: Organization
description: Get Namespace Role
---

# Namespace Role

Allows listing a role of a user in a namespace

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-namespace-role-get` | Get Namespace Role |
| `f5xc-api-core-namespace-role-list` | List Namespace Role |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
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

Ask Claude to help you work with Namespace Role resources:

### List Namespace Roles

> "List all namespace-roles in the 'production' namespace"

### Get Namespace Role Details

> "Get details of the namespace-role named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f namespace_role.yaml

# Get
f5xcctl get namespace_role {name} -n {namespace}

# List
f5xcctl get namespace_roles -n {namespace}

# Delete
f5xcctl delete namespace_role {name} -n {namespace}
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
