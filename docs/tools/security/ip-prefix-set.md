---
page_title: f5xc_ip_prefix_set - f5xc-api-mcp
subcategory: Security
description: Create IP Prefix Set
---

# IP Prefix Set

Replace ip_prefix_set replaces an existing object in the storage backend for metadata.namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-ip-prefix-set-create` | Create IP Prefix Set |
| `f5xc-api-core-ip-prefix-set-get` | Get IP Prefix Set |
| `f5xc-api-core-ip-prefix-set-list` | List IP Prefix Set |
| `f5xc-api-core-ip-prefix-set-update` | Replace IP Prefix Set |
| `f5xc-api-core-ip-prefix-set-delete` | Delete IP Prefix Set |

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

Ask Claude to help you work with IP Prefix Set resources:

### Create IP Prefix Set

> "Create a ip-prefix-set named 'example' in the 'production' namespace"

### List IP Prefix Sets

> "List all ip-prefix-sets in the 'production' namespace"

### Get IP Prefix Set Details

> "Get details of the ip-prefix-set named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f ip_prefix_set.yaml

# Get
f5xcctl get ip_prefix_set {name} -n {namespace}

# List
f5xcctl get ip_prefix_sets -n {namespace}

# Delete
f5xcctl delete ip_prefix_set {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_ip_prefix_set" "example" {
  name      = "example-ip-prefix-set"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
