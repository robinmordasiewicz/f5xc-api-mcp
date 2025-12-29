---
page_title: f5xc_bot_detection_rule - f5xc-api-mcp
subcategory: Shape
description: Deploy Bot Detection Rules.
---

# Bot Detection Rule

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

List the set of bot_detection_rule in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-bot-detection-rule-create` | Deploy Bot Detection Rules. |
| `f5xc-api-shape-bot-detection-rule-get` | GET Bot Detection Rule. |
| `f5xc-api-shape-bot-detection-rule-list` | List Bot Detection Rule. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |
| `name` | Name | `Name` |

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

- bot-detection-rule

## Example Usage

Ask Claude to help you work with Bot Detection Rule resources:

### Create Bot Detection Rule

> "Create a bot-detection-rule named 'example' in the 'production' namespace"

### List Bot Detection Rules

> "List all bot-detection-rules in the 'production' namespace"

### Get Bot Detection Rule Details

> "Get details of the bot-detection-rule named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl shape bot-detection-rule create {name} --namespace {namespace}
```

Create bot-detection-rule

### file_based

```bash
f5xcctl shape bot-detection-rule create -f {file}.yaml
```

Create from YAML file

### get_specific

```bash
f5xcctl shape bot-detection-rule get {name} --namespace {namespace}
```

Get specific bot-detection-rule

### list_all

```bash
f5xcctl shape bot-detection-rule list --namespace {namespace}
```

List all bot-detection-rules

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create bot_detection_rule -n <namespace> -i bot_detection_rule.yaml

# Get
f5xcctl shape get bot_detection_rule <name> -n <namespace>

# List
f5xcctl shape list bot_detection_rule -n <namespace>

# Delete
f5xcctl shape delete bot_detection_rule <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_bot_detection_rule" "example" {
  name      = "example-bot-detection-rule"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
