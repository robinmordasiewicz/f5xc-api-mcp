---
page_title: f5xc_event - f5xc-api-mcp
subcategory: WAF
description: Security Events Query.
---

# Event

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET security events for the given namespace.
For `system` namespace, all security events for the
tenant matching the query specified
in the request will be returned in the response. User may query
security events that matches various
fields such as `vh_name`, `sec_event_type`, `src_site`, `city`,
`country`.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-waf-event-create` | Security Events Query. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Bloggin-app-namespace-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- event

## Example Usage

Ask Claude to help you work with Event resources:

### Create Event

> "Create a event named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl data event create {name} --namespace {namespace}
```

Create event

### file_based

```bash
f5xcctl data event create -f {file}.yaml
```

Create from YAML file

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl waf create event -n <namespace> -i event.yaml

# Get
f5xcctl waf get event <name> -n <namespace>

# List
f5xcctl waf list event -n <namespace>

# Delete
f5xcctl waf delete event <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_event" "example" {
  name      = "example-event"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
