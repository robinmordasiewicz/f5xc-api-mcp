---
page_title: f5xc_usage - f5xc-api-mcp
subcategory: Container Services
description: Usage Metrics.
---

# Usage

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET the workload usage.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-containerservices-usage-create` | Usage Metrics. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Ns1` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- usage

## Example Usage

Ask Claude to help you work with Usage resources:

### Create Usage

> "Create a usage named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl data usage create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl data usage create {name} --namespace {namespace}
```

Create usage

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl container_services create usage -n <namespace> -i usage.yaml

# Get
f5xcctl container_services get usage <name> -n <namespace>

# List
f5xcctl container_services list usage -n <namespace>

# Delete
f5xcctl container_services delete usage <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_usage" "example" {
  name      = "example-usage"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
