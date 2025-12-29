---
page_title: f5xc_total_automation - f5xc-api-mcp
subcategory: Shape
description: "Insight Event: Total Automation."
---

# Total Automation

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET Insight Totol Automation data.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-total-automation-create` | Insight Event: Total Automation. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Default` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- total-automation

## Example Usage

Ask Claude to help you work with Total Automation resources:

### Create Total Automation

> "Create a total-automation named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl shape total-automation create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl shape total-automation create {name} --namespace {namespace}
```

Create total-automation

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create total_automation -n <namespace> -i total_automation.yaml

# Get
f5xcctl shape get total_automation <name> -n <namespace>

# List
f5xcctl shape list total_automation -n <namespace>

# Delete
f5xcctl shape delete total_automation <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_total_automation" "example" {
  name      = "example-total-automation"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
