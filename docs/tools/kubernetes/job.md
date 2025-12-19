---
page_title: f5xc_job - f5xc-api-mcp
subcategory: Kubernetes
description: Job List
---

# Job

API to get list of jobs for a given namespace in a site.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-job-list` | Job List |

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

Ask Claude to help you work with Job resources:

### List Jobs

> "List all jobs in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f job.yaml

# Get
f5xcctl get job {name} -n {namespace}

# List
f5xcctl get jobs -n {namespace}

# Delete
f5xcctl delete job {name} -n {namespace}
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
