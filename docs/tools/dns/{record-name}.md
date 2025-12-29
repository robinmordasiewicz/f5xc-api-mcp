---
page_title: f5xc_{record_name} - f5xc-api-mcp
subcategory: DNS
description: DELETE
---

# {record Name}

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replace CustomAPI.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-dns-record-name-list` | GET |
| `f5xc-api-dns-record-name-update` | Replace |
| `f5xc-api-dns-record-name-delete` | DELETE |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `dns_zone_name` | Dns_zone_name | `-` |
| `group_name` | Group_name | `-` |
| `record_name` | Record_name | `-` |
| `type` | Type | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Modifies:**

- rrset

**Deletes:**

- rrset
- contained_resources

## Example Usage

Ask Claude to help you work with {record Name} resources:

### List {record Name}s

> "List all {record-name}s in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### delete

```bash
f5xcctl config rrset delete {name} --namespace {namespace}
```

Delete rrset

### list_all

```bash
f5xcctl config rrset list --namespace {namespace}
```

List all rrsets

### update

```bash
f5xcctl config rrset update {name} --namespace {namespace} -f {file}.yaml
```

Update rrset

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl dns create {record_name} -n <namespace> -i {record_name}.yaml

# Get
f5xcctl dns get {record_name} <name> -n <namespace>

# List
f5xcctl dns list {record_name} -n <namespace>

# Delete
f5xcctl dns delete {record_name} <name> -n <namespace>
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
