---
page_title: f5xc_active_service_policie - f5xc-api-mcp
subcategory: Tenant And Identity
description: Set Active Service Policies.
---

# Active Service Policie

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

SetActiveServicePolicies sets the active service policies for the namespace
An emtpy list in the
request will clear the active service policies for the namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-active-service-policie-create` | Set Active Service Policies. |
| `f5xc-api-tenantandidentity-active-service-policie-list` | GET Active Service Policies. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Ns1` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- active-service-policie

## Example Usage

Ask Claude to help you work with Active Service Policie resources:

### Create Active Service Policie

> "Create a active-service-policie named 'example' in the 'production' namespace"

### List Active Service Policies

> "List all active-service-policies in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh tenant_and_identity create active_service_policie -n <namespace> -i active_service_policie.yaml

# Get
xcsh tenant_and_identity get active_service_policie <name> -n <namespace>

# List
xcsh tenant_and_identity list active_service_policie -n <namespace>

# Delete
xcsh tenant_and_identity delete active_service_policie <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_active_service_policie" "example" {
  name      = "example-active-service-policie"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
