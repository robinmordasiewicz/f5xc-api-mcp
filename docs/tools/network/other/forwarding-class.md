---
page_title: f5xc_forwarding_class - f5xc-api-mcp
subcategory: Network
description: Create Forwarding Class.
---

# Forwarding Class

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replace Forwarding Class will replace the contains of given object.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-network-forwarding-class-create` | Create Forwarding Class. |
| `f5xc-api-network-forwarding-class-get` | GET Forwarding Class. |
| `f5xc-api-network-forwarding-class-list` | List Forwarding Class. |
| `f5xc-api-network-forwarding-class-update` | Replace Forwarding Class. |
| `f5xc-api-network-forwarding-class-delete` | DELETE Forwarding Class. |

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

- forwarding-class

**Modifies:**

- forwarding-class

**Deletes:**

- forwarding-class
- contained_resources

## Example Usage

Ask Claude to help you work with Forwarding Class resources:

### Create Forwarding Class

> "Create a forwarding-class named 'example' in the 'production' namespace"

### List Forwarding Classs

> "List all forwarding-classs in the 'production' namespace"

### Get Forwarding Class Details

> "Get details of the forwarding-class named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh network create forwarding_class -n <namespace> -i forwarding_class.yaml

# Get
xcsh network get forwarding_class <name> -n <namespace>

# List
xcsh network list forwarding_class -n <namespace>

# Delete
xcsh network delete forwarding_class <name> -n <namespace>
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
