---
page_title: f5xc_loadbalancer - f5xc-api-mcp
subcategory: WAF
description: Search load balancers All Namespaces.
---

# Loadbalancer

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET list of virtual hosts matching label filter.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-waf-loadbalancer-create` | Search load balancers All Namespaces. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- loadbalancer

## Example Usage

Ask Claude to help you work with Loadbalancer resources:

### Create Loadbalancer

> "Create a loadbalancer named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl data loadbalancer create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl data loadbalancer create {name} --namespace {namespace}
```

Create loadbalancer

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl waf create loadbalancer -n <namespace> -i loadbalancer.yaml

# Get
f5xcctl waf get loadbalancer <name> -n <namespace>

# List
f5xcctl waf list loadbalancer -n <namespace>

# Delete
f5xcctl waf delete loadbalancer <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_loadbalancer" "example" {
  name      = "example-loadbalancer"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
