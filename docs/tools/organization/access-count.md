---
page_title: f5xc_access_count - f5xc-api-mcp
subcategory: Organization
description: VoltShare Access Count Query
---

# Access Count

Request to get number of VoltShare API calls aggregated across multiple dimensions like OPERATION,
COUNTRY, RESULT, USER_TENANT

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-access-count-create` | VoltShare Access Count Query |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Access Count resources:

### Create Access Count

> "Create a access-count named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f access_count.yaml

# Get
f5xcctl get access_count {name} -n {namespace}

# List
f5xcctl get access_counts -n {namespace}

# Delete
f5xcctl delete access_count {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_access_count" "example" {
  name      = "example-access-count"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
