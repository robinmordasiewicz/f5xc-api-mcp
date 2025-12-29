---
page_title: f5xc_cronjob - f5xc-api-mcp
subcategory: Sites
description: CronJob List.
---

# Cronjob

!!! info "Low Risk"
    Operations on this resource are generally safe.

API to GET list of cronjobs for a given namespace in a site.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-cronjob-list` | CronJob List. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `site` | Site | `Site-1` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace to scope the listing of cronjobs in a site. | `Ns1` |

## Example Usage

Ask Claude to help you work with Cronjob resources:

### List Cronjobs

> "List all cronjobs in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### list_all

```bash
f5xcctl data cronjob list --namespace {namespace}
```

List all cronjobs

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl sites create cronjob -n <namespace> -i cronjob.yaml

# Get
f5xcctl sites get cronjob <name> -n <namespace>

# List
f5xcctl sites list cronjob -n <namespace>

# Delete
f5xcctl sites delete cronjob <name> -n <namespace>
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
