---
page_title: f5xc_asorg - f5xc-api-mcp
subcategory: Networking
description: Top Malicious Bots by ASOrg
---

# Asorg

Get top malicious bots by AS Organization

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-asorg-create` | Top Malicious Bots by ASOrg |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Asorg resources:

### Create Asorg

> "Create a asorg named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f asorg.yaml

# Get
f5xcctl get asorg {name} -n {namespace}

# List
f5xcctl get asorgs -n {namespace}

# Delete
f5xcctl delete asorg {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_asorg" "example" {
  name      = "example-asorg"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
