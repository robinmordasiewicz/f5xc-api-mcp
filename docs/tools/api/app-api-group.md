---
page_title: f5xc_app_api_group - f5xc-api-mcp
subcategory: API
description: Create API Group.
---

# App API Group

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replace app_api_group replaces an existing object in the storage backend for metadata.namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-api-app-api-group-create` | Create API Group. |
| `f5xc-api-api-app-api-group-get` | GET API Group. |
| `f5xc-api-api-app-api-group-list` | List App API Group. |
| `f5xc-api-api-app-api-group-update` | Replace API Group. |
| `f5xc-api-api-app-api-group-delete` | DELETE App API Group. |

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

- app-api-group

**Modifies:**

- app-api-group

**Deletes:**

- app-api-group
- contained_resources

## Example Usage

Ask Claude to help you work with App API Group resources:

### Create App API Group

> "Create a app-api-group named 'example' in the 'production' namespace"

### List App API Groups

> "List all app-api-groups in the 'production' namespace"

### Get App API Group Details

> "Get details of the app-api-group named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl config app-api-group create {name} --namespace {namespace}
```

Create app-api-group

### file_based

```bash
f5xcctl config app-api-group create -f {file}.yaml
```

Create from YAML file

### delete

```bash
f5xcctl config app-api-group delete {name} --namespace {namespace}
```

Delete app-api-group

### get_specific

```bash
f5xcctl config app-api-group get {name} --namespace {namespace}
```

Get specific app-api-group

### list_all

```bash
f5xcctl config app-api-group list --namespace {namespace}
```

List all app-api-groups

### update

```bash
f5xcctl config app-api-group update {name} --namespace {namespace} -f {file}.yaml
```

Update app-api-group

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl api create app_api_group -n <namespace> -i app_api_group.yaml

# Get
f5xcctl api get app_api_group <name> -n <namespace>

# List
f5xcctl api list app_api_group -n <namespace>

# Delete
f5xcctl api delete app_api_group <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_app_api_group" "example" {
  name      = "example-app-api-group"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
