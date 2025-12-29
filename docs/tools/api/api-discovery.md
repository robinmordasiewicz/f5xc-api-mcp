---
page_title: f5xc_api_discovery - f5xc-api-mcp
subcategory: API
description: Create API Discovery.
---

# API Discovery

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replace api_discovery replaces an existing object in the storage backend for metadata.namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-api-api-discovery-create` | Create API Discovery. |
| `f5xc-api-api-api-discovery-get` | GET API Discovery. |
| `f5xc-api-api-api-discovery-list` | List API Discovery. |
| `f5xc-api-api-api-discovery-update` | Replace API Discovery. |
| `f5xc-api-api-api-discovery-delete` | DELETE API Discovery. |

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

- api-discovery

**Modifies:**

- api-discovery

**Deletes:**

- api-discovery
- contained_resources

## Example Usage

Ask Claude to help you work with API Discovery resources:

### Create API Discovery

> "Create a api-discovery named 'example' in the 'production' namespace"

### List API Discoverys

> "List all api-discoverys in the 'production' namespace"

### Get API Discovery Details

> "Get details of the api-discovery named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl config api-discovery create {name} --namespace {namespace}
```

Create api-discovery

### file_based

```bash
f5xcctl config api-discovery create -f {file}.yaml
```

Create from YAML file

### delete

```bash
f5xcctl config api-discovery delete {name} --namespace {namespace}
```

Delete api-discovery

### get_specific

```bash
f5xcctl config api-discovery get {name} --namespace {namespace}
```

Get specific api-discovery

### list_all

```bash
f5xcctl config api-discovery list --namespace {namespace}
```

List all api-discoverys

### update

```bash
f5xcctl config api-discovery update {name} --namespace {namespace} -f {file}.yaml
```

Update api-discovery

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl api create api_discovery -n <namespace> -i api_discovery.yaml

# Get
f5xcctl api get api_discovery <name> -n <namespace>

# List
f5xcctl api list api_discovery -n <namespace>

# Delete
f5xcctl api delete api_discovery <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_api_discovery" "example" {
  name      = "example-api-discovery"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
