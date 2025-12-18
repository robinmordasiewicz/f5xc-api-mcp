---
page_title: f5xc_check - f5xc-api-mcp
subcategory: Organization
description: Check Peer Status
---

# Check

Check if the tenant has the peer or not

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-check-create` | Check Peer Status |

## Example Usage

Ask Claude to help you work with Check resources:

### Create Check

> "Create a check named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f check.yaml

# Get
f5xcctl get check {name} -n {namespace}

# List
f5xcctl get checks -n {namespace}

# Delete
f5xcctl delete check {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_check" "example" {
  name      = "example-check"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
