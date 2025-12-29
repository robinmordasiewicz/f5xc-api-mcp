---
page_title: f5xc_import_axfr - f5xc-api-mcp
subcategory: DNS
description: Import DNS Zone.
---

# Import Axfr

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Import DNS Zone via AXFR.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-dns-import-axfr-create` | Import DNS Zone. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- import-axfr

## Example Usage

Ask Claude to help you work with Import Axfr resources:

### Create Import Axfr

> "Create a import-axfr named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl config import-axfr create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl config import-axfr create {name} --namespace {namespace}
```

Create import-axfr

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl dns create import_axfr -n <namespace> -i import_axfr.yaml

# Get
f5xcctl dns get import_axfr <name> -n <namespace>

# List
f5xcctl dns list import_axfr -n <namespace>

# Delete
f5xcctl dns delete import_axfr <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_import_axfr" "example" {
  name      = "example-import-axfr"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
