---
page_title: f5xc_rate_limit - f5xc-api-mcp
subcategory: API
description: Suggest rate limit rule.
---

# Rate Limit

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Suggest rate limit rule for a given path.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-api-rate-limit-create` | Suggest rate limit rule. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Shared` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- rate-limit

## Example Usage

Ask Claude to help you work with Rate Limit resources:

### Create Rate Limit

> "Create a rate-limit named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl config rate-limit create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl config rate-limit create {name} --namespace {namespace}
```

Create rate-limit

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl api create rate_limit -n <namespace> -i rate_limit.yaml

# Get
f5xcctl api get rate_limit <name> -n <namespace>

# List
f5xcctl api list rate_limit -n <namespace>

# Delete
f5xcctl api delete rate_limit <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_rate_limit" "example" {
  name      = "example-rate-limit"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
