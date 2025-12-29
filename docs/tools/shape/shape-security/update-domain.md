---
page_title: f5xc_update_domain - f5xc-api-mcp
subcategory: Shape
description: Update Domains.
---

# Update Domain

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Update domain from mitigated domains to allowed domains and vice versa.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-update-domain-create` | Update Domains. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Default` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- update-domain

## Example Usage

Ask Claude to help you work with Update Domain resources:

### Create Update Domain

> "Create a update-domain named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl shape update-domain create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl shape update-domain create {name} --namespace {namespace}
```

Create update-domain

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create update_domain -n <namespace> -i update_domain.yaml

# Get
f5xcctl shape get update_domain <name> -n <namespace>

# List
f5xcctl shape list update_domain -n <namespace>

# Delete
f5xcctl shape delete update_domain <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_update_domain" "example" {
  name      = "example-update-domain"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
