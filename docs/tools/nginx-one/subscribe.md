---
page_title: f5xc_subscribe - f5xc-api-mcp
subcategory: Nginx One
description: Subscribe to NGINX One.
---

# Subscribe

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Subscribe to NGINX One.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-nginxone-subscribe-create` | Subscribe to NGINX One. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- subscribe

## Example Usage

Ask Claude to help you work with Subscribe resources:

### Create Subscribe

> "Create a subscribe named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl nginx subscribe create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl nginx subscribe create {name} --namespace {namespace}
```

Create subscribe

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl nginx_one create subscribe -n <namespace> -i subscribe.yaml

# Get
f5xcctl nginx_one get subscribe <name> -n <namespace>

# List
f5xcctl nginx_one list subscribe -n <namespace>

# Delete
f5xcctl nginx_one delete subscribe <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_subscribe" "example" {
  name      = "example-subscribe"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
