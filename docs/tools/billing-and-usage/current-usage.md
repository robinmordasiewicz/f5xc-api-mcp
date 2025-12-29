---
page_title: f5xc_current_usage - f5xc-api-mcp
subcategory: Billing And Usage
description: List current usage details.
---

# Current Usage

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

List current usage details per tenant and namespace. Some usage have only sense in the system
namespace and this selector has no effect on it.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-billingandusage-current-usage-create` | List current usage details. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- current-usage

## Example Usage

Ask Claude to help you work with Current Usage resources:

### Create Current Usage

> "Create a current-usage named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl web current-usage create {name} --namespace {namespace}
```

Create current-usage

### file_based

```bash
f5xcctl web current-usage create -f {file}.yaml
```

Create from YAML file

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl billing_and_usage create current_usage -n <namespace> -i current_usage.yaml

# Get
f5xcctl billing_and_usage get current_usage <name> -n <namespace>

# List
f5xcctl billing_and_usage list current_usage -n <namespace>

# Delete
f5xcctl billing_and_usage delete current_usage <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_current_usage" "example" {
  name      = "example-current-usage"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
