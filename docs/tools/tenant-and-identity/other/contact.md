---
page_title: f5xc_contact - f5xc-api-mcp
subcategory: Tenant And Identity
description: Create Contact.
---

# Contact

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Creates a new customer's contact detail record with us, including address and phone number.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-contact-create` | Create Contact. |
| `f5xc-api-tenantandidentity-contact-get` | GET Contact. |
| `f5xc-api-tenantandidentity-contact-list` | List Contact. |
| `f5xc-api-tenantandidentity-contact-update` | Replace Contact. |
| `f5xc-api-tenantandidentity-contact-delete` | DELETE Contact. |

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

- contact

**Modifies:**

- contact

**Deletes:**

- contact
- contained_resources

## Example Usage

Ask Claude to help you work with Contact resources:

### Create Contact

> "Create a contact named 'example' in the 'production' namespace"

### List Contacts

> "List all contacts in the 'production' namespace"

### Get Contact Details

> "Get details of the contact named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh tenant_and_identity create contact -n <namespace> -i contact.yaml

# Get
xcsh tenant_and_identity get contact <name> -n <namespace>

# List
xcsh tenant_and_identity list contact -n <namespace>

# Delete
xcsh tenant_and_identity delete contact <name> -n <namespace>
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
