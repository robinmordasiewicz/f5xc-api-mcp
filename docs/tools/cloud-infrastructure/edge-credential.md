---
page_title: f5xc_edge_credential - f5xc-api-mcp
subcategory: Cloud Infrastructure
description: Cloud Credential.
---

# Edge Credential

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Returns the cloud credential for the matching edge type.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cloudinfrastructure-edge-credential-create` | Cloud Credential. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- edge-credential

## Example Usage

Ask Claude to help you work with Edge Credential resources:

### Create Edge Credential

> "Create a edge-credential named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl config edge-credential create {name} --namespace {namespace}
```

Create edge-credential

### file_based

```bash
f5xcctl config edge-credential create -f {file}.yaml
```

Create from YAML file

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl cloud_infrastructure create edge_credential -n <namespace> -i edge_credential.yaml

# Get
f5xcctl cloud_infrastructure get edge_credential <name> -n <namespace>

# List
f5xcctl cloud_infrastructure list edge_credential -n <namespace>

# Delete
f5xcctl cloud_infrastructure delete edge_credential <name> -n <namespace>
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
