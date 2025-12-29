---
page_title: f5xc_gettopriskydevice - f5xc-api-mcp
subcategory: Shape
description: GetTopRiskyDevices.
---

# Gettopriskydevice

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET top risky devices data request in a time range.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-gettopriskydevice-create` | GetTopRiskyDevices. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- gettopriskydevice

## Example Usage

Ask Claude to help you work with Gettopriskydevice resources:

### Create Gettopriskydevice

> "Create a gettopriskydevice named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl shape gettopriskydevice create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl shape gettopriskydevice create {name} --namespace {namespace}
```

Create gettopriskydevice

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create gettopriskydevice -n <namespace> -i gettopriskydevice.yaml

# Get
f5xcctl shape get gettopriskydevice <name> -n <namespace>

# List
f5xcctl shape list gettopriskydevice -n <namespace>

# Delete
f5xcctl shape delete gettopriskydevice <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_gettopriskydevice" "example" {
  name      = "example-gettopriskydevice"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
