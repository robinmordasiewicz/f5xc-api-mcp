---
page_title: f5xc_request_log - f5xc-api-mcp
subcategory: DNS
description: GET DNS Zone Request Logs.
---

# Request Log

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Retrieve DNS Zone Request Logs.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-dns-request-log-create` | GET DNS Zone Request Logs. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- request-log

## Example Usage

Ask Claude to help you work with Request Log resources:

### Create Request Log

> "Create a request-log named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl data request-log create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl data request-log create {name} --namespace {namespace}
```

Create request-log

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl dns create request_log -n <namespace> -i request_log.yaml

# Get
f5xcctl dns get request_log <name> -n <namespace>

# List
f5xcctl dns list request_log -n <namespace>

# Delete
f5xcctl dns delete request_log <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_request_log" "example" {
  name      = "example-request-log"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
