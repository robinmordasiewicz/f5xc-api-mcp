---
page_title: f5xc_host_ping - f5xc-api-mcp
subcategory: Support
description: Host Ping
---

# Host Ping

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Ping intiated from host kernel.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-support-host-ping-create` | Host Ping |

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

- host-ping

## Example Usage

Ask Claude to help you work with Host Ping resources:

### Create Host Ping

> "Create a host-ping named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl operate host-ping create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl operate host-ping create {name} --namespace {namespace}
```

Create host-ping

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl support create host_ping -n <namespace> -i host_ping.yaml

# Get
f5xcctl support get host_ping <name> -n <namespace>

# List
f5xcctl support list host_ping -n <namespace>

# Delete
f5xcctl support delete host_ping <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_host_ping" "example" {
  name      = "example-host-ping"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
