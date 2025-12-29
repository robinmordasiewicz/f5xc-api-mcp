---
page_title: f5xc_history - f5xc-api-mcp
subcategory: Observability
description: GET Alerts History.
---

# History

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET the history of alert notifications sent to the end-user between the start_time and end_time that
matches the
filter specified in the request.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-history-list` | GET Alerts History. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Ns1` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `end_time` | Fetch alerts whose timestamp <= end_time | `2019-09-24T12:30:11.733Z.` |
| `filter` | HighDiskUsage\", severity=\"critical\"}" | `{alertname=\.` |
| `start_time` | Fetch alerts whose timestamp >= start_time | `2019-09-23T12:30:11.733Z.` |

## Example Usage

Ask Claude to help you work with History resources:

### List Historys

> "List all historys in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### list_all

```bash
f5xcctl data history list --namespace {namespace}
```

List all historys

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl observability create history -n <namespace> -i history.yaml

# Get
f5xcctl observability get history <name> -n <namespace>

# List
f5xcctl observability list history -n <namespace>

# Delete
f5xcctl observability delete history <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_history" "example" {
  name      = "example-history"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
