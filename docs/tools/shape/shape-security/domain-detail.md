---
page_title: f5xc_domain_detail - f5xc-api-mcp
subcategory: Shape
description: GET Domain Details.
---

# Domain Detail

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET the details of the domain provided.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-domain-detail-list` | GET Domain Details. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Default` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name of the domain to GET the details. | `domain.com.` |

## Example Usage

Ask Claude to help you work with Domain Detail resources:

### List Domain Details

> "List all domain-details in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### list_all

```bash
f5xcctl shape domain-detail list --namespace {namespace}
```

List all domain-details

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create domain_detail -n <namespace> -i domain_detail.yaml

# Get
f5xcctl shape get domain_detail <name> -n <namespace>

# List
f5xcctl shape list domain_detail -n <namespace>

# Delete
f5xcctl shape delete domain_detail <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_domain_detail" "example" {
  name      = "example-domain-detail"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
