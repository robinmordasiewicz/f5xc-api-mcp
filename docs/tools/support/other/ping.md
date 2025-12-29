---
page_title: f5xc_ping - f5xc-api-mcp
subcategory: Support
description: Ping
---

# Ping

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Run ping to a destination.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-support-ping-create` | Ping |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |
| `site` | Site Name | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- ping

## Example Usage

Ask Claude to help you work with Ping resources:

### Create Ping

> "Create a ping named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl operate ping create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl operate ping create {name} --namespace {namespace}
```

Create ping

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl support create ping -n <namespace> -i ping.yaml

# Get
f5xcctl support get ping <name> -n <namespace>

# List
f5xcctl support list ping -n <namespace>

# Delete
f5xcctl support delete ping <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_ping" "example" {
  name      = "example-ping"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
