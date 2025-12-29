---
page_title: f5xc_reboot - f5xc-api-mcp
subcategory: Support
description: Reboot node.
---

# Reboot

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Reboot specific node in site.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-support-reboot-create` | Reboot node. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |
| `node` | Node Name | `Master-0` |
| `site` | Site Name | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- reboot

## Example Usage

Ask Claude to help you work with Reboot resources:

### Create Reboot

> "Create a reboot named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl operate reboot create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl operate reboot create {name} --namespace {namespace}
```

Create reboot

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl support create reboot -n <namespace> -i reboot.yaml

# Get
f5xcctl support get reboot <name> -n <namespace>

# List
f5xcctl support list reboot -n <namespace>

# Delete
f5xcctl support delete reboot <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_reboot" "example" {
  name      = "example-reboot"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
