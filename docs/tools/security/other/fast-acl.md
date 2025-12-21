---
page_title: f5xc_fast_acl - f5xc-api-mcp
subcategory: Security
description: Create Fast ACL.
---

# Fast Acl

Replace a `fast_acl` object, `fast_acl` object contains rules to protect site from denial of
service
It has destination{destination IP, destination port) and references to `fast_acl_rule`

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-fast-acl-create` | Create Fast ACL. |
| `f5xc-api-security-fast-acl-get` | GET Fast ACL. |
| `f5xc-api-security-fast-acl-list` | List Fast ACL. |
| `f5xc-api-security-fast-acl-update` | Replace Fast ACL. |
| `f5xc-api-security-fast-acl-delete` | DELETE Fast ACL. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `metadata.namespace` | Namespace |
| `name` | Name |
| `namespace` | Namespace |
| `metadata.name` | Name |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with Fast Acl resources:

### Create Fast Acl

> "Create a fast-acl named 'example' in the 'production' namespace"

### List Fast Acls

> "List all fast-acls in the 'production' namespace"

### Get Fast Acl Details

> "Get details of the fast-acl named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create fast_acl -n <namespace> -i fast_acl.yaml

# Get
f5xcctl configuration get fast_acl -n <namespace> <name>

# List
f5xcctl configuration list fast_acl -n <namespace>

# Delete
f5xcctl configuration delete fast_acl -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_fast_acl" "example" {
  name      = "example-fast-acl"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
