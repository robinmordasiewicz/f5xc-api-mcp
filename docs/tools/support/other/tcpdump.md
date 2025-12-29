---
page_title: f5xc_tcpdump - f5xc-api-mcp
subcategory: Support
description: Tcpdump
---

# Tcpdump

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Run tcpdump on an interface in a ver node.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-support-tcpdump-create` | Tcpdump |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |
| `site` | Site Name | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- tcpdump

## Example Usage

Ask Claude to help you work with Tcpdump resources:

### Create Tcpdump

> "Create a tcpdump named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl operate tcpdump create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl operate tcpdump create {name} --namespace {namespace}
```

Create tcpdump

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl support create tcpdump -n <namespace> -i tcpdump.yaml

# Get
f5xcctl support get tcpdump <name> -n <namespace>

# List
f5xcctl support list tcpdump -n <namespace>

# Delete
f5xcctl support delete tcpdump <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_tcpdump" "example" {
  name      = "example-tcpdump"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
