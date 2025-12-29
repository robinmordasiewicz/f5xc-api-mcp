---
page_title: f5xc_resync_crl - f5xc-api-mcp
subcategory: Support
description: Resync CRL.
---

# Resync Crl

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Resync CRL by downloading from the server again.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-support-resync-crl-create` | Resync CRL. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |
| `site` | Site Name | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- resync-crl

## Example Usage

Ask Claude to help you work with Resync Crl resources:

### Create Resync Crl

> "Create a resync-crl named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl operate resync-crl create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl operate resync-crl create {name} --namespace {namespace}
```

Create resync-crl

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl support create resync_crl -n <namespace> -i resync_crl.yaml

# Get
f5xcctl support get resync_crl <name> -n <namespace>

# List
f5xcctl support list resync_crl -n <namespace>

# Delete
f5xcctl support delete resync_crl <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_resync_crl" "example" {
  name      = "example-resync-crl"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
