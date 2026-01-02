---
page_title: f5xc_access_log - f5xc-api-mcp
subcategory: Observability
description: Access Log Query V2.
---

# Access Log

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Request to GET access logs that matches the criteria in request for a given namespace.
Typically,
virtual host is specified as match condition in the request to GET all access logs
for a virtual
host. By default, the access logs in the response are sorted in the reverse chronological order.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-access-log-create` | Access Log Query V2. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- access-log

## Example Usage

Ask Claude to help you work with Access Log resources:

### Create Access Log

> "Create a access-log named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh observability create access_log -n <namespace> -i access_log.yaml

# Get
xcsh observability get access_log <name> -n <namespace>

# List
xcsh observability list access_log -n <namespace>

# Delete
xcsh observability delete access_log <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_access_log" "example" {
  name      = "example-access-log"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
