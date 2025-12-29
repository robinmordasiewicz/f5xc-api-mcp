---
page_title: f5xc_exec - f5xc-api-mcp
subcategory: Support
description: Exec
---

# Exec

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Run supported exec command on node.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-support-exec-create` | Exec |

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

- exec

## Example Usage

Ask Claude to help you work with Exec resources:

### Create Exec

> "Create a exec named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl operate exec create {name} --namespace {namespace}
```

Create exec

### file_based

```bash
f5xcctl operate exec create -f {file}.yaml
```

Create from YAML file

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl support create exec -n <namespace> -i exec.yaml

# Get
f5xcctl support get exec <name> -n <namespace>

# List
f5xcctl support list exec -n <namespace>

# Delete
f5xcctl support delete exec <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_exec" "example" {
  name      = "example-exec"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
