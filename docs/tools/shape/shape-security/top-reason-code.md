---
page_title: f5xc_top_reason_code - f5xc-api-mcp
subcategory: Shape
description: Peergroup Top Reason Codes.
---

# Top Reason Code

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET Top Reason Codes.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-top-reason-code-create` | Peergroup Top Reason Codes. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- top-reason-code

## Example Usage

Ask Claude to help you work with Top Reason Code resources:

### Create Top Reason Code

> "Create a top-reason-code named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl shape top-reason-code create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl shape top-reason-code create {name} --namespace {namespace}
```

Create top-reason-code

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create top_reason_code -n <namespace> -i top_reason_code.yaml

# Get
f5xcctl shape get top_reason_code <name> -n <namespace>

# List
f5xcctl shape list top_reason_code -n <namespace>

# Delete
f5xcctl shape delete top_reason_code <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_top_reason_code" "example" {
  name      = "example-top-reason-code"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
