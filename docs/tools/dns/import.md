---
page_title: f5xc_import - f5xc-api-mcp
subcategory: DNS
description: Import F5 Cloud Services DNS Zone.
---

# Import

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Import F5 Cloud Services DNS Zone.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-dns-import-create` | Import F5 Cloud Services DNS Zone. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- import

## Example Usage

Ask Claude to help you work with Import resources:

### Create Import

> "Create a import named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl config import create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl config import create {name} --namespace {namespace}
```

Create import

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl dns create import -n <namespace> -i import.yaml

# Get
f5xcctl dns get import <name> -n <namespace>

# List
f5xcctl dns list import -n <namespace>

# Delete
f5xcctl dns delete import <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_import" "example" {
  name      = "example-import"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
