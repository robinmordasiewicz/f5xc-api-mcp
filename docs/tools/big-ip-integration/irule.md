---
page_title: f5xc_irule - f5xc-api-mcp
subcategory: BIG-IP Integration
description: Create iRule
---

# Irule

Create iRule in a given namespace. If one already exists it will give an error.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-irule-create` | Create iRule |
| `f5xc-api-core-irule-get` | Get iRule |
| `f5xc-api-core-irule-list` | List Configure iRule |
| `f5xc-api-core-irule-update` | Replace iRule |
| `f5xc-api-core-irule-delete` | Delete Configure iRule |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `metadata.namespace` | namespace |
| `name` | name |
| `namespace` | namespace |
| `metadata.name` | name |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | The label_filter parameter |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with Irule resources:

### Create Irule

> "Create a irule named 'example' in the 'production' namespace"

### List Irules

> "List all irules in the 'production' namespace"

### Get Irule Details

> "Get details of the irule named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f irule.yaml

# Get
f5xcctl get irule {name} -n {namespace}

# List
f5xcctl get irules -n {namespace}

# Delete
f5xcctl delete irule {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_irule" "example" {
  name      = "example-irule"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
