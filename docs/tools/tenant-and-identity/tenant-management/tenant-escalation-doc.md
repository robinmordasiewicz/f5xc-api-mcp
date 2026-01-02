---
page_title: f5xc_tenant_escalation_doc - f5xc-api-mcp
subcategory: Tenant And Identity
description: Tenant escalation document.
---

# Tenant Escalation Doc

!!! info "Low Risk"
    Operations on this resource are generally safe.

Receive current tenant escalation document.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-tenant-escalation-doc-list` | Tenant escalation document. |

## Example Usage

Ask Claude to help you work with Tenant Escalation Doc resources:

### List Tenant Escalation Docs

> "List all tenant-escalation-docs in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh tenant_and_identity create tenant_escalation_doc -n <namespace> -i tenant_escalation_doc.yaml

# Get
xcsh tenant_and_identity get tenant_escalation_doc <name> -n <namespace>

# List
xcsh tenant_and_identity list tenant_escalation_doc -n <namespace>

# Delete
xcsh tenant_and_identity delete tenant_escalation_doc <name> -n <namespace>
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
