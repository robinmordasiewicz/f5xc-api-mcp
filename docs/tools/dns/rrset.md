---
page_title: f5xc_rrset - f5xc-api-mcp
subcategory: DNS
description: Create
---

# Rrset

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Create CustomAPI.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-dns-rrset-create` | Create |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `dns_zone_name` | Dns_zone_name | `-` |
| `group_name` | Group_name | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- rrset

## Example Usage

Ask Claude to help you work with Rrset resources:

### Create Rrset

> "Create a rrset named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl config rrset create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl config rrset create {name} --namespace {namespace}
```

Create rrset

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl dns create rrset -n <namespace> -i rrset.yaml

# Get
f5xcctl dns get rrset <name> -n <namespace>

# List
f5xcctl dns list rrset -n <namespace>

# Delete
f5xcctl dns delete rrset <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_rrset" "example" {
  name      = "example-rrset"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
