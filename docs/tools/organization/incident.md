---
page_title: f5xc_incident - f5xc-api-mcp
subcategory: Organization
description: Security Incidents Query
---

# Incident

Get security incidents for the given namespace.
For `system` namespace, all security incidents for
the tenant matching the query specified
in the request will be returned in the response. User may
query security incidents that matches various
fields such as `vh_name`, `intent`, `city`, `country`.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-incident-create` | Security Incidents Query |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | namespace |

## Example Usage

Ask Claude to help you work with Incident resources:

### Create Incident

> "Create a incident named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f incident.yaml

# Get
f5xcctl get incident {name} -n {namespace}

# List
f5xcctl get incidents -n {namespace}

# Delete
f5xcctl delete incident {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_incident" "example" {
  name      = "example-incident"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
