---
page_title: f5xc_contact - f5xc-api-mcp
subcategory: Organization
description: Create Contact
---

# Contact

Creates a new customer's contact detail record with us, including address and phone number.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-contact-create` | Create Contact |
| `f5xc-api-core-contact-get` | Get Contact |
| `f5xc-api-core-contact-list` | List Contact |
| `f5xc-api-core-contact-update` | Replace Contact |
| `f5xc-api-core-contact-delete` | Delete Contact |

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

Ask Claude to help you work with Contact resources:

### Create Contact

> "Create a contact named 'example' in the 'production' namespace"

### List Contacts

> "List all contacts in the 'production' namespace"

### Get Contact Details

> "Get details of the contact named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create contact -n <namespace> -i contact.yaml

# Get
f5xcctl configuration get contact -n <namespace> <name>

# List
f5xcctl configuration list contact -n <namespace>

# Delete
f5xcctl configuration delete contact -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_contact" "example" {
  name      = "example-contact"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
