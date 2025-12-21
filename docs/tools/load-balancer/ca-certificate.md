---
page_title: f5xc_ca_certificate - f5xc-api-mcp
subcategory: Load Balancing
description: GET proxy Server CA Certificate.
---

# Ca Certificate

GetProxyServerCACert returns PEM encoded proxy server CA certificate.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-loadbalancer-ca-certificate-get` | GET proxy Server CA Certificate. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Ca Certificate resources:

### Get Ca Certificate Details

> "Get details of the ca-certificate named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create ca_certificate -n <namespace> -i ca_certificate.yaml

# Get
f5xcctl configuration get ca_certificate -n <namespace> <name>

# List
f5xcctl configuration list ca_certificate -n <namespace>

# Delete
f5xcctl configuration delete ca_certificate -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_ca_certificate" "example" {
  name      = "example-ca-certificate"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
