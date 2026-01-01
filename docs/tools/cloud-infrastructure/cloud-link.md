---
page_title: f5xc_cloud_link - f5xc-api-mcp
subcategory: Cloud Infrastructure
description: Create CloudLink.
---

# Cloud Link

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replaces configured CloudLink with new set of parameters.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cloudinfrastructure-cloud-link-create` | Create CloudLink. |
| `f5xc-api-cloudinfrastructure-cloud-link-get` | GET CloudLink. |
| `f5xc-api-cloudinfrastructure-cloud-link-list` | List CloudLink. |
| `f5xc-api-cloudinfrastructure-cloud-link-update` | Replace CloudLink. |
| `f5xc-api-cloudinfrastructure-cloud-link-delete` | DELETE CloudLink. |

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

- cloud-link

**Modifies:**

- cloud-link

**Deletes:**

- cloud-link
- contained_resources

## Example Usage

Ask Claude to help you work with Cloud Link resources:

### Create Cloud Link

> "Create a cloud-link named 'example' in the 'production' namespace"

### List Cloud Links

> "List all cloud-links in the 'production' namespace"

### Get Cloud Link Details

> "Get details of the cloud-link named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh cloud_infrastructure create cloud_link -n <namespace> -i cloud_link.yaml

# Get
xcsh cloud_infrastructure get cloud_link <name> -n <namespace>

# List
xcsh cloud_infrastructure list cloud_link -n <namespace>

# Delete
xcsh cloud_infrastructure delete cloud_link <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_cloud_link" "example" {
  name      = "example-cloud-link"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
