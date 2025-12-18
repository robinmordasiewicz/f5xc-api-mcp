---
page_title: f5xc_application - f5xc-api-mcp
subcategory: Applications
description: Update Application
---

# Application

Update an application's information

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-application-create` | Update Application |
| `f5xc-api-core-application-list` | GetApplications |
| `f5xc-api-core-application-delete` | Delete Application |

## Parameters

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `app_id` | The app_id parameter |

## Example Usage

Ask Claude to help you work with Application resources:

### Create Application

> "Create a application named 'example' in the 'production' namespace"

### List Applications

> "List all applications in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f application.yaml

# Get
f5xcctl get application {name} -n {namespace}

# List
f5xcctl get applications -n {namespace}

# Delete
f5xcctl delete application {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_application" "example" {
  name      = "example-application"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
