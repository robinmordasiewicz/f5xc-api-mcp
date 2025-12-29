---
page_title: f5xc_transit_usage - f5xc-api-mcp
subcategory: Ddos
description: Transit Usage.
---

# Transit Usage

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

API to GET transit usage data.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-ddos-transit-usage-create` | Transit Usage. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- transit-usage

## Example Usage

Ask Claude to help you work with Transit Usage resources:

### Create Transit Usage

> "Create a transit-usage named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl data transit-usage create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl data transit-usage create {name} --namespace {namespace}
```

Create transit-usage

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl ddos create transit_usage -n <namespace> -i transit_usage.yaml

# Get
f5xcctl ddos get transit_usage <name> -n <namespace>

# List
f5xcctl ddos list transit_usage -n <namespace>

# Delete
f5xcctl ddos delete transit_usage <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_transit_usage" "example" {
  name      = "example-transit-usage"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
