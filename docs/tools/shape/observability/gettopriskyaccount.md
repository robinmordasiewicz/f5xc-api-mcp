---
page_title: f5xc_gettopriskyaccount - f5xc-api-mcp
subcategory: Shape
description: GetTopRiskyAccounts.
---

# Gettopriskyaccount

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET top risky accounts data request in a time range.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-gettopriskyaccount-create` | GetTopRiskyAccounts. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- gettopriskyaccount

## Example Usage

Ask Claude to help you work with Gettopriskyaccount resources:

### Create Gettopriskyaccount

> "Create a gettopriskyaccount named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl shape gettopriskyaccount create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl shape gettopriskyaccount create {name} --namespace {namespace}
```

Create gettopriskyaccount

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create gettopriskyaccount -n <namespace> -i gettopriskyaccount.yaml

# Get
f5xcctl shape get gettopriskyaccount <name> -n <namespace>

# List
f5xcctl shape list gettopriskyaccount -n <namespace>

# Delete
f5xcctl shape delete gettopriskyaccount <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_gettopriskyaccount" "example" {
  name      = "example-gettopriskyaccount"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
