---
page_title: f5xc_cloud_connect - f5xc-api-mcp
subcategory: Cloud Infrastructure
description: Create Cloud Connect.
---

# Cloud Connect

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

List the set of cloud_connect in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cloudinfrastructure-cloud-connect-create` | Create Cloud Connect. |
| `f5xc-api-cloudinfrastructure-cloud-connect-get` | GET Cloud Connect. |
| `f5xc-api-cloudinfrastructure-cloud-connect-list` | List Cloud Connect. |
| `f5xc-api-cloudinfrastructure-cloud-connect-update` | Replace Cloud Connect. |
| `f5xc-api-cloudinfrastructure-cloud-connect-delete` | DELETE Cloud Connect. |

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

- cloud-connect

**Modifies:**

- cloud-connect

**Deletes:**

- cloud-connect
- contained_resources

## Example Usage

Ask Claude to help you work with Cloud Connect resources:

### Create Cloud Connect

> "Create a cloud-connect named 'example' in the 'production' namespace"

### List Cloud Connects

> "List all cloud-connects in the 'production' namespace"

### Get Cloud Connect Details

> "Get details of the cloud-connect named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl config cloud-connect create {name} --namespace {namespace}
```

Create cloud-connect

### file_based

```bash
f5xcctl config cloud-connect create -f {file}.yaml
```

Create from YAML file

### delete

```bash
f5xcctl config cloud-connect delete {name} --namespace {namespace}
```

Delete cloud-connect

### get_specific

```bash
f5xcctl config cloud-connect get {name} --namespace {namespace}
```

Get specific cloud-connect

### list_all

```bash
f5xcctl config cloud-connect list --namespace {namespace}
```

List all cloud-connects

### update

```bash
f5xcctl config cloud-connect update {name} --namespace {namespace} -f {file}.yaml
```

Update cloud-connect

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl cloud_infrastructure create cloud_connect -n <namespace> -i cloud_connect.yaml

# Get
f5xcctl cloud_infrastructure get cloud_connect <name> -n <namespace>

# List
f5xcctl cloud_infrastructure list cloud_connect -n <namespace>

# Delete
f5xcctl cloud_infrastructure delete cloud_connect <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_cloud_connect" "example" {
  name      = "example-cloud-connect"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
