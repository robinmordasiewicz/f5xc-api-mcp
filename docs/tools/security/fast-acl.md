---
page_title: f5xc_fast_acl - f5xc-api-mcp
subcategory: Security
description: Create Fast ACL
---

# Fast Acl

Replace a `fast_acl` object, `fast_acl` object contains rules to protect site from denial of
service
It has destination{destination IP, destination port) and references to `fast_acl_rule`

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-fast-acl-create` | Create Fast ACL |
| `f5xc-api-core-fast-acl-get` | Get Fast ACL |
| `f5xc-api-core-fast-acl-list` | List Fast ACL |
| `f5xc-api-core-fast-acl-update` | Replace Fast ACL |
| `f5xc-api-core-fast-acl-delete` | Delete Fast ACL |

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
f5xcctl apply -f fast_acl.yaml

# Get
f5xcctl get fast_acl {name} -n {namespace}

# List
f5xcctl get fast_acls -n {namespace}

# Delete
f5xcctl delete fast_acl {name} -n {namespace}
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
