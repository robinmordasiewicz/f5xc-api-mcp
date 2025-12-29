---
page_title: f5xc_health_statu - f5xc-api-mcp
subcategory: DNS
description: DNS Load Balancer Health Status.
---

# Health Statu

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET Health Status of all DNS Load Balancers in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-dns-health-statu-get` | DNS Load Balancer Health Status. |
| `f5xc-api-dns-health-statu-list` | DNS Load Balancer Health Status List. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Dns_lb1` |
| `namespace` | Namespace | `Ns1` |

## Example Usage

Ask Claude to help you work with Health Statu resources:

### List Health Status

> "List all health-status in the 'production' namespace"

### Get Health Statu Details

> "Get details of the health-statu named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### get_specific

```bash
f5xcctl data health-statu get {name} --namespace {namespace}
```

Get specific health-statu

### list_all

```bash
f5xcctl data health-statu list --namespace {namespace}
```

List all health-status

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl dns create health_statu -n <namespace> -i health_statu.yaml

# Get
f5xcctl dns get health_statu <name> -n <namespace>

# List
f5xcctl dns list health_statu -n <namespace>

# Delete
f5xcctl dns delete health_statu <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_health_statu" "example" {
  name      = "example-health-statu"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
