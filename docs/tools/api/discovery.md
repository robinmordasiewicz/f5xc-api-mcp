---
page_title: f5xc_discovery - f5xc-api-mcp
subcategory: API
description: Create Discovery.
---

# Discovery

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

API to replace discovery object for a site or virtual site in system namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-api-discovery-create` | Create Discovery. |
| `f5xc-api-api-discovery-get` | GET Discovery. |
| `f5xc-api-api-discovery-list` | List Discovery. |
| `f5xc-api-api-discovery-update` | Replace Discovery. |
| `f5xc-api-api-discovery-delete` | DELETE Discovery. |

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

- discovery

**Modifies:**

- discovery

**Deletes:**

- discovery
- contained_resources

## Example Usage

Ask Claude to help you work with Discovery resources:

### Create Discovery

> "Create a discovery named 'example' in the 'production' namespace"

### List Discoverys

> "List all discoverys in the 'production' namespace"

### Get Discovery Details

> "Get details of the discovery named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh api create discovery -n <namespace> -i discovery.yaml

# Get
xcsh api get discovery <name> -n <namespace>

# List
xcsh api list discovery -n <namespace>

# Delete
xcsh api delete discovery <name> -n <namespace>
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
