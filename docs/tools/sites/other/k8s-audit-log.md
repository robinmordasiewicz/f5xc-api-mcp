---
page_title: f5xc_k8s_audit_log - f5xc-api-mcp
subcategory: Sites
description: K8s Audit Log Query.
---

# K8S Audit Log

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

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
| `f5xc-api-sites-k8s-audit-log-create` | K8s Audit Log Query. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |
| `site` | Site | `CE-1` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- k8s-audit-log

## Example Usage

Ask Claude to help you work with K8S Audit Log resources:

### Create K8S Audit Log

> "Create a k8s-audit-log named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl data k8s-audit-log create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl data k8s-audit-log create {name} --namespace {namespace}
```

Create k8s-audit-log

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl sites create k8s_audit_log -n <namespace> -i k8s_audit_log.yaml

# Get
f5xcctl sites get k8s_audit_log <name> -n <namespace>

# List
f5xcctl sites list k8s_audit_log -n <namespace>

# Delete
f5xcctl sites delete k8s_audit_log <name> -n <namespace>
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
