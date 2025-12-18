---
page_title: f5xc_request_initial_acces - f5xc-api-mcp
subcategory: Organization
description: Request Initial Access
---

# Request Initial Acces

Request initial access requests initial access for user within tenant.
Emails will be send to
tenant's admins with corresponding information.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-request-initial-acces-update` | Request Initial Access |

## Example Usage

Ask Claude to help you work with Request Initial Acces resources:

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f request_initial_acces.yaml

# Get
f5xcctl get request_initial_acces {name} -n {namespace}

# List
f5xcctl get request_initial_access -n {namespace}

# Delete
f5xcctl delete request_initial_acces {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_request_initial_acces" "example" {
  name      = "example-request-initial-acces"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
