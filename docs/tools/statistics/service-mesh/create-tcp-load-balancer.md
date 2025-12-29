---
page_title: f5xc_create_tcp_load_balancer - f5xc-api-mcp
subcategory: Statistics
description: Create TCP load balancer.
---

# Create TCP Load Balancer

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Create TCP load balancer using the discovered virtual server as an origin server.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-statistics-create-tcp-load-balancer-create` | Create TCP load balancer. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Service Name | `Vs1` |
| `namespace` | Namespace | `Shared` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- create-tcp-load-balancer

## Example Usage

Ask Claude to help you work with Create TCP Load Balancer resources:

### Create Create TCP Load Balancer

> "Create a create-tcp-load-balancer named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl discovery create-tcp-load-balancer create {name} --namespace {namespace}
```

Create create-tcp-load-balancer

### file_based

```bash
f5xcctl discovery create-tcp-load-balancer create -f {file}.yaml
```

Create from YAML file

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl statistics create create_tcp_load_balancer -n <namespace> -i create_tcp_load_balancer.yaml

# Get
f5xcctl statistics get create_tcp_load_balancer <name> -n <namespace>

# List
f5xcctl statistics list create_tcp_load_balancer -n <namespace>

# Delete
f5xcctl statistics delete create_tcp_load_balancer <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_create_tcp_load_balancer" "example" {
  name      = "example-create-tcp-load-balancer"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
