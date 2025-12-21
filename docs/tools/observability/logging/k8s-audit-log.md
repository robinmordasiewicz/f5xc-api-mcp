---
page_title: f5xc_k8s_audit_log - f5xc-api-mcp
subcategory: Observability
description: K8s Audit Log Query.
---

# K8S Audit Log

Request to GET Physical K8s audit logs that matches the criteria in request for a given
namespace.
If no match conditions are specified in the request, then the response contains all
CRUD
operations performed in the namespace. User with access to the `system` namespace
may query for
audit logs across all namespaces in a K8s Cluster.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-k8s-audit-log-create` | K8s Audit Log Query. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `site` | Site |

## Example Usage

Ask Claude to help you work with K8S Audit Log resources:

### Create K8S Audit Log

> "Create a k8s-audit-log named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl observability create k8s_audit_log -n <namespace> -i k8s_audit_log.yaml

# Get
f5xcctl observability get k8s_audit_log <name> -n <namespace>

# List
f5xcctl observability list k8s_audit_log -n <namespace>

# Delete
f5xcctl observability delete k8s_audit_log <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_k8s_audit_log" "example" {
  name      = "example-k8s-audit-log"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
