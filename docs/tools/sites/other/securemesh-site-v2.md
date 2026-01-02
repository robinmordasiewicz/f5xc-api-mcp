---
page_title: f5xc_securemesh_site_v2 - f5xc-api-mcp
subcategory: Sites
description: Create Secure Mesh site.
---

# Securemesh Site V2

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

List the set of securemesh_site_v2 in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-securemesh-site-v2-create` | Create Secure Mesh site. |
| `f5xc-api-sites-securemesh-site-v2-get` | GET Secure Mesh site. |
| `f5xc-api-sites-securemesh-site-v2-list` | List Configure Secure Mesh Site. |
| `f5xc-api-sites-securemesh-site-v2-update` | Replace Secure Mesh site. |
| `f5xc-api-sites-securemesh-site-v2-delete` | DELETE Configure Secure Mesh Site. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `metadata.namespace` | Namespace | `Staging` |
| `name` | Name | `Name` |
| `namespace` | Namespace | `Ns1` |
| `metadata.name` | Name | `Example-corp-web.` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. | `Env in (staging, testing), tier in (web, db)` |
| `report_fields` | The report_fields parameter | `-` |
| `report_status_fields` | The report_status_fields parameter | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- securemesh-site-v2

**Modifies:**

- securemesh-site-v2

**Deletes:**

- securemesh-site-v2
- contained_resources

## Example Usage

Ask Claude to help you work with Securemesh Site V2 resources:

### Create Securemesh Site V2

> "Create a securemesh-site-v2 named 'example' in the 'production' namespace"

### List Securemesh Site V2s

> "List all securemesh-site-v2s in the 'production' namespace"

### Get Securemesh Site V2 Details

> "Get details of the securemesh-site-v2 named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh sites create securemesh_site_v2 -n <namespace> -i securemesh_site_v2.yaml

# Get
xcsh sites get securemesh_site_v2 <name> -n <namespace>

# List
xcsh sites list securemesh_site_v2 -n <namespace>

# Delete
xcsh sites delete securemesh_site_v2 <name> -n <namespace>
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
