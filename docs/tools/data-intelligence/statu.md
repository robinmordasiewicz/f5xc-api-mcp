---
page_title: f5xc_statu - f5xc-api-mcp
subcategory: Data Intelligence
description: Update Status of Receiver.
---

# Statu

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Update receiver object status from enable to disable and vice versa.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-dataintelligence-statu-create` | Update Status of Receiver. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `id` | ID | `Splunk-cloud-receiver.` |
| `namespace` | Namespace | `Foobar` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- statu

## Example Usage

Ask Claude to help you work with Statu resources:

### Create Statu

> "Create a statu named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl data-intelligence statu create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl data-intelligence statu create {name} --namespace {namespace}
```

Create statu

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl data_intelligence create statu -n <namespace> -i statu.yaml

# Get
f5xcctl data_intelligence get statu <name> -n <namespace>

# List
f5xcctl data_intelligence list statu -n <namespace>

# Delete
f5xcctl data_intelligence delete statu <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_statu" "example" {
  name      = "example-statu"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
