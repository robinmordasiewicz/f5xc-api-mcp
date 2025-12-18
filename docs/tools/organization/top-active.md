---
page_title: f5xc_top_active - f5xc-api-mcp
subcategory: Organization
description: Get Top APIs Endpoints for Virtual Host
---

# Top Active

Top APIs by requested activity metric. For example most-active APIs or most-attacked APIs.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-top-active-create` | Get Top APIs Endpoints for Virtual Host |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Virtual Host Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Top Active resources:

### Create Top Active

> "Create a top-active named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f top_active.yaml

# Get
f5xcctl get top_active {name} -n {namespace}

# List
f5xcctl get top_actives -n {namespace}

# Delete
f5xcctl delete top_active {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_top_active" "example" {
  name      = "example-top-active"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
