---
page_title: f5xc_create_http_load_balancer - f5xc-api-mcp
subcategory: Telemetry And Insights
description: Create HTTP/HTTPS load balancer.
---

# Create HTTP Load Balancer

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Create HTTP/HTTPS load balancer using the discovered virtual server as an origin server.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-telemetryandinsights-create-http-load-balancer-create` | Create HTTP/HTTPS load balancer. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Service Name | `Vs1` |
| `namespace` | Namespace | `Shared` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- create-http-load-balancer

## Example Usage

Ask Claude to help you work with Create HTTP Load Balancer resources:

### Create Create HTTP Load Balancer

> "Create a create-http-load-balancer named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl discovery create-http-load-balancer create {name} --namespace {namespace}
```

Create create-http-load-balancer

### file_based

```bash
f5xcctl discovery create-http-load-balancer create -f {file}.yaml
```

Create from YAML file

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl telemetry_and_insights create create_http_load_balancer -n <namespace> -i create_http_load_balancer.yaml

# Get
f5xcctl telemetry_and_insights get create_http_load_balancer <name> -n <namespace>

# List
f5xcctl telemetry_and_insights list create_http_load_balancer -n <namespace>

# Delete
f5xcctl telemetry_and_insights delete create_http_load_balancer <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_create_http_load_balancer" "example" {
  name      = "example-create-http-load-balancer"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
