---
page_title: f5xc_securemesh_site - f5xc-api-mcp
subcategory: Sites
description: Create Secure Mesh site.
---

# Securemesh Site

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

List the set of securemesh_site in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-securemesh-site-create` | Create Secure Mesh site. |
| `f5xc-api-sites-securemesh-site-get` | GET Secure Mesh site. |
| `f5xc-api-sites-securemesh-site-list` | List Configure Secure Mesh Site. |
| `f5xc-api-sites-securemesh-site-update` | Replace Secure Mesh site. |
| `f5xc-api-sites-securemesh-site-delete` | DELETE Configure Secure Mesh Site. |

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

- securemesh-site

**Modifies:**

- securemesh-site

**Deletes:**

- securemesh-site
- contained_resources

## Example Usage

Ask Claude to help you work with Securemesh Site resources:

### Create Securemesh Site

> "Create a securemesh-site named 'example' in the 'production' namespace"

### List Securemesh Sites

> "List all securemesh-sites in the 'production' namespace"

### Get Securemesh Site Details

> "Get details of the securemesh-site named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh sites create securemesh_site -n <namespace> -i securemesh_site.yaml

# Get
xcsh sites get securemesh_site <name> -n <namespace>

# List
xcsh sites list securemesh_site -n <namespace>

# Delete
xcsh sites delete securemesh_site <name> -n <namespace>
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
