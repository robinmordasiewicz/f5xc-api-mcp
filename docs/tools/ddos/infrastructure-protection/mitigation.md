---
page_title: f5xc_mitigation - f5xc-api-mcp
subcategory: Ddos
description: List of mitigations.
---

# Mitigation

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Returns details of a single mitigation.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-ddos-mitigation-create` | List of mitigations. |
| `f5xc-api-ddos-mitigation-list` | Mitigation details. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |
| `mitigation_id` | Mitigation ID | `9ba097cf-35e3-4560-9c00-5a1a36b8f85b.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- mitigation

## Example Usage

Ask Claude to help you work with Mitigation resources:

### Create Mitigation

> "Create a mitigation named 'example' in the 'production' namespace"

### List Mitigations

> "List all mitigations in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl infraprotect mitigation create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl infraprotect mitigation create {name} --namespace {namespace}
```

Create mitigation

### list_all

```bash
f5xcctl infraprotect mitigation list --namespace {namespace}
```

List all mitigations

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl ddos create mitigation -n <namespace> -i mitigation.yaml

# Get
f5xcctl ddos get mitigation <name> -n <namespace>

# List
f5xcctl ddos list mitigation -n <namespace>

# Delete
f5xcctl ddos delete mitigation <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_mitigation" "example" {
  name      = "example-mitigation"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
