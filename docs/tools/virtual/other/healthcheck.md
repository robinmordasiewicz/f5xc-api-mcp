---
page_title: f5xc_healthcheck - f5xc-api-mcp
subcategory: Virtual
description: Create Health Check.
---

# Healthcheck

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Healthcheck object defines method to determine if the given Endpoint is healthy.
Single Healthcheck
object can be referred to by one or many Cluster objects.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-virtual-healthcheck-create` | Create Health Check. |
| `f5xc-api-virtual-healthcheck-get` | GET Health Check. |
| `f5xc-api-virtual-healthcheck-list` | List Health Check. |
| `f5xc-api-virtual-healthcheck-update` | Replace Health Check. |
| `f5xc-api-virtual-healthcheck-delete` | DELETE Health Check. |

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

- healthcheck

**Modifies:**

- healthcheck

**Deletes:**

- healthcheck
- contained_resources

## Example Usage

Ask Claude to help you work with Healthcheck resources:

### Create Healthcheck

> "Create a healthcheck named 'example' in the 'production' namespace"

### List Healthchecks

> "List all healthchecks in the 'production' namespace"

### Get Healthcheck Details

> "Get details of the healthcheck named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl config healthcheck create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl config healthcheck create {name} --namespace {namespace}
```

Create healthcheck

### delete

```bash
f5xcctl config healthcheck delete {name} --namespace {namespace}
```

Delete healthcheck

### get_specific

```bash
f5xcctl config healthcheck get {name} --namespace {namespace}
```

Get specific healthcheck

### list_all

```bash
f5xcctl config healthcheck list --namespace {namespace}
```

List all healthchecks

### update

```bash
f5xcctl config healthcheck update {name} --namespace {namespace} -f {file}.yaml
```

Update healthcheck

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl virtual create healthcheck -n <namespace> -i healthcheck.yaml

# Get
f5xcctl virtual get healthcheck <name> -n <namespace>

# List
f5xcctl virtual list healthcheck -n <namespace>

# Delete
f5xcctl virtual delete healthcheck <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_healthcheck" "example" {
  name      = "example-healthcheck"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
