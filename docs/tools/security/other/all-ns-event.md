---
page_title: f5xc_all_ns_event - f5xc-api-mcp
subcategory: Security
description: Security Events Query All Namespaces.
---

# All Ns Event

GET security events for the given namespace.
For `system` namespace, all security events for the
tenant matching the query specified
in the request will be returned in the response. User may query
security events that matches various
fields such as `vh_name`, `sec_event_type`, `src_site`, `city`,
`country`.
This API is specific to system namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-all-ns-event-create` | Security Events Query All Namespaces. |

## Example Usage

Ask Claude to help you work with All Ns Event resources:

### Create All Ns Event

> "Create a all-ns-event named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl security create all_ns_event -n <namespace> -i all_ns_event.yaml

# Get
f5xcctl security get all_ns_event <name> -n <namespace>

# List
f5xcctl security list all_ns_event -n <namespace>

# Delete
f5xcctl security delete all_ns_event <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_all_ns_event" "example" {
  name      = "example-all-ns-event"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
