---
page_title: f5xc_asorg - f5xc-api-mcp
subcategory: Shape
description: Top Malicious Bots by ASOrg.
---

# Asorg

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET top malicious bots by AS Organization.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-asorg-create` | Top Malicious Bots by ASOrg. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- asorg

## Example Usage

Ask Claude to help you work with Asorg resources:

### Create Asorg

> "Create a asorg named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl shape asorg create {name} --namespace {namespace}
```

Create asorg

### file_based

```bash
f5xcctl shape asorg create -f {file}.yaml
```

Create from YAML file

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create asorg -n <namespace> -i asorg.yaml

# Get
f5xcctl shape get asorg <name> -n <namespace>

# List
f5xcctl shape list asorg -n <namespace>

# Delete
f5xcctl shape delete asorg <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_asorg" "example" {
  name      = "example-asorg"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
