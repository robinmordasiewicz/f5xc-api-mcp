---
page_title: f5xc_graph - f5xc-api-mcp
subcategory: Network Security
description: Segment
---

# Graph

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Request to GET different network segments with given metrics .
This will give metric data for all
segments including intra segment metrics.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networksecurity-graph-create` | Segment |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- graph

## Example Usage

Ask Claude to help you work with Graph resources:

### Create Graph

> "Create a graph named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl data graph create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl data graph create {name} --namespace {namespace}
```

Create graph

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl network_security create graph -n <namespace> -i graph.yaml

# Get
f5xcctl network_security get graph <name> -n <namespace>

# List
f5xcctl network_security list graph -n <namespace>

# Delete
f5xcctl network_security delete graph <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_graph" "example" {
  name      = "example-graph"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
