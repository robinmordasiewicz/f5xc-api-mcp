---
page_title: f5xc_threat_campaign - f5xc-api-mcp
subcategory: Threat Campaign
description: GET Threat Campaign by ID.
---

# Threat Campaign

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET Threat Campaign by ID.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-threatcampaign-threat-campaign-get` | GET Threat Campaign by ID. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `id` | ID | `Cmp5641a5adbeabaf2708ce7663ad937df8.` |

## Example Usage

Ask Claude to help you work with Threat Campaign resources:

### Get Threat Campaign Details

> "Get details of the threat-campaign named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh threat_campaign create threat_campaign -n <namespace> -i threat_campaign.yaml

# Get
xcsh threat_campaign get threat_campaign <name> -n <namespace>

# List
xcsh threat_campaign list threat_campaign -n <namespace>

# Delete
xcsh threat_campaign delete threat_campaign <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_threat_campaign" "example" {
  name      = "example-threat-campaign"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
