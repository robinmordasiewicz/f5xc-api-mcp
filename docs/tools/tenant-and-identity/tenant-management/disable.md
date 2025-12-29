---
page_title: f5xc_disable - f5xc-api-mcp
subcategory: Tenant And Identity
description: Disable tenant level OTP.
---

# Disable

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Disable tenant level OTP disables OTP on tenant-level. After it's disabled it's up to user whether
to enable OTP.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-disable-update` | Disable tenant level OTP. |

## Side Effects

Operations on this resource may have the following effects:

**Modifies:**

- disable

## Example Usage

Ask Claude to help you work with Disable resources:

## CLI Examples

Examples from the enriched OpenAPI specifications:

### update

```bash
f5xcctl web disable update {name} --namespace {namespace} -f {file}.yaml
```

Update disable

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl tenant_and_identity create disable -n <namespace> -i disable.yaml

# Get
f5xcctl tenant_and_identity get disable <name> -n <namespace>

# List
f5xcctl tenant_and_identity list disable -n <namespace>

# Delete
f5xcctl tenant_and_identity delete disable <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_disable" "example" {
  name      = "example-disable"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
