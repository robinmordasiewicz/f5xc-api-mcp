---
page_title: f5xc_clone_from_dns_domain - f5xc-api-mcp
subcategory: DNS
description: Clone from DNSDomain.
---

# Clone From DNS Domain

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Cloning DNS domain to DNSZone.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-dns-clone-from-dns-domain-create` | Clone from DNSDomain. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- clone-from-dns-domain

## Example Usage

Ask Claude to help you work with Clone From DNS Domain resources:

### Create Clone From DNS Domain

> "Create a clone-from-dns-domain named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh dns create clone_from_dns_domain -n <namespace> -i clone_from_dns_domain.yaml

# Get
xcsh dns get clone_from_dns_domain <name> -n <namespace>

# List
xcsh dns list clone_from_dns_domain -n <namespace>

# Delete
xcsh dns delete clone_from_dns_domain <name> -n <namespace>
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
