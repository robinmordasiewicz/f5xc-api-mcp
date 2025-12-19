---
page_title: f5xc_clone_from_dns_domain - f5xc-api-mcp
subcategory: DNS
description: Clone from DNSDomain
---

# Clone From DNS Domain

cloning dns domain to DNSZone.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-dns-clone-from-dns-domain-create` | Clone from DNSDomain |

## Example Usage

Ask Claude to help you work with Clone From DNS Domain resources:

### Create Clone From DNS Domain

> "Create a clone-from-dns-domain named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create clone_from_dns_domain -n <namespace> -i clone_from_dns_domain.yaml

# Get
f5xcctl configuration get clone_from_dns_domain -n <namespace> <name>

# List
f5xcctl configuration list clone_from_dns_domain -n <namespace>

# Delete
f5xcctl configuration delete clone_from_dns_domain -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_clone_from_dns_domain" "example" {
  name      = "example-clone-from-dns-domain"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
