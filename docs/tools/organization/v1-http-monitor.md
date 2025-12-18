---
page_title: f5xc_v1_http_monitor - f5xc-api-mcp
subcategory: Organization
description: Create HTTP Monitor
---

# V1 HTTP Monitor

List the set of v1_http_monitor in a namespace

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-v1-http-monitor-create` | Create HTTP Monitor |
| `f5xc-api-core-v1-http-monitor-get` | Get HTTP Monitor |
| `f5xc-api-core-v1-http-monitor-list` | List HTTP Monitor |
| `f5xc-api-core-v1-http-monitor-update` | Update HTTP Monitor |
| `f5xc-api-core-v1-http-monitor-delete` | Delete HTTP Monitor |

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

Ask Claude to help you work with V1 HTTP Monitor resources:

### Create V1 HTTP Monitor

> "Create a v1-http-monitor named 'example' in the 'production' namespace"

### List V1 HTTP Monitors

> "List all v1-http-monitors in the 'production' namespace"

### Get V1 HTTP Monitor Details

> "Get details of the v1-http-monitor named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f v1_http_monitor.yaml

# Get
f5xcctl get v1_http_monitor {name} -n {namespace}

# List
f5xcctl get v1_http_monitors -n {namespace}

# Delete
f5xcctl delete v1_http_monitor {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_v1_http_monitor" "example" {
  name      = "example-v1-http-monitor"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
