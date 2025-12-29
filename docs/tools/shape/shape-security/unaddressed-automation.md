---
page_title: f5xc_unaddressed_automation - f5xc-api-mcp
subcategory: Shape
description: Insight Unaddressed Automations.
---

# Unaddressed Automation

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Insight Unaddressed Automations.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-unaddressed-automation-create` | Insight Unaddressed Automations. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Default` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- unaddressed-automation

## Example Usage

Ask Claude to help you work with Unaddressed Automation resources:

### Create Unaddressed Automation

> "Create a unaddressed-automation named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl shape unaddressed-automation create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl shape unaddressed-automation create {name} --namespace {namespace}
```

Create unaddressed-automation

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create unaddressed_automation -n <namespace> -i unaddressed_automation.yaml

# Get
f5xcctl shape get unaddressed_automation <name> -n <namespace>

# List
f5xcctl shape list unaddressed_automation -n <namespace>

# Delete
f5xcctl shape delete unaddressed_automation <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_unaddressed_automation" "example" {
  name      = "example-unaddressed-automation"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
