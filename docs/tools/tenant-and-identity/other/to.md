---
page_title: f5xc_to - f5xc-api-mcp
subcategory: Tenant And Identity
description: GET TOS
---

# To

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET TOS provides TOS version with text.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-to-list` | GET TOS |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |

## Example Usage

Ask Claude to help you work with To resources:

### List Tos

> "List all tos in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### list_all

```bash
f5xcctl web to list --namespace {namespace}
```

List all tos

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl tenant_and_identity create to -n <namespace> -i to.yaml

# Get
f5xcctl tenant_and_identity get to <name> -n <namespace>

# List
f5xcctl tenant_and_identity list to -n <namespace>

# Delete
f5xcctl tenant_and_identity delete to <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_to" "example" {
  name      = "example-to"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
