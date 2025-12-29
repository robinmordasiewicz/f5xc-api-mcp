---
page_title: f5xc_discovery - f5xc-api-mcp
subcategory: API
description: Create Discovery.
---

# Discovery

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

API to replace discovery object for a site or virtual site in system namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-api-discovery-create` | Create Discovery. |
| `f5xc-api-api-discovery-get` | GET Discovery. |
| `f5xc-api-api-discovery-list` | List Discovery. |
| `f5xc-api-api-discovery-update` | Replace Discovery. |
| `f5xc-api-api-discovery-delete` | DELETE Discovery. |

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

- discovery

**Modifies:**

- discovery

**Deletes:**

- discovery
- contained_resources

## Example Usage

Ask Claude to help you work with Discovery resources:

### Create Discovery

> "Create a discovery named 'example' in the 'production' namespace"

### List Discoverys

> "List all discoverys in the 'production' namespace"

### Get Discovery Details

> "Get details of the discovery named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl config discovery create {name} --namespace {namespace}
```

Create discovery

### file_based

```bash
f5xcctl config discovery create -f {file}.yaml
```

Create from YAML file

### delete

```bash
f5xcctl config discovery delete {name} --namespace {namespace}
```

Delete discovery

### get_specific

```bash
f5xcctl config discovery get {name} --namespace {namespace}
```

Get specific discovery

### list_all

```bash
f5xcctl config discovery list --namespace {namespace}
```

List all discoverys

### update

```bash
f5xcctl config discovery update {name} --namespace {namespace} -f {file}.yaml
```

Update discovery

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl api create discovery -n <namespace> -i discovery.yaml

# Get
f5xcctl api get discovery <name> -n <namespace>

# List
f5xcctl api list discovery -n <namespace>

# Delete
f5xcctl api delete discovery <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_discovery" "example" {
  name      = "example-discovery"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
