---
page_title: f5xc_threat_campaign - f5xc-api-mcp
subcategory: Security
description: Get Threat Campaign by ID
---

# Threat Campaign

Get Threat Campaign by ID

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-threat-campaign-get` | Get Threat Campaign by ID |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `id` | id |

## Example Usage

Ask Claude to help you work with Threat Campaign resources:

### Get Threat Campaign Details

> "Get details of the threat-campaign named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create threat_campaign -n <namespace> -i threat_campaign.yaml

# Get
f5xcctl configuration get threat_campaign -n <namespace> <name>

# List
f5xcctl configuration list threat_campaign -n <namespace>

# Delete
f5xcctl configuration delete threat_campaign -n <namespace> <name>
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
