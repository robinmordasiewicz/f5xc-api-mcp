---
page_title: f5xc_namespace - f5xc-api-mcp
subcategory: Organization
description: Create Namespace
---

# Namespace

Replaces attributes of a namespace including its metadata like labels, description etc.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-namespace-create` | Create Namespace |
| `f5xc-api-core-namespace-get` | Get Namespace |
| `f5xc-api-core-namespace-list` | List Namespace |
| `f5xc-api-core-namespace-update` | Replace Namespace |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | name |
| `metadata.name` | name |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | The namespace parameter |
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | The label_filter parameter |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with Namespace resources:

### Create Namespace

> "Create a namespace named 'example' in the 'production' namespace"

### List Namespaces

> "List all namespaces in the 'production' namespace"

### Get Namespace Details

> "Get details of the namespace named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create namespace -n <namespace> -i namespace.yaml

# Get
f5xcctl configuration get namespace -n <namespace> <name>

# List
f5xcctl configuration list namespace -n <namespace>

# Delete
f5xcctl configuration delete namespace -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_namespace" "example" {
  name      = "example-namespace"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
