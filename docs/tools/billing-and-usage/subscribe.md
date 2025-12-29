---
page_title: f5xc_subscribe - f5xc-api-mcp
subcategory: Billing And Usage
description: Subscribe to XC addon services.
---

# Subscribe

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Subscribe to XC addon services.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-billingandusage-subscribe-create` | Subscribe to XC addon services. |

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
f5xcctl web subscribe create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl web subscribe create {name} --namespace {namespace}
```

Create subscribe

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl billing_and_usage create subscribe -n <namespace> -i subscribe.yaml

# Get
f5xcctl billing_and_usage get subscribe <name> -n <namespace>

# List
f5xcctl billing_and_usage list subscribe -n <namespace>

# Delete
f5xcctl billing_and_usage delete subscribe <name> -n <namespace>
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
