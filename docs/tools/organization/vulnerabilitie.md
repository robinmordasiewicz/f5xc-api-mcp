---
page_title: f5xc_vulnerabilitie - f5xc-api-mcp
subcategory: Organization
description: Get Vulnerabilities for Virtual Host
---

# Vulnerabilitie

Get vulnerabilities for the given Virtual Host

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-vulnerabilitie-create` | Get Vulnerabilities for Virtual Host |

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
f5xcctl apply -f vulnerabilitie.yaml

# Get
f5xcctl get vulnerabilitie {name} -n {namespace}

# List
f5xcctl get vulnerabilities -n {namespace}

# Delete
f5xcctl delete vulnerabilitie {name} -n {namespace}
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
