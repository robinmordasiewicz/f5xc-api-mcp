---
page_title: f5xc_script - f5xc-api-mcp
subcategory: Shape
description: List Scripts.
---

# Script

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

List all the scripts for the tenant depending on start time and end time.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-script-create` | List Scripts. |
| `f5xc-api-shape-script-list` | List Scripts. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Default` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `end_time` | X-required | `1570194300.` |
| `page_number` | One-indexed page number (starts from 1), page_number and page_size are optional when page_token is specified. | `10` |
| `page_size` | The maximum number of scripts to return per page. | `500` |
| `page_token` | Page_token is the value of listscriptsresponse.next_page_token from previous request. | `CGFnZV9zaXplPTUwMCZwYWdlX251bWJlcj0y.` |
| `start_time` | X-required | `1570194000.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- script

## Example Usage

Ask Claude to help you work with Script resources:

### Create Script

> "Create a script named 'example' in the 'production' namespace"

### List Scripts

> "List all scripts in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl shape script create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl shape script create {name} --namespace {namespace}
```

Create script

### list_all

```bash
f5xcctl shape script list --namespace {namespace}
```

List all scripts

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create script -n <namespace> -i script.yaml

# Get
f5xcctl shape get script <name> -n <namespace>

# List
f5xcctl shape list script -n <namespace>

# Delete
f5xcctl shape delete script <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_script" "example" {
  name      = "example-script"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
