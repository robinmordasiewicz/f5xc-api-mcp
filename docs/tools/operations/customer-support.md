---
page_title: f5xc_customer_support - f5xc-api-mcp
subcategory: Operations
description: Create Customer Support.
---

# Customer Support

Support ticket representation we display to customers. There's much more information associated with
a ticker but this maybe sensitive/irrelevant.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-operations-customer-support-create` | Create Customer Support. |
| `f5xc-api-operations-customer-support-get` | GET Customer Support. |
| `f5xc-api-operations-customer-support-list` | List all tenant tickets. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `metadata.namespace` | Namespace |
| `name` | Name |
| `namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with Customer Support resources:

### Create Customer Support

> "Create a customer-support named 'example' in the 'production' namespace"

### List Customer Supports

> "List all customer-supports in the 'production' namespace"

### Get Customer Support Details

> "Get details of the customer-support named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl operations create customer_support -n <namespace> -i customer_support.yaml

# Get
f5xcctl operations get customer_support <name> -n <namespace>

# List
f5xcctl operations list customer_support -n <namespace>

# Delete
f5xcctl operations delete customer_support <name> -n <namespace>
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
