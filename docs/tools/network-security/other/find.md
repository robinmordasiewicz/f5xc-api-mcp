---
page_title: f5xc_find - f5xc-api-mcp
subcategory: Network Security
description: Find Filter Sets for 1 or More Context Keys.
---

# Find

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Retrieve any saved filter sets that are applicable for the given context key(s)

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networksecurity-find-create` | Find Filter Sets for 1 or More Context Keys. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Bot-defense-apac.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- find

## Example Usage

Ask Claude to help you work with Find resources:

### Create Find

> "Create a find named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl config find create {name} --namespace {namespace}
```

Create find

### file_based

```bash
f5xcctl config find create -f {file}.yaml
```

Create from YAML file

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl network_security create find -n <namespace> -i find.yaml

# Get
f5xcctl network_security get find <name> -n <namespace>

# List
f5xcctl network_security list find -n <namespace>

# Delete
f5xcctl network_security delete find <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_find" "example" {
  name      = "example-find"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
