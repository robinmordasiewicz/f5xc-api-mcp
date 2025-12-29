---
page_title: f5xc_receiver - f5xc-api-mcp
subcategory: Data Intelligence
description: Create Data Delivery.
---

# Receiver

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replaces the content of an Data Delivery object.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-dataintelligence-receiver-create` | Create Data Delivery. |
| `f5xc-api-dataintelligence-receiver-get` | GET Data Delivery. |
| `f5xc-api-dataintelligence-receiver-list` | List Data Delivery. |
| `f5xc-api-dataintelligence-receiver-update` | Replace Data Delivery. |
| `f5xc-api-dataintelligence-receiver-delete` | DELETE Data Delivery. |

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

- receiver

**Modifies:**

- receiver

**Deletes:**

- receiver
- contained_resources

## Example Usage

Ask Claude to help you work with Receiver resources:

### Create Receiver

> "Create a receiver named 'example' in the 'production' namespace"

### List Receivers

> "List all receivers in the 'production' namespace"

### Get Receiver Details

> "Get details of the receiver named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl data-intelligence receiver create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl data-intelligence receiver create {name} --namespace {namespace}
```

Create receiver

### delete

```bash
f5xcctl data-intelligence receiver delete {name} --namespace {namespace}
```

Delete receiver

### get_specific

```bash
f5xcctl data-intelligence receiver get {name} --namespace {namespace}
```

Get specific receiver

### list_all

```bash
f5xcctl data-intelligence receiver list --namespace {namespace}
```

List all receivers

### update

```bash
f5xcctl data-intelligence receiver update {name} --namespace {namespace} -f {file}.yaml
```

Update receiver

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl data_intelligence create receiver -n <namespace> -i receiver.yaml

# Get
f5xcctl data_intelligence get receiver <name> -n <namespace>

# List
f5xcctl data_intelligence list receiver -n <namespace>

# Delete
f5xcctl data_intelligence delete receiver <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_receiver" "example" {
  name      = "example-receiver"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
