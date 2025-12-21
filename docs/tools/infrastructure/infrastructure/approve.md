---
page_title: f5xc_approve - f5xc-api-mcp
subcategory: Infrastructure
description: Registration Approve.
---

# Approve

RegistrationApprove approved pending registration and it can also decommission by changing state to
RETIRED.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-infrastructure-approve-create` | Registration Approve. |

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
f5xcctl infrastructure create approve -n <namespace> -i approve.yaml

# Get
f5xcctl infrastructure get approve <name> -n <namespace>

# List
f5xcctl infrastructure list approve -n <namespace>

# Delete
f5xcctl infrastructure delete approve <name> -n <namespace>
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
