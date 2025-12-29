---
page_title: f5xc_alert_receiver - f5xc-api-mcp
subcategory: Statistics
description: Create Alert Receiver.
---

# Alert Receiver

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replaces the content of an Alert Receiver object.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-statistics-alert-receiver-create` | Create Alert Receiver. |
| `f5xc-api-statistics-alert-receiver-get` | GET Alert Receiver. |
| `f5xc-api-statistics-alert-receiver-list` | List Alert Receiver. |
| `f5xc-api-statistics-alert-receiver-update` | Replace Alert Receiver. |
| `f5xc-api-statistics-alert-receiver-delete` | DELETE Alert Receiver. |

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

- alert-receiver

**Modifies:**

- alert-receiver

**Deletes:**

- alert-receiver
- contained_resources

## Example Usage

Ask Claude to help you work with Alert Receiver resources:

### Create Alert Receiver

> "Create a alert-receiver named 'example' in the 'production' namespace"

### List Alert Receivers

> "List all alert-receivers in the 'production' namespace"

### Get Alert Receiver Details

> "Get details of the alert-receiver named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl config alert-receiver create {name} --namespace {namespace}
```

Create alert-receiver

### file_based

```bash
f5xcctl config alert-receiver create -f {file}.yaml
```

Create from YAML file

### delete

```bash
f5xcctl config alert-receiver delete {name} --namespace {namespace}
```

Delete alert-receiver

### get_specific

```bash
f5xcctl config alert-receiver get {name} --namespace {namespace}
```

Get specific alert-receiver

### list_all

```bash
f5xcctl config alert-receiver list --namespace {namespace}
```

List all alert-receivers

### update

```bash
f5xcctl config alert-receiver update {name} --namespace {namespace} -f {file}.yaml
```

Update alert-receiver

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl statistics create alert_receiver -n <namespace> -i alert_receiver.yaml

# Get
f5xcctl statistics get alert_receiver <name> -n <namespace>

# List
f5xcctl statistics list alert_receiver -n <namespace>

# Delete
f5xcctl statistics delete alert_receiver <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_alert_receiver" "example" {
  name      = "example-alert-receiver"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
