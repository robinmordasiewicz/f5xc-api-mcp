---
page_title: f5xc_workload - f5xc-api-mcp
subcategory: Kubernetes
description: Create Workload
---

# Workload

List the set of workload in a namespace

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-appstack-workload-create` | Create Workload |
| `f5xc-api-appstack-workload-get` | Get Workload |
| `f5xc-api-appstack-workload-list` | List Workload |
| `f5xc-api-appstack-workload-update` | Replace Workload |
| `f5xc-api-appstack-workload-delete` | Delete Workload |

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

Ask Claude to help you work with Workload resources:

### Create Workload

> "Create a workload named 'example' in the 'production' namespace"

### List Workloads

> "List all workloads in the 'production' namespace"

### Get Workload Details

> "Get details of the workload named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f workload.yaml

# Get
f5xcctl get workload {name} -n {namespace}

# List
f5xcctl get workloads -n {namespace}

# Delete
f5xcctl delete workload {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_workload" "example" {
  name      = "example-workload"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
