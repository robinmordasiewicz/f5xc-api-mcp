---
page_title: f5xc_traceroute - f5xc-api-mcp
subcategory: Network
description: Traceroute.
---

# Traceroute

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Run traceroute to a destination.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-network-traceroute-create` | Traceroute. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |
| `site` | Site Name | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- traceroute

## Example Usage

Ask Claude to help you work with Traceroute resources:

### Create Traceroute

> "Create a traceroute named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl operate traceroute create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl operate traceroute create {name} --namespace {namespace}
```

Create traceroute

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl network create traceroute -n <namespace> -i traceroute.yaml

# Get
f5xcctl network get traceroute <name> -n <namespace>

# List
f5xcctl network list traceroute -n <namespace>

# Delete
f5xcctl network delete traceroute <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_traceroute" "example" {
  name      = "example-traceroute"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
