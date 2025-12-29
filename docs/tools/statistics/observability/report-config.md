---
page_title: f5xc_report_config - f5xc-api-mcp
subcategory: Statistics
description: Create Report Configuration.
---

# Report Config

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Update the configuration by replacing the existing spec with the provided one.
For read-then-write
operations a resourceVersion mismatch will occur if the object was modified between the read and
write.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-statistics-report-config-create` | Create Report Configuration. |
| `f5xc-api-statistics-report-config-get` | GET Report Configuration. |
| `f5xc-api-statistics-report-config-list` | List Report Configuration. |
| `f5xc-api-statistics-report-config-update` | Replace Report Configuration. |
| `f5xc-api-statistics-report-config-delete` | DELETE Report Configuration. |

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

- report-config

**Modifies:**

- report-config

**Deletes:**

- report-config
- contained_resources

## Example Usage

Ask Claude to help you work with Report Config resources:

### Create Report Config

> "Create a report-config named 'example' in the 'production' namespace"

### List Report Configs

> "List all report-configs in the 'production' namespace"

### Get Report Config Details

> "Get details of the report-config named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl report report-config create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl report report-config create {name} --namespace {namespace}
```

Create report-config

### delete

```bash
f5xcctl report report-config delete {name} --namespace {namespace}
```

Delete report-config

### get_specific

```bash
f5xcctl report report-config get {name} --namespace {namespace}
```

Get specific report-config

### list_all

```bash
f5xcctl report report-config list --namespace {namespace}
```

List all report-configs

### update

```bash
f5xcctl report report-config update {name} --namespace {namespace} -f {file}.yaml
```

Update report-config

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl statistics create report_config -n <namespace> -i report_config.yaml

# Get
f5xcctl statistics get report_config <name> -n <namespace>

# List
f5xcctl statistics list report_config -n <namespace>

# Delete
f5xcctl statistics delete report_config <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_report_config" "example" {
  name      = "example-report-config"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
