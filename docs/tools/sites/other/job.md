---
page_title: f5xc_job - f5xc-api-mcp
subcategory: Sites
description: Job List
---

# Job

!!! info "Low Risk"
    Operations on this resource are generally safe.

API to GET list of jobs for a given namespace in a site.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-job-list` | Job List |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `site` | Site | `Site-1` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace to scope the listing of jobs in a site. | `Ns1` |

## Example Usage

Ask Claude to help you work with Job resources:

### List Jobs

> "List all jobs in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh sites create job -n <namespace> -i job.yaml

# Get
xcsh sites get job <name> -n <namespace>

# List
xcsh sites list job -n <namespace>

# Delete
xcsh sites delete job <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_job" "example" {
  name      = "example-job"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
