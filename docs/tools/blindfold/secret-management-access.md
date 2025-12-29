---
page_title: f5xc_secret_management_access - f5xc-api-mcp
subcategory: Blindfold
description: Create Secret Management Access.
---

# Secret Management Access

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replace secret_management_access replaces an existing object in storage backend for
metadata.namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-blindfold-secret-management-access-create` | Create Secret Management Access. |
| `f5xc-api-blindfold-secret-management-access-get` | GET Secret Management Access. |
| `f5xc-api-blindfold-secret-management-access-list` | List Secret Management Access. |
| `f5xc-api-blindfold-secret-management-access-update` | Replace Secret Management Access. |
| `f5xc-api-blindfold-secret-management-access-delete` | DELETE Secret Management Access. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `metadata.namespace` | Namespace | `Staging` |
| `name` | Name | `Name` |
| `namespace` | Namespace | `Ns1` |
| `metadata.name` | Name | `Example-corp-web.` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. | `Env in (staging, testing), tier in (web, db)` |
| `report_fields` | The report_fields parameter | `-` |
| `report_status_fields` | The report_status_fields parameter | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- secret-management-access

**Modifies:**

- secret-management-access

**Deletes:**

- secret-management-access
- contained_resources

## Example Usage

Ask Claude to help you work with Secret Management Access resources:

### Create Secret Management Access

> "Create a secret-management-access named 'example' in the 'production' namespace"

### List Secret Management Accesss

> "List all secret-management-accesss in the 'production' namespace"

### Get Secret Management Access Details

> "Get details of the secret-management-access named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl config secret-management-access create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl config secret-management-access create {name} --namespace {namespace}
```

Create secret-management-access

### delete

```bash
f5xcctl config secret-management-access delete {name} --namespace {namespace}
```

Delete secret-management-access

### get_specific

```bash
f5xcctl config secret-management-access get {name} --namespace {namespace}
```

Get specific secret-management-access

### list_all

```bash
f5xcctl config secret-management-access list --namespace {namespace}
```

List all secret-management-accesss

### update

```bash
f5xcctl config secret-management-access update {name} --namespace {namespace} -f {file}.yaml
```

Update secret-management-access

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl blindfold create secret_management_access -n <namespace> -i secret_management_access.yaml

# Get
f5xcctl blindfold get secret_management_access <name> -n <namespace>

# List
f5xcctl blindfold list secret_management_access -n <namespace>

# Delete
f5xcctl blindfold delete secret_management_access <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_secret_management_access" "example" {
  name      = "example-secret-management-access"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
