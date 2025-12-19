---
page_title: f5xc_securemesh_site_v2 - f5xc-api-mcp
subcategory: Sites
description: Create Secure Mesh site
---

# Securemesh Site V2

List the set of securemesh_site_v2 in a namespace

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-securemesh-site-v2-create` | Create Secure Mesh site |
| `f5xc-api-core-securemesh-site-v2-get` | Get Secure Mesh site |
| `f5xc-api-core-securemesh-site-v2-list` | List Configure Secure Mesh Site |
| `f5xc-api-core-securemesh-site-v2-update` | Replace Secure Mesh site |
| `f5xc-api-core-securemesh-site-v2-delete` | Delete Configure Secure Mesh Site |

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
f5xcctl apply -f securemesh_site_v2.yaml

# Get
f5xcctl get securemesh_site_v2 {name} -n {namespace}

# List
f5xcctl get securemesh_site_v2s -n {namespace}

# Delete
f5xcctl delete securemesh_site_v2 {name} -n {namespace}
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
