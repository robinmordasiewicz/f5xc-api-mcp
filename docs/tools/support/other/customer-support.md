---
page_title: f5xc_customer_support - f5xc-api-mcp
subcategory: Support
description: Create Customer Support.
---

# Customer Support

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Support ticket representation we display to customers. There's much more information associated with
a ticker but this maybe sensitive/irrelevant.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-support-customer-support-create` | Create Customer Support. |
| `f5xc-api-support-customer-support-get` | GET Customer Support. |
| `f5xc-api-support-customer-support-list` | List all tenant tickets. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `metadata.namespace` | Namespace | `Staging` |
| `name` | Name | `Name` |
| `namespace` | Namespace | `Ns1` |

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

- customer-support

## Example Usage

Ask Claude to help you work with Customer Support resources:

### Create Customer Support

> "Create a customer-support named 'example' in the 'production' namespace"

### List Customer Supports

> "List all customer-supports in the 'production' namespace"

### Get Customer Support Details

> "Get details of the customer-support named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh support create customer_support -n <namespace> -i customer_support.yaml

# Get
xcsh support get customer_support <name> -n <namespace>

# List
xcsh support list customer_support -n <namespace>

# Delete
xcsh support delete customer_support <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_customer_support" "example" {
  name      = "example-customer-support"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
