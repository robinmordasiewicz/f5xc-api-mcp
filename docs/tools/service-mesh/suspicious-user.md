---
page_title: f5xc_suspicious_user - f5xc-api-mcp
subcategory: Service Mesh
description: GET Status of Suspicious users.
---

# Suspicious User

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET status of suspicious users.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-servicemesh-suspicious-user-get` | GET Status of Suspicious users. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Value` |
| `namespace` | Namespace | `Bloggin-app-namespace-1.` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `end_time` | Fetch suspicious users during timestamp <= end_time | `1570007981.` |
| `query` | Blogging_app"}" | `Query={app_type=.` |
| `start_time` | Fetch suspicious users during timestamp >= start_time | `1570007981.` |
| `topn` | The topn parameter | `None of int32 samples [0 1 10 42 100 1024 2048] satisfied rules map[VES.I/o.schema.rules.uint32.gte:1 VES.I/o.schema.rules.uint32.lte:100]` |

## Example Usage

Ask Claude to help you work with Suspicious User resources:

### Get Suspicious User Details

> "Get details of the suspicious-user named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### get_specific

```bash
f5xcctl ml suspicious-user get {name} --namespace {namespace}
```

Get specific suspicious-user

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl service_mesh create suspicious_user -n <namespace> -i suspicious_user.yaml

# Get
f5xcctl service_mesh get suspicious_user <name> -n <namespace>

# List
f5xcctl service_mesh list suspicious_user -n <namespace>

# Delete
f5xcctl service_mesh delete suspicious_user <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_suspicious_user" "example" {
  name      = "example-suspicious-user"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
