---
page_title: f5xc_gettopriskyreason - f5xc-api-mcp
subcategory: Shape
description: GetTopRiskyReasons.
---

# Gettopriskyreason

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET top risky reasons data request for a time range.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-gettopriskyreason-create` | GetTopRiskyReasons. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- gettopriskyreason

## Example Usage

Ask Claude to help you work with Gettopriskyreason resources:

### Create Gettopriskyreason

> "Create a gettopriskyreason named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl shape gettopriskyreason create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl shape gettopriskyreason create {name} --namespace {namespace}
```

Create gettopriskyreason

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create gettopriskyreason -n <namespace> -i gettopriskyreason.yaml

# Get
f5xcctl shape get gettopriskyreason <name> -n <namespace>

# List
f5xcctl shape list gettopriskyreason -n <namespace>

# Delete
f5xcctl shape delete gettopriskyreason <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_gettopriskyreason" "example" {
  name      = "example-gettopriskyreason"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
