---
page_title: f5xc_catalog - f5xc-api-mcp
subcategory: Statistics
description: List
---

# Catalog

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Retrieves service catalog tailor for the currently logged-in user.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-statistics-catalog-update` | List |

## Side Effects

Operations on this resource may have the following effects:

**Modifies:**

- catalog

## Example Usage

Ask Claude to help you work with Catalog resources:

## CLI Examples

Examples from the enriched OpenAPI specifications:

### update

```bash
f5xcctl web catalog update {name} --namespace {namespace} -f {file}.yaml
```

Update catalog

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl statistics create catalog -n <namespace> -i catalog.yaml

# Get
f5xcctl statistics get catalog <name> -n <namespace>

# List
f5xcctl statistics list catalog -n <namespace>

# Delete
f5xcctl statistics delete catalog <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_catalog" "example" {
  name      = "example-catalog"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
