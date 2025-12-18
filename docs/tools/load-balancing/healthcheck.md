---
page_title: f5xc_healthcheck - f5xc-api-mcp
subcategory: Load Balancing
description: Create Health Check
---

# Healthcheck

Healthcheck object defines method to determine if the given Endpoint is healthy.
Single Healthcheck
object can be referred to by one or many Cluster objects.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-healthcheck-create` | Create Health Check |
| `f5xc-api-core-healthcheck-get` | Get Health Check |
| `f5xc-api-core-healthcheck-list` | List Health Check |
| `f5xc-api-core-healthcheck-update` | Replace Health Check |
| `f5xc-api-core-healthcheck-delete` | Delete Health Check |

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

Ask Claude to help you work with Healthcheck resources:

### Create Healthcheck

> "Create a healthcheck named 'example' in the 'production' namespace"

### List Healthchecks

> "List all healthchecks in the 'production' namespace"

### Get Healthcheck Details

> "Get details of the healthcheck named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f healthcheck.yaml

# Get
f5xcctl get healthcheck {name} -n {namespace}

# List
f5xcctl get healthchecks -n {namespace}

# Delete
f5xcctl delete healthcheck {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_healthcheck" "example" {
  name      = "example-healthcheck"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
