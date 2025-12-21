---
page_title: f5xc_securemesh_site_v2 - f5xc-api-mcp
subcategory: Infrastructure
description: Create Secure Mesh site.
---

# Securemesh Site V2

List the set of securemesh_site_v2 in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-infrastructure-securemesh-site-v2-create` | Create Secure Mesh site. |
| `f5xc-api-infrastructure-securemesh-site-v2-get` | GET Secure Mesh site. |
| `f5xc-api-infrastructure-securemesh-site-v2-list` | List Configure Secure Mesh Site. |
| `f5xc-api-infrastructure-securemesh-site-v2-update` | Replace Secure Mesh site. |
| `f5xc-api-infrastructure-securemesh-site-v2-delete` | DELETE Configure Secure Mesh Site. |

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

Ask Claude to help you work with Securemesh Site V2 resources:

### Create Securemesh Site V2

> "Create a securemesh-site-v2 named 'example' in the 'production' namespace"

### List Securemesh Site V2s

> "List all securemesh-site-v2s in the 'production' namespace"

### Get Securemesh Site V2 Details

> "Get details of the securemesh-site-v2 named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl infrastructure create securemesh_site_v2 -n <namespace> -i securemesh_site_v2.yaml

# Get
f5xcctl infrastructure get securemesh_site_v2 <name> -n <namespace>

# List
f5xcctl infrastructure list securemesh_site_v2 -n <namespace>

# Delete
f5xcctl infrastructure delete securemesh_site_v2 <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_securemesh_site_v2" "example" {
  name      = "example-securemesh-site-v2"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
