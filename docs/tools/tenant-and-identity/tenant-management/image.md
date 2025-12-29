---
page_title: f5xc_image - f5xc-api-mcp
subcategory: Tenant And Identity
description: DELETE tenant profile image.
---

# Image

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Uploads new profile image for the tenant entity.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-image-list` | Tenant profile image. |
| `f5xc-api-tenantandidentity-image-update` | Update tenant profile image. |
| `f5xc-api-tenantandidentity-image-delete` | DELETE tenant profile image. |

## Side Effects

Operations on this resource may have the following effects:

**Modifies:**

- image

**Deletes:**

- image
- contained_resources

## Example Usage

Ask Claude to help you work with Image resources:

### List Images

> "List all images in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### delete

```bash
f5xcctl web image delete {name} --namespace {namespace}
```

Delete image

### list_all

```bash
f5xcctl web image list --namespace {namespace}
```

List all images

### update

```bash
f5xcctl web image update {name} --namespace {namespace} -f {file}.yaml
```

Update image

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl tenant_and_identity create image -n <namespace> -i image.yaml

# Get
f5xcctl tenant_and_identity get image <name> -n <namespace>

# List
f5xcctl tenant_and_identity list image -n <namespace>

# Delete
f5xcctl tenant_and_identity delete image <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_image" "example" {
  name      = "example-image"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
