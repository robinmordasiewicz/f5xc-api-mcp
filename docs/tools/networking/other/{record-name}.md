---
page_title: f5xc_{record_name} - f5xc-api-mcp
subcategory: Networking
description: DELETE
---

# {record Name}

Replace CustomAPI.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networking-record-name-list` | GET |
| `f5xc-api-networking-record-name-update` | Replace |
| `f5xc-api-networking-record-name-delete` | DELETE |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `dns_zone_name` | Dns_zone_name |
| `group_name` | Group_name |
| `record_name` | Record_name |
| `type` | Type |

## Example Usage

Ask Claude to help you work with {record Name} resources:

### List {record Name}s

> "List all {record-name}s in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl networking create {record_name} -n <namespace> -i {record_name}.yaml

# Get
f5xcctl networking get {record_name} <name> -n <namespace>

# List
f5xcctl networking list {record_name} -n <namespace>

# Delete
f5xcctl networking delete {record_name} <name> -n <namespace>
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
