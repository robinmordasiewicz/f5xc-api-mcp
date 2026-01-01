---
page_title: f5xc_list_tcpdump - f5xc-api-mcp
subcategory: Support
description: List Tcpdump.
---

# List Tcpdump

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

List tcpdump capture status on a ver node.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-support-list-tcpdump-create` | List Tcpdump. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |
| `site` | Site Name | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- list-tcpdump

## Example Usage

Ask Claude to help you work with List Tcpdump resources:

### Create List Tcpdump

> "Create a list-tcpdump named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh support create list_tcpdump -n <namespace> -i list_tcpdump.yaml

# Get
xcsh support get list_tcpdump <name> -n <namespace>

# List
xcsh support list list_tcpdump -n <namespace>

# Delete
xcsh support delete list_tcpdump <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_list_tcpdump" "example" {
  name      = "example-list-tcpdump"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
