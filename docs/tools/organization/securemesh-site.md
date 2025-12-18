---
page_title: f5xc_securemesh_site - f5xc-api-mcp
subcategory: Organization
description: Create Secure Mesh site
---

# Securemesh Site

List the set of securemesh_site in a namespace

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-securemesh-site-create` | Create Secure Mesh site |
| `f5xc-api-core-securemesh-site-get` | Get Secure Mesh site |
| `f5xc-api-core-securemesh-site-list` | List Configure Secure Mesh Site |
| `f5xc-api-core-securemesh-site-update` | Replace Secure Mesh site |
| `f5xc-api-core-securemesh-site-delete` | Delete Configure Secure Mesh Site |

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

Ask Claude to help you work with Securemesh Site resources:

### Create Securemesh Site

> "Create a securemesh-site named 'example' in the 'production' namespace"

### List Securemesh Sites

> "List all securemesh-sites in the 'production' namespace"

### Get Securemesh Site Details

> "Get details of the securemesh-site named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f securemesh_site.yaml

# Get
f5xcctl get securemesh_site {name} -n {namespace}

# List
f5xcctl get securemesh_sites -n {namespace}

# Delete
f5xcctl delete securemesh_site {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_securemesh_site" "example" {
  name      = "example-securemesh-site"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
