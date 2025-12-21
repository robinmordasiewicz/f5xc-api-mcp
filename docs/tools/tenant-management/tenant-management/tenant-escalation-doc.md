---
page_title: f5xc_tenant_escalation_doc - f5xc-api-mcp
subcategory: Tenant & Organization Management
description: Tenant escalation document.
---

# Tenant Escalation Doc

Receive current tenant escalation document.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantmanagement-tenant-escalation-doc-list` | Tenant escalation document. |

## Example Usage

Ask Claude to help you work with Tenant Escalation Doc resources:

### List Tenant Escalation Docs

> "List all tenant-escalation-docs in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create tenant_escalation_doc -n <namespace> -i tenant_escalation_doc.yaml

# Get
f5xcctl configuration get tenant_escalation_doc -n <namespace> <name>

# List
f5xcctl configuration list tenant_escalation_doc -n <namespace>

# Delete
f5xcctl configuration delete tenant_escalation_doc -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_tenant_escalation_doc" "example" {
  name      = "example-tenant-escalation-doc"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
