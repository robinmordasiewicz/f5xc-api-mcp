---
page_title: f5xc_setting - f5xc-api-mcp
subcategory: Tenant And Identity
description: GetIDMSettings.
---

# Setting

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GetIDMSettings returns IDM settings for tenant. IDM settings contains info like password
policy,
brute-force detection policy, etc...

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-setting-list` | GetIDMSettings. |
| `f5xc-api-tenantandidentity-setting-update` | UpdateIDMSettings. |

## Side Effects

Operations on this resource may have the following effects:

**Modifies:**

- setting

## Example Usage

Ask Claude to help you work with Setting resources:

### List Settings

> "List all settings in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### list_all

```bash
f5xcctl web setting list --namespace {namespace}
```

List all settings

### update

```bash
f5xcctl web setting update {name} --namespace {namespace} -f {file}.yaml
```

Update setting

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl tenant_and_identity create setting -n <namespace> -i setting.yaml

# Get
f5xcctl tenant_and_identity get setting <name> -n <namespace>

# List
f5xcctl tenant_and_identity list setting -n <namespace>

# Delete
f5xcctl tenant_and_identity delete setting <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_setting" "example" {
  name      = "example-setting"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
