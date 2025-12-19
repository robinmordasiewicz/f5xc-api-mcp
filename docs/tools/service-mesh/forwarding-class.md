---
page_title: f5xc_forwarding_class - f5xc-api-mcp
subcategory: Service Mesh
description: Create Forwarding Class
---

# Forwarding Class

Replace Forwarding Class will replace the contains of given object

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-forwarding-class-create` | Create Forwarding Class |
| `f5xc-api-core-forwarding-class-get` | Get Forwarding Class |
| `f5xc-api-core-forwarding-class-list` | List Forwarding Class |
| `f5xc-api-core-forwarding-class-update` | Replace Forwarding Class |
| `f5xc-api-core-forwarding-class-delete` | Delete Forwarding Class |

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

Ask Claude to help you work with Forwarding Class resources:

### Create Forwarding Class

> "Create a forwarding-class named 'example' in the 'production' namespace"

### List Forwarding Classs

> "List all forwarding-classs in the 'production' namespace"

### Get Forwarding Class Details

> "Get details of the forwarding-class named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create forwarding_class -n <namespace> -i forwarding_class.yaml

# Get
f5xcctl configuration get forwarding_class -n <namespace> <name>

# List
f5xcctl configuration list forwarding_class -n <namespace>

# Delete
f5xcctl configuration delete forwarding_class -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_forwarding_class" "example" {
  name      = "example-forwarding-class"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
