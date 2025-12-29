---
page_title: f5xc_import_bind_validate - f5xc-api-mcp
subcategory: DNS
description: Validate BIND Files.
---

# Import Bind Validate

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Validate BIND Files for Import.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-dns-import-bind-validate-create` | Validate BIND Files. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- import-bind-validate

## Example Usage

Ask Claude to help you work with Import Bind Validate resources:

### Create Import Bind Validate

> "Create a import-bind-validate named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl config import-bind-validate create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl config import-bind-validate create {name} --namespace {namespace}
```

Create import-bind-validate

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl dns create import_bind_validate -n <namespace> -i import_bind_validate.yaml

# Get
f5xcctl dns get import_bind_validate <name> -n <namespace>

# List
f5xcctl dns list import_bind_validate -n <namespace>

# Delete
f5xcctl dns delete import_bind_validate <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_import_bind_validate" "example" {
  name      = "example-import-bind-validate"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
