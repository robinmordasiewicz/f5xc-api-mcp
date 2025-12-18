---
page_title: f5xc_approve - f5xc-api-mcp
subcategory: Organization
description: Registration Approve
---

# Approve

RegistrationApprove approved pending registration and it can also decommission by changing state to
RETIRED.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-approve-create` | Registration Approve |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Approve resources:

### Create Approve

> "Create a approve named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f approve.yaml

# Get
f5xcctl get approve {name} -n {namespace}

# List
f5xcctl get approves -n {namespace}

# Delete
f5xcctl delete approve {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_approve" "example" {
  name      = "example-approve"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
