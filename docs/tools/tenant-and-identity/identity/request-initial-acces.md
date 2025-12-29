---
page_title: f5xc_request_initial_acces - f5xc-api-mcp
subcategory: Tenant And Identity
description: Request Initial Access.
---

# Request Initial Acces

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Request initial access requests initial access for user within tenant.
Emails will be send to
tenant's admins with corresponding information.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-request-initial-acces-update` | Request Initial Access. |

## Side Effects

Operations on this resource may have the following effects:

**Modifies:**

- request-initial-acces

## Example Usage

Ask Claude to help you work with Request Initial Acces resources:

## CLI Examples

Examples from the enriched OpenAPI specifications:

### update

```bash
f5xcctl web request-initial-acces update {name} --namespace {namespace} -f {file}.yaml
```

Update request-initial-acces

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl tenant_and_identity create request_initial_acces -n <namespace> -i request_initial_acces.yaml

# Get
f5xcctl tenant_and_identity get request_initial_acces <name> -n <namespace>

# List
f5xcctl tenant_and_identity list request_initial_acces -n <namespace>

# Delete
f5xcctl tenant_and_identity delete request_initial_acces <name> -n <namespace>
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
