---
page_title: f5xc_vulnerabilitie - f5xc-api-mcp
subcategory: Networking
description: GET Vulnerabilities for Virtual Host.
---

# Vulnerabilitie

GET vulnerabilities for the given Virtual Host.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networking-vulnerabilitie-create` | GET Vulnerabilities for Virtual Host. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Virtual Host Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Vulnerabilitie resources:

### Create Vulnerabilitie

> "Create a vulnerabilitie named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl networking create vulnerabilitie -n <namespace> -i vulnerabilitie.yaml

# Get
f5xcctl networking get vulnerabilitie <name> -n <namespace>

# List
f5xcctl networking list vulnerabilitie -n <namespace>

# Delete
f5xcctl networking delete vulnerabilitie <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_vulnerabilitie" "example" {
  name      = "example-vulnerabilitie"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
