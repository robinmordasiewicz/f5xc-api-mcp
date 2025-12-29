---
page_title: f5xc_calls_by_response_code - f5xc-api-mcp
subcategory: Virtual
description: GET Total API Calls for Virtual Host.
---

# Calls By Response Code

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET total API calls for the given Virtual Host.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-virtual-calls-by-response-code-create` | GET Total API Calls for Virtual Host. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Virtual Host Name | `Blogging-app-vhost.` |
| `namespace` | Namespace | `Blogging-app.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- calls-by-response-code

## Example Usage

Ask Claude to help you work with Calls By Response Code resources:

### Create Calls By Response Code

> "Create a calls-by-response-code named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl ml calls-by-response-code create {name} --namespace {namespace}
```

Create calls-by-response-code

### file_based

```bash
f5xcctl ml calls-by-response-code create -f {file}.yaml
```

Create from YAML file

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl virtual create calls_by_response_code -n <namespace> -i calls_by_response_code.yaml

# Get
f5xcctl virtual get calls_by_response_code <name> -n <namespace>

# List
f5xcctl virtual list calls_by_response_code -n <namespace>

# Delete
f5xcctl virtual delete calls_by_response_code <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_calls_by_response_code" "example" {
  name      = "example-calls-by-response-code"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
