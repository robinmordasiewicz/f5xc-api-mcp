---
page_title: f5xc_tpm_manager - f5xc-api-mcp
subcategory: Bot And Threat Defense
description: Create TPM Manager.
---

# Tpm Manager

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

List the set of tpm_manager in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-botandthreatdefense-tpm-manager-create` | Create TPM Manager. |
| `f5xc-api-botandthreatdefense-tpm-manager-get` | GET TPM Manager. |
| `f5xc-api-botandthreatdefense-tpm-manager-list` | List TPM Manager. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `metadata.namespace` | Namespace | `Staging` |
| `name` | Name | `Name` |
| `namespace` | Namespace | `Ns1` |

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

- tpm-manager

## Example Usage

Ask Claude to help you work with Tpm Manager resources:

### Create Tpm Manager

> "Create a tpm-manager named 'example' in the 'production' namespace"

### List Tpm Managers

> "List all tpm-managers in the 'production' namespace"

### Get Tpm Manager Details

> "Get details of the tpm-manager named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh bot_and_threat_defense create tpm_manager -n <namespace> -i tpm_manager.yaml

# Get
xcsh bot_and_threat_defense get tpm_manager <name> -n <namespace>

# List
xcsh bot_and_threat_defense list tpm_manager -n <namespace>

# Delete
xcsh bot_and_threat_defense delete tpm_manager <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_tpm_manager" "example" {
  name      = "example-tpm-manager"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
