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

## xcsh Equivalent

```bash
# Create/Update
xcsh support create tcpdump -n <namespace> -i tcpdump.yaml

# Get
xcsh support get tcpdump <name> -n <namespace>

# List
xcsh support list tcpdump -n <namespace>

# Delete
xcsh support delete tcpdump <name> -n <namespace>
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
