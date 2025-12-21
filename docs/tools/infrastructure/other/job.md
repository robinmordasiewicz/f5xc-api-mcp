---
page_title: f5xc_job - f5xc-api-mcp
subcategory: Infrastructure
description: Job List
---

# Job

API to GET list of jobs for a given namespace in a site.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-infrastructure-job-list` | Job List |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `site` | Site |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace to scope the listing of jobs in a site. |

## Example Usage

Ask Claude to help you work with Job resources:

### List Jobs

> "List all jobs in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl infrastructure create job -n <namespace> -i job.yaml

# Get
f5xcctl infrastructure get job <name> -n <namespace>

# List
f5xcctl infrastructure list job -n <namespace>

# Delete
f5xcctl infrastructure delete job <name> -n <namespace>
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
