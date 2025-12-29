---
page_title: f5xc_enable - f5xc-api-mcp
subcategory: Tenant And Identity
description: Enable tenant level OTP.
---

# Enable

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Enable tenant level OTP enables OTP on tenant-level. It enforces each user within a tenant to enable
OTP.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-enable-update` | Enable tenant level OTP. |

## Side Effects

Operations on this resource may have the following effects:

**Modifies:**

- enable

## Example Usage

Ask Claude to help you work with Enable resources:

## CLI Examples

Examples from the enriched OpenAPI specifications:

### update

```bash
f5xcctl web enable update {name} --namespace {namespace} -f {file}.yaml
```

Update enable

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl tenant_and_identity create enable -n <namespace> -i enable.yaml

# Get
f5xcctl tenant_and_identity get enable <name> -n <namespace>

# List
f5xcctl tenant_and_identity list enable -n <namespace>

# Delete
f5xcctl tenant_and_identity delete enable <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_enable" "example" {
  name      = "example-enable"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
