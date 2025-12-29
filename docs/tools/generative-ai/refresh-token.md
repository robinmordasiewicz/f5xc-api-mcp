---
page_title: f5xc_refresh_token - f5xc-api-mcp
subcategory: Generative AI
description: Refresh Token.
---

# Refresh Token

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Enable service by returning service account details.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-generativeai-refresh-token-create` | Refresh Token. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- refresh-token

## Example Usage

Ask Claude to help you work with Refresh Token resources:

### Create Refresh Token

> "Create a refresh-token named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl ai_data refresh-token create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl ai_data refresh-token create {name} --namespace {namespace}
```

Create refresh-token

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl generative_ai create refresh_token -n <namespace> -i refresh_token.yaml

# Get
f5xcctl generative_ai get refresh_token <name> -n <namespace>

# List
f5xcctl generative_ai list refresh_token -n <namespace>

# Delete
f5xcctl generative_ai delete refresh_token <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_refresh_token" "example" {
  name      = "example-refresh-token"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
