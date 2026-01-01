---
page_title: f5xc_software_os_version - f5xc-api-mcp
subcategory: Service Mesh
description: GET OS based on SW_VERSION.
---

# Software Os Version

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

API to GET OS IMAGE based on the software version.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-servicemesh-software-os-version-create` | GET OS based on SW_VERSION. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- software-os-version

## Example Usage

Ask Claude to help you work with Software Os Version resources:

### Create Software Os Version

> "Create a software-os-version named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh service_mesh create software_os_version -n <namespace> -i software_os_version.yaml

# Get
xcsh service_mesh get software_os_version <name> -n <namespace>

# List
xcsh service_mesh list software_os_version -n <namespace>

# Delete
xcsh service_mesh delete software_os_version <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_software_os_version" "example" {
  name      = "example-software-os-version"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
