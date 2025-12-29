---
page_title: f5xc_get_registrations_by_token - f5xc-api-mcp
subcategory: Ce Management
description: GET Registration UID by Site Token.
---

# Get Registrations By Token

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Returns list of registration uids that are using particular site token.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cemanagement-get-registrations-by-token-create` | GET Registration UID by Site Token. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- get-registrations-by-token

## Example Usage

Ask Claude to help you work with Get Registrations By Token resources:

### Create Get Registrations By Token

> "Create a get-registrations-by-token named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl register get-registrations-by-token create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl register get-registrations-by-token create {name} --namespace {namespace}
```

Create get-registrations-by-token

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl ce_management create get_registrations_by_token -n <namespace> -i get_registrations_by_token.yaml

# Get
f5xcctl ce_management get get_registrations_by_token <name> -n <namespace>

# List
f5xcctl ce_management list get_registrations_by_token -n <namespace>

# Delete
f5xcctl ce_management delete get_registrations_by_token <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_get_registrations_by_token" "example" {
  name      = "example-get-registrations-by-token"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
