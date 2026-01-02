---
page_title: f5xc_hit - f5xc-api-mcp
subcategory: Network Security
description: Fast ACL Hits.
---

# Hit

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET the counter for Fast ACL hits for a given namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networksecurity-hit-create` | Fast ACL Hits. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Ns1` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- hit

## Example Usage

Ask Claude to help you work with Hit resources:

### Create Hit

> "Create a hit named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh network_security create hit -n <namespace> -i hit.yaml

# Get
xcsh network_security get hit <name> -n <namespace>

# List
xcsh network_security list hit -n <namespace>

# Delete
xcsh network_security delete hit <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_hit" "example" {
  name      = "example-hit"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
