---
page_title: f5xc_stop_tcpdump - f5xc-api-mcp
subcategory: Support
description: Stop Tcpdump.
---

# Stop Tcpdump

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Stop tcpdump running on an interface in a ver node.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-support-stop-tcpdump-create` | Stop Tcpdump. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |
| `site` | Site Name | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- stop-tcpdump

## Example Usage

Ask Claude to help you work with Stop Tcpdump resources:

### Create Stop Tcpdump

> "Create a stop-tcpdump named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl operate stop-tcpdump create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl operate stop-tcpdump create {name} --namespace {namespace}
```

Create stop-tcpdump

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl support create stop_tcpdump -n <namespace> -i stop_tcpdump.yaml

# Get
f5xcctl support get stop_tcpdump <name> -n <namespace>

# List
f5xcctl support list stop_tcpdump -n <namespace>

# Delete
f5xcctl support delete stop_tcpdump <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_stop_tcpdump" "example" {
  name      = "example-stop-tcpdump"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
