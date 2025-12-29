---
page_title: f5xc_bot_endpoint_policy - f5xc-api-mcp
subcategory: Shape
description: GET Bot Endpoint Policy.
---

# Bot Endpoint Policy

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

List the set of bot_endpoint_policy in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-bot-endpoint-policy-get` | GET Bot Endpoint Policy. |
| `f5xc-api-shape-bot-endpoint-policy-list` | List Bot Endpoint Policy. |
| `f5xc-api-shape-bot-endpoint-policy-update` | Custom Replace Bot Endpoint Policy. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Name` |
| `namespace` | Namespace | `Ns1` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. | `Env in (staging, testing), tier in (web, db)` |
| `report_fields` | The report_fields parameter | `-` |
| `report_status_fields` | The report_status_fields parameter | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Modifies:**

- bot-endpoint-policy

## Example Usage

Ask Claude to help you work with Bot Endpoint Policy resources:

### List Bot Endpoint Policys

> "List all bot-endpoint-policys in the 'production' namespace"

### Get Bot Endpoint Policy Details

> "Get details of the bot-endpoint-policy named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### get_specific

```bash
f5xcctl shape bot-endpoint-policy get {name} --namespace {namespace}
```

Get specific bot-endpoint-policy

### list_all

```bash
f5xcctl shape bot-endpoint-policy list --namespace {namespace}
```

List all bot-endpoint-policys

### update

```bash
f5xcctl shape bot-endpoint-policy update {name} --namespace {namespace} -f {file}.yaml
```

Update bot-endpoint-policy

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create bot_endpoint_policy -n <namespace> -i bot_endpoint_policy.yaml

# Get
f5xcctl shape get bot_endpoint_policy <name> -n <namespace>

# List
f5xcctl shape list bot_endpoint_policy -n <namespace>

# Delete
f5xcctl shape delete bot_endpoint_policy <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_bot_endpoint_policy" "example" {
  name      = "example-bot-endpoint-policy"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
