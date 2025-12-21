---
page_title: f5xc_get_security_config - f5xc-api-mcp
subcategory: BIG-IP Integration
description: GET Security Config for BIG-IP Load Balancer.
---

# Get Security Config

Fetch the corresponding Security Config for the given BIG-IP load balancers.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-bigip-get-security-config-create` | GET Security Config for BIG-IP Load Balancer. |

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
f5xcctl bigip create get_security_config -n <namespace> -i get_security_config.yaml

# Get
f5xcctl bigip get get_security_config <name> -n <namespace>

# List
f5xcctl bigip list get_security_config -n <namespace>

# Delete
f5xcctl bigip delete get_security_config <name> -n <namespace>
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
