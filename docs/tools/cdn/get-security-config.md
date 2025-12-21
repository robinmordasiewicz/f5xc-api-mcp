---
page_title: f5xc_get_security_config - f5xc-api-mcp
subcategory: CDN
description: GET Security Config for CDN Load Balancer.
---

# Get Security Config

Fetch the corresponding Security Config for the given CDN load balancers.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cdn-get-security-config-create` | GET Security Config for CDN Load Balancer. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Get Security Config resources:

### Create Get Security Config

> "Create a get-security-config named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create get_security_config -n <namespace> -i get_security_config.yaml

# Get
f5xcctl configuration get get_security_config -n <namespace> <name>

# List
f5xcctl configuration list get_security_config -n <namespace>

# Delete
f5xcctl configuration delete get_security_config -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_get_security_config" "example" {
  name      = "example-get-security-config"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
