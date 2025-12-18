---
page_title: f5xc_{record_name} - f5xc-api-mcp
subcategory: DNS
description: Delete
---

# {record Name}

Delete

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-dns-record-name-list` | Get |
| `f5xc-api-dns-record-name-update` | Replace |
| `f5xc-api-dns-record-name-delete` | Delete |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `dns_zone_name` | dns_zone_name |
| `group_name` | group_name |
| `record_name` | record_name |
| `type` | type |

## Example Usage

Ask Claude to help you work with {record Name} resources:

### List {record Name}s

> "List all {record-name}s in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f {record_name}.yaml

# Get
f5xcctl get {record_name} {name} -n {namespace}

# List
f5xcctl get {record_name}s -n {namespace}

# Delete
f5xcctl delete {record_name} {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_{record_name}" "example" {
  name      = "example-{record-name}"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
