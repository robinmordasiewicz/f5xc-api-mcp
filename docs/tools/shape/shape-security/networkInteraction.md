---
page_title: f5xc_networkInteraction - f5xc-api-mcp
subcategory: Shape
description: List Network Interactions By Script.
---

# NetworkInteraction

!!! info "Low Risk"
    Operations on this resource are generally safe.

List all the network interactions for a script depending on start time and end time.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-networkinteraction-get` | List Network Interactions By Script. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `id` | ID | `S-1234567` |
| `namespace` | Namespace | `Default` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `end_time` | X-required | `1570194300.` |
| `start_time` | X-required | `1570194000.` |

## Example Usage

Ask Claude to help you work with NetworkInteraction resources:

### Get NetworkInteraction Details

> "Get details of the networkInteraction named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create networkInteraction -n <namespace> -i networkInteraction.yaml

# Get
xcsh shape get networkInteraction <name> -n <namespace>

# List
xcsh shape list networkInteraction -n <namespace>

# Delete
xcsh shape delete networkInteraction <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_networkInteraction" "example" {
  name      = "example-networkInteraction"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
