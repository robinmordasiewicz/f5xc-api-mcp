---
page_title: f5xc_endpoint - f5xc-api-mcp
subcategory: Service Mesh
description: Create Endpoint.
---

# Endpoint

Replacing an endpoint object will update the object by replacing the existing spec with the provided
one.
For read-then-write operations a resourceVersion mismatch will occur if the object was modified
between the read and write.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-servicemesh-endpoint-create` | Create Endpoint. |
| `f5xc-api-servicemesh-endpoint-get` | GET Endpoint. |
| `f5xc-api-servicemesh-endpoint-list` | List Endpoint. |
| `f5xc-api-servicemesh-endpoint-update` | Replace Endpoint. |
| `f5xc-api-servicemesh-endpoint-delete` | DELETE Endpoint. |

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

Ask Claude to help you work with Endpoint resources:

### Create Endpoint

> "Create a endpoint named 'example' in the 'production' namespace"

### List Endpoints

> "List all endpoints in the 'production' namespace"

### Get Endpoint Details

> "Get details of the endpoint named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl service_mesh create endpoint -n <namespace> -i endpoint.yaml

# Get
f5xcctl service_mesh get endpoint <name> -n <namespace>

# List
f5xcctl service_mesh list endpoint -n <namespace>

# Delete
f5xcctl service_mesh delete endpoint <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_endpoint" "example" {
  name      = "example-endpoint"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
