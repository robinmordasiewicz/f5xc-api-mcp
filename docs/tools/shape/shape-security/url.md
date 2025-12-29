---
page_title: f5xc_url - f5xc-api-mcp
subcategory: Shape
description: GET Bot Assessment by Top URLs.
---

# Url

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET Bot Top URL Information.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-url-create` | GET Bot Assessment by Top URLs. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- url

## Example Usage

Ask Claude to help you work with Url resources:

### Create Url

> "Create a url named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl shape url create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl shape url create {name} --namespace {namespace}
```

Create url

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create url -n <namespace> -i url.yaml

# Get
f5xcctl shape get url <name> -n <namespace>

# List
f5xcctl shape list url -n <namespace>

# Delete
f5xcctl shape delete url <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_url" "example" {
  name      = "example-url"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
