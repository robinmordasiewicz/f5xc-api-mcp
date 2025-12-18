---
page_title: f5xc_edge_credential - f5xc-api-mcp
subcategory: Organization
description: Cloud Credential
---

# Edge Credential

Returns the cloud credential for the matching edge type

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-edge-credential-create` | Cloud Credential |

## Example Usage

Ask Claude to help you work with Edge Credential resources:

### Create Edge Credential

> "Create a edge-credential named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f edge_credential.yaml

# Get
f5xcctl get edge_credential {name} -n {namespace}

# List
f5xcctl get edge_credentials -n {namespace}

# Delete
f5xcctl delete edge_credential {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_edge_credential" "example" {
  name      = "example-edge-credential"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
