---
page_title: f5xc_approve - f5xc-api-mcp
subcategory: Ce Management
description: Registration Approve.
---

# Approve

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

RegistrationApprove approved pending registration and it can also decommission by changing state to
RETIRED.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cemanagement-approve-create` | Registration Approve. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `R-e9030963-639e-41cd-aba6-261504f4a6be.` |
| `namespace` | Namespace | `System` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- approve

## Example Usage

Ask Claude to help you work with Approve resources:

### Create Approve

> "Create a approve named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl register approve create {name} --namespace {namespace}
```

Create approve

### file_based

```bash
f5xcctl register approve create -f {file}.yaml
```

Create from YAML file

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl ce_management create approve -n <namespace> -i approve.yaml

# Get
f5xcctl ce_management get approve <name> -n <namespace>

# List
f5xcctl ce_management list approve -n <namespace>

# Delete
f5xcctl ce_management delete approve <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_approve" "example" {
  name      = "example-approve"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
