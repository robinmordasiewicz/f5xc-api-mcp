---
page_title: f5xc_top_talker - f5xc-api-mcp
subcategory: Statistics
description: L3l4 Top talkers Query.
---

# Top Talker

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Request to GET l3l4 Top talkers Traffic data.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-statistics-top-talker-create` | L3l4 Top talkers Query. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |
| `network_id` | NetworkId | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- top-talker

## Example Usage

Ask Claude to help you work with Top Talker resources:

### Create Top Talker

> "Create a top-talker named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl infraprotect top-talker create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl infraprotect top-talker create {name} --namespace {namespace}
```

Create top-talker

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl statistics create top_talker -n <namespace> -i top_talker.yaml

# Get
f5xcctl statistics get top_talker <name> -n <namespace>

# List
f5xcctl statistics list top_talker -n <namespace>

# Delete
f5xcctl statistics delete top_talker <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_top_talker" "example" {
  name      = "example-top-talker"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
