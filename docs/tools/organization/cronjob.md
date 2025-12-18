---
page_title: f5xc_cronjob - f5xc-api-mcp
subcategory: Organization
description: CronJob List
---

# Cronjob

API to get list of cronjobs for a given namespace in a site.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-cronjob-list` | CronJob List |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `site` | site |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | The namespace parameter |

## Example Usage

Ask Claude to help you work with Cronjob resources:

### List Cronjobs

> "List all cronjobs in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f cronjob.yaml

# Get
f5xcctl get cronjob {name} -n {namespace}

# List
f5xcctl get cronjobs -n {namespace}

# Delete
f5xcctl delete cronjob {name} -n {namespace}
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
