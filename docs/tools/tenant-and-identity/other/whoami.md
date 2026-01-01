---
page_title: f5xc_whoami - f5xc-api-mcp
subcategory: Tenant And Identity
description: GET User Details.
---

# Whoami

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET fetches user information based on the username header from the request context
this API is also
called as WhoAmI.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-whoami-list` | GET User Details. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |

## Example Usage

Ask Claude to help you work with Whoami resources:

### List Whoamis

> "List all whoamis in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh tenant_and_identity create whoami -n <namespace> -i whoami.yaml

# Get
xcsh tenant_and_identity get whoami <name> -n <namespace>

# List
xcsh tenant_and_identity list whoami -n <namespace>

# Delete
xcsh tenant_and_identity delete whoami <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_whoami" "example" {
  name      = "example-whoami"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
