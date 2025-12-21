---
page_title: f5xc_discovery - f5xc-api-mcp
subcategory: Service Mesh
description: Create Discovery.
---

# Discovery

API to replace discovery object for a site or virtual site in system namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-servicemesh-discovery-create` | Create Discovery. |
| `f5xc-api-servicemesh-discovery-get` | GET Discovery. |
| `f5xc-api-servicemesh-discovery-list` | List Discovery. |
| `f5xc-api-servicemesh-discovery-update` | Replace Discovery. |
| `f5xc-api-servicemesh-discovery-delete` | DELETE Discovery. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `metadata.namespace` | Namespace |
| `name` | Name |
| `namespace` | Namespace |
| `metadata.name` | Name |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with Discovery resources:

### Create Discovery

> "Create a discovery named 'example' in the 'production' namespace"

### List Discoverys

> "List all discoverys in the 'production' namespace"

### Get Discovery Details

> "Get details of the discovery named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl service_mesh create discovery -n <namespace> -i discovery.yaml

# Get
f5xcctl service_mesh get discovery <name> -n <namespace>

# List
f5xcctl service_mesh list discovery -n <namespace>

# Delete
f5xcctl service_mesh delete discovery <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_discovery" "example" {
  name      = "example-discovery"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
