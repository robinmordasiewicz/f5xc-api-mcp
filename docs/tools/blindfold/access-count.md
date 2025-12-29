---
page_title: f5xc_access_count - f5xc-api-mcp
subcategory: Blindfold
description: VoltShare Access Count Query.
---

# Access Count

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Request to GET number of VoltShare API calls aggregated across multiple dimensions like OPERATION,
COUNTRY, RESULT, USER_TENANT.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-blindfold-access-count-create` | VoltShare Access Count Query. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Blogging-app-namespace-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- access-count

## Example Usage

Ask Claude to help you work with Access Count resources:

### Create Access Count

> "Create a access-count named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl secret_management access-count create {name} --namespace {namespace}
```

Create access-count

### file_based

```bash
f5xcctl secret_management access-count create -f {file}.yaml
```

Create from YAML file

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl blindfold create access_count -n <namespace> -i access_count.yaml

# Get
f5xcctl blindfold get access_count <name> -n <namespace>

# List
f5xcctl blindfold list access_count -n <namespace>

# Delete
f5xcctl blindfold delete access_count <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_access_count" "example" {
  name      = "example-access-count"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
