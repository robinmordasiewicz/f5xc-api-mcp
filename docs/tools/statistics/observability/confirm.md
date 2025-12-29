---
page_title: f5xc_confirm - f5xc-api-mcp
subcategory: Statistics
description: Confirm Alert Receiver.
---

# Confirm

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

API to confirm the Alert Receiver - applicable only for email and sms.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-statistics-confirm-create` | Confirm Alert Receiver. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Email1` |
| `namespace` | Namespace | `Ns1` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- confirm

## Example Usage

Ask Claude to help you work with Confirm resources:

### Create Confirm

> "Create a confirm named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl alert confirm create {name} --namespace {namespace}
```

Create confirm

### file_based

```bash
f5xcctl alert confirm create -f {file}.yaml
```

Create from YAML file

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl statistics create confirm -n <namespace> -i confirm.yaml

# Get
f5xcctl statistics get confirm <name> -n <namespace>

# List
f5xcctl statistics list confirm -n <namespace>

# Delete
f5xcctl statistics delete confirm <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_confirm" "example" {
  name      = "example-confirm"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
