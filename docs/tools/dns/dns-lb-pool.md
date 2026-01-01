---
page_title: f5xc_dns_lb_pool - f5xc-api-mcp
subcategory: DNS
description: Create DNS Load Balancer Pool.
---

# DNS Lb Pool

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Create DNS Load Balancer Pool in a given namespace. If one already exist it will give a error.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-dns-dns-lb-pool-create` | Create DNS Load Balancer Pool. |
| `f5xc-api-dns-dns-lb-pool-get` | GET DNS Load Balancer Pool. |
| `f5xc-api-dns-dns-lb-pool-list` | List DNS Load Balancer Pool. |
| `f5xc-api-dns-dns-lb-pool-update` | Replace DNS Load Balancer Pool. |
| `f5xc-api-dns-dns-lb-pool-delete` | DELETE DNS Load Balancer Pool. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `metadata.namespace` | Namespace | `Staging` |
| `name` | Name | `Name` |
| `namespace` | Namespace | `Ns1` |
| `metadata.name` | Name | `Example-corp-web.` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. | `Env in (staging, testing), tier in (web, db)` |
| `report_fields` | The report_fields parameter | `-` |
| `report_status_fields` | The report_status_fields parameter | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- dns-lb-pool

**Modifies:**

- dns-lb-pool

**Deletes:**

- dns-lb-pool
- contained_resources

## Example Usage

Ask Claude to help you work with DNS Lb Pool resources:

### Create DNS Lb Pool

> "Create a dns-lb-pool named 'example' in the 'production' namespace"

### List DNS Lb Pools

> "List all dns-lb-pools in the 'production' namespace"

### Get DNS Lb Pool Details

> "Get details of the dns-lb-pool named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh dns create dns_lb_pool -n <namespace> -i dns_lb_pool.yaml

# Get
xcsh dns get dns_lb_pool <name> -n <namespace>

# List
xcsh dns list dns_lb_pool -n <namespace>

# Delete
xcsh dns delete dns_lb_pool <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_dns_lb_pool" "example" {
  name      = "example-dns-lb-pool"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
