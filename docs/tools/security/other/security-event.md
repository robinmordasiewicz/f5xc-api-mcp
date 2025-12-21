---
page_title: f5xc_security_event - f5xc-api-mcp
subcategory: Security
description: Client Security Events Metrics.
---

# Security Event

GET number of security events per client for a given namespace.
The security events counter can be
aggregated based on one or more labels listed here.
NAMESPACE, APP_TYPE, VIRTUAL_HOST, SITE,
SERVICE, INSTANCE, WAF_INSTANCE_ID, WAF_MODE.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-security-event-create` | Client Security Events Metrics. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Security Event resources:

### Create Security Event

> "Create a security-event named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create security_event -n <namespace> -i security_event.yaml

# Get
f5xcctl configuration get security_event -n <namespace> <name>

# List
f5xcctl configuration list security_event -n <namespace>

# Delete
f5xcctl configuration delete security_event -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_security_event" "example" {
  name      = "example-security-event"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
