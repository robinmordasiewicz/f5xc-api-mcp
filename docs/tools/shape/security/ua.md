---
page_title: f5xc_ua - f5xc-api-mcp
subcategory: Shape
description: Malicious Report Transactions UA.
---

# Ua

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Malicious Report Transactions UA.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-ua-create` | Malicious Report Transactions UA. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- ua

## Example Usage

Ask Claude to help you work with Ua resources:

### Create Ua

> "Create a ua named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl shape ua create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl shape ua create {name} --namespace {namespace}
```

Create ua

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create ua -n <namespace> -i ua.yaml

# Get
f5xcctl shape get ua <name> -n <namespace>

# List
f5xcctl shape list ua -n <namespace>

# Delete
f5xcctl shape delete ua <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_ua" "example" {
  name      = "example-ua"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
