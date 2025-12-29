---
page_title: f5xc_aggregation - f5xc-api-mcp
subcategory: CDN
description: CDN Access Log Aggregation Query.
---

# Aggregation

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Request to GET summary/analytics data for the CDN access logs that matches the query in request for
a given namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cdn-aggregation-create` | CDN Access Log Aggregation Query. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- aggregation

## Example Usage

Ask Claude to help you work with Aggregation resources:

### Create Aggregation

> "Create a aggregation named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl cdn aggregation create {name} --namespace {namespace}
```

Create aggregation

### file_based

```bash
f5xcctl cdn aggregation create -f {file}.yaml
```

Create from YAML file

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl cdn create aggregation -n <namespace> -i aggregation.yaml

# Get
f5xcctl cdn get aggregation <name> -n <namespace>

# List
f5xcctl cdn list aggregation -n <namespace>

# Delete
f5xcctl cdn delete aggregation <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_aggregation" "example" {
  name      = "example-aggregation"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
