---
page_title: f5xc_protocol_inspection - f5xc-api-mcp
subcategory: Security
description: Create Protocol Inspection
---

# Protocol Inspection

Create Protocol Inspection Specification in a given namespace. If one already exists it will give an
error.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-protocol-inspection-create` | Create Protocol Inspection |
| `f5xc-api-core-protocol-inspection-get` | Get Protocol Inspection  |
| `f5xc-api-core-protocol-inspection-list` | List Configure Protocol Inspection |
| `f5xc-api-core-protocol-inspection-update` | Replace Protocol Inspection  |
| `f5xc-api-core-protocol-inspection-delete` | Delete Configure Protocol Inspection |

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

Ask Claude to help you work with Protocol Inspection resources:

### Create Protocol Inspection

> "Create a protocol-inspection named 'example' in the 'production' namespace"

### List Protocol Inspections

> "List all protocol-inspections in the 'production' namespace"

### Get Protocol Inspection Details

> "Get details of the protocol-inspection named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f protocol_inspection.yaml

# Get
f5xcctl get protocol_inspection {name} -n {namespace}

# List
f5xcctl get protocol_inspections -n {namespace}

# Delete
f5xcctl delete protocol_inspection {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_protocol_inspection" "example" {
  name      = "example-protocol-inspection"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
