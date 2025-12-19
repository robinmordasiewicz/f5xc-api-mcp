---
page_title: f5xc_proxy - f5xc-api-mcp
subcategory: Networking
description: Create Proxy
---

# Proxy

Shape of the TCP loadbalancer replace specification

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-proxy-create` | Create Proxy |
| `f5xc-api-core-proxy-get` | Get Proxy |
| `f5xc-api-core-proxy-list` | List Proxy |
| `f5xc-api-core-proxy-update` | Replace Proxy |
| `f5xc-api-core-proxy-delete` | Delete Proxy |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `metadata.namespace` | namespace |
| `name` | name |
| `namespace` | namespace |
| `metadata.name` | name |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | The label_filter parameter |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with Proxy resources:

### Create Proxy

> "Create a proxy named 'example' in the 'production' namespace"

### List Proxys

> "List all proxys in the 'production' namespace"

### Get Proxy Details

> "Get details of the proxy named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create proxy -n <namespace> -i proxy.yaml

# Get
f5xcctl configuration get proxy -n <namespace> <name>

# List
f5xcctl configuration list proxy -n <namespace>

# Delete
f5xcctl configuration delete proxy -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_proxy" "example" {
  name      = "example-proxy"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
