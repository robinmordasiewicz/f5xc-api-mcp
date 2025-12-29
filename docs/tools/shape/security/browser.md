---
page_title: f5xc_browser - f5xc-api-mcp
subcategory: Shape
description: Malicious Report Transactions Browser.
---

# Browser

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Malicious Report Transactions Browser.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-browser-create` | Malicious Report Transactions Browser. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- browser

## Example Usage

Ask Claude to help you work with Browser resources:

### Create Browser

> "Create a browser named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl shape browser create {name} --namespace {namespace}
```

Create browser

### file_based

```bash
f5xcctl shape browser create -f {file}.yaml
```

Create from YAML file

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create browser -n <namespace> -i browser.yaml

# Get
f5xcctl shape get browser <name> -n <namespace>

# List
f5xcctl shape list browser -n <namespace>

# Delete
f5xcctl shape delete browser <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_browser" "example" {
  name      = "example-browser"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
