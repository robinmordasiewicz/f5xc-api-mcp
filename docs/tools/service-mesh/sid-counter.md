---
page_title: f5xc_sid_counter - f5xc-api-mcp
subcategory: Service Mesh
description: SID Counters.
---

# Sid Counter

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

API to GET SID Counters.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-servicemesh-sid-counter-create` | SID Counters. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- sid-counter

## Example Usage

Ask Claude to help you work with Sid Counter resources:

### Create Sid Counter

> "Create a sid-counter named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl data sid-counter create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl data sid-counter create {name} --namespace {namespace}
```

Create sid-counter

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl service_mesh create sid_counter -n <namespace> -i sid_counter.yaml

# Get
f5xcctl service_mesh get sid_counter <name> -n <namespace>

# List
f5xcctl service_mesh list sid_counter -n <namespace>

# Delete
f5xcctl service_mesh delete sid_counter <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_sid_counter" "example" {
  name      = "example-sid-counter"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
