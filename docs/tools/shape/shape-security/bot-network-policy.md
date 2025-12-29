---
page_title: f5xc_bot_network_policy - f5xc-api-mcp
subcategory: Shape
description: GET Bot network Policy.
---

# Bot Network Policy

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

List the set of bot_network_policy in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-bot-network-policy-get` | GET Bot network Policy. |
| `f5xc-api-shape-bot-network-policy-list` | List Bot network Policy. |
| `f5xc-api-shape-bot-network-policy-update` | Custom Replace Bot network Policy. |

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

- bot-network-policy

## Example Usage

Ask Claude to help you work with Bot Network Policy resources:

### List Bot Network Policys

> "List all bot-network-policys in the 'production' namespace"

### Get Bot Network Policy Details

> "Get details of the bot-network-policy named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### get_specific

```bash
f5xcctl shape bot-network-policy get {name} --namespace {namespace}
```

Get specific bot-network-policy

### list_all

```bash
f5xcctl shape bot-network-policy list --namespace {namespace}
```

List all bot-network-policys

### update

```bash
f5xcctl shape bot-network-policy update {name} --namespace {namespace} -f {file}.yaml
```

Update bot-network-policy

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create bot_network_policy -n <namespace> -i bot_network_policy.yaml

# Get
f5xcctl shape get bot_network_policy <name> -n <namespace>

# List
f5xcctl shape list bot_network_policy -n <namespace>

# Delete
f5xcctl shape delete bot_network_policy <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_bot_network_policy" "example" {
  name      = "example-bot-network-policy"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
