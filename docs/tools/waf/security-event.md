---
page_title: f5xc_security_event - f5xc-api-mcp
subcategory: WAF
description: Client Security Events Metrics.
---

# Security Event

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET number of security events per client for a given namespace.
The security events counter can be
aggregated based on one or more labels listed here.
NAMESPACE, APP_TYPE, VIRTUAL_HOST, SITE,
SERVICE, INSTANCE, WAF_INSTANCE_ID, WAF_MODE.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-waf-security-event-create` | Client Security Events Metrics. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Bloggin-app-namespace-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- security-event

## Example Usage

Ask Claude to help you work with Security Event resources:

### Create Security Event

> "Create a security-event named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh waf create security_event -n <namespace> -i security_event.yaml

# Get
xcsh waf get security_event <name> -n <namespace>

# List
xcsh waf list security_event -n <namespace>

# Delete
xcsh waf delete security_event <name> -n <namespace>
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
