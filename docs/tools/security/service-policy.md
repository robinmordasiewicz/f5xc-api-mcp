---
page_title: f5xc_service_policy - f5xc-api-mcp
subcategory: Security
description: Create Service Policy
---

# Service Policy

Replace service_policy replaces an existing object in the storage backend for metadata.namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-service-policy-create` | Create Service Policy |
| `f5xc-api-security-service-policy-get` | Get Service Policy |
| `f5xc-api-security-service-policy-list` | List Service Policy |
| `f5xc-api-security-service-policy-update` | Replace Service Policy |
| `f5xc-api-security-service-policy-delete` | Delete Service Policy |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `metadata.namespace` | namespace |
| `name` | name |
| `namespace` | namespace |
| `metadata.name` | name |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | The label_filter parameter |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with Service Policy resources:

### Create Service Policy

> "Create a service-policy named 'example' in the 'production' namespace"

### List Service Policys

> "List all service-policys in the 'production' namespace"

### Get Service Policy Details

> "Get details of the service-policy named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create service_policy -n <namespace> -i service_policy.yaml

# Get
f5xcctl configuration get service_policy -n <namespace> <name>

# List
f5xcctl configuration list service_policy -n <namespace>

# Delete
f5xcctl configuration delete service_policy -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_service_policy" "example" {
  name      = "example-service-policy"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
