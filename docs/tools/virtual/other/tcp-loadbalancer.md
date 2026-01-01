---
page_title: f5xc_tcp_loadbalancer - f5xc-api-mcp
subcategory: Virtual
description: Create TCP Load Balancer.
---

# TCP Loadbalancer

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Shape of the TCP load balancer replace specification.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-virtual-tcp-loadbalancer-create` | Create TCP Load Balancer. |
| `f5xc-api-virtual-tcp-loadbalancer-get` | GET TCP Load Balancer. |
| `f5xc-api-virtual-tcp-loadbalancer-list` | List Configure TCP Load Balancer. |
| `f5xc-api-virtual-tcp-loadbalancer-update` | Replace TCP Load Balancer. |
| `f5xc-api-virtual-tcp-loadbalancer-delete` | DELETE Configure TCP Load Balancer. |

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

- tcp-loadbalancer

**Modifies:**

- tcp-loadbalancer

**Deletes:**

- tcp-loadbalancer
- contained_resources

## Example Usage

Ask Claude to help you work with TCP Loadbalancer resources:

### Create TCP Loadbalancer

> "Create a tcp-loadbalancer named 'example' in the 'production' namespace"

### List TCP Loadbalancers

> "List all tcp-loadbalancers in the 'production' namespace"

### Get TCP Loadbalancer Details

> "Get details of the tcp-loadbalancer named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh virtual create tcp_loadbalancer -n <namespace> -i tcp_loadbalancer.yaml

# Get
xcsh virtual get tcp_loadbalancer <name> -n <namespace>

# List
xcsh virtual list tcp_loadbalancer -n <namespace>

# Delete
xcsh virtual delete tcp_loadbalancer <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_tcp_loadbalancer" "example" {
  name      = "example-tcp-loadbalancer"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
