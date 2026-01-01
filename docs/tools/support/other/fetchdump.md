---
page_title: f5xc_fetchdump - f5xc-api-mcp
subcategory: Support
description: FetchDump
---

# Fetchdump

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Fetch the captured pcap data from an earlier Tcpdump request.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-support-fetchdump-create` | FetchDump |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |
| `site` | Site Name | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- fetchdump

## Example Usage

Ask Claude to help you work with Fetchdump resources:

### Create Fetchdump

> "Create a fetchdump named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh support create fetchdump -n <namespace> -i fetchdump.yaml

# Get
xcsh support get fetchdump <name> -n <namespace>

# List
xcsh support list fetchdump -n <namespace>

# Delete
xcsh support delete fetchdump <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_fetchdump" "example" {
  name      = "example-fetchdump"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
