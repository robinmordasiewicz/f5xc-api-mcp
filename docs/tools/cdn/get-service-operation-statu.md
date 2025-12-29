---
page_title: f5xc_get_service_operation_statu - f5xc-api-mcp
subcategory: CDN
description: GET Service Operation Status.
---

# Get Service Operation Statu

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET status of an operation command for a given CDN Loadbalancer.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cdn-get-service-operation-statu-create` | GET Service Operation Status. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Default` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- get-service-operation-statu

## Example Usage

Ask Claude to help you work with Get Service Operation Statu resources:

### Create Get Service Operation Statu

> "Create a get-service-operation-statu named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl cdn get-service-operation-statu create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl cdn get-service-operation-statu create {name} --namespace {namespace}
```

Create get-service-operation-statu

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl cdn create get_service_operation_statu -n <namespace> -i get_service_operation_statu.yaml

# Get
f5xcctl cdn get get_service_operation_statu <name> -n <namespace>

# List
f5xcctl cdn list get_service_operation_statu -n <namespace>

# Delete
f5xcctl cdn delete get_service_operation_statu <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_get_service_operation_statu" "example" {
  name      = "example-get-service-operation-statu"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
