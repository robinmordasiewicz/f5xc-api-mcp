---
page_title: f5xc_cronjob - f5xc-api-mcp
subcategory: Infrastructure
description: CronJob List.
---

# Cronjob

API to GET list of cronjobs for a given namespace in a site.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-infrastructure-cronjob-list` | CronJob List. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `site` | Site |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace to scope the listing of cronjobs in a site. |

## Example Usage

Ask Claude to help you work with Cronjob resources:

### List Cronjobs

> "List all cronjobs in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create cronjob -n <namespace> -i cronjob.yaml

# Get
f5xcctl configuration get cronjob -n <namespace> <name>

# List
f5xcctl configuration list cronjob -n <namespace>

# Delete
f5xcctl configuration delete cronjob -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_cronjob" "example" {
  name      = "example-cronjob"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
