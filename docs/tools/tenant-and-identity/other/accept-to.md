---
page_title: f5xc_accept_to - f5xc-api-mcp
subcategory: Tenant And Identity
description: Accept TOS.
---

# Accept To

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Accept TOS updates version of accepted terms of service.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-accept-to-create` | Accept TOS. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- accept-to

## Example Usage

Ask Claude to help you work with Accept To resources:

### Create Accept To

> "Create a accept-to named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl web accept-to create {name} --namespace {namespace}
```

Create accept-to

### file_based

```bash
f5xcctl web accept-to create -f {file}.yaml
```

Create from YAML file

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl tenant_and_identity create accept_to -n <namespace> -i accept_to.yaml

# Get
f5xcctl tenant_and_identity get accept_to <name> -n <namespace>

# List
f5xcctl tenant_and_identity list accept_to -n <namespace>

# Delete
f5xcctl tenant_and_identity delete accept_to <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_accept_to" "example" {
  name      = "example-accept-to"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
