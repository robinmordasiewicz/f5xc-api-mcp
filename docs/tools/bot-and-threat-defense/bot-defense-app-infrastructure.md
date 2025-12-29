---
page_title: f5xc_bot_defense_app_infrastructure - f5xc-api-mcp
subcategory: Bot And Threat Defense
description: Create Bot Defense App Infrastructure.
---

# Bot Defense App Infrastructure

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replace a given Bot Defense App Infrastructure in a given namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-botandthreatdefense-bot-defense-app-infrastructure-create` | Create Bot Defense App Infrastructure. |
| `f5xc-api-botandthreatdefense-bot-defense-app-infrastructure-get` | Bot Defense App Infrastructure. |
| `f5xc-api-botandthreatdefense-bot-defense-app-infrastructure-list` | List Bot Defense App Infrastructure. |
| `f5xc-api-botandthreatdefense-bot-defense-app-infrastructure-update` | Replace Bot Defense App Infrastructure. |
| `f5xc-api-botandthreatdefense-bot-defense-app-infrastructure-delete` | DELETE Bot Defense App Infrastructure. |

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

- bot-defense-app-infrastructure

**Modifies:**

- bot-defense-app-infrastructure

**Deletes:**

- bot-defense-app-infrastructure
- contained_resources

## Example Usage

Ask Claude to help you work with Bot Defense App Infrastructure resources:

### Create Bot Defense App Infrastructure

> "Create a bot-defense-app-infrastructure named 'example' in the 'production' namespace"

### List Bot Defense App Infrastructures

> "List all bot-defense-app-infrastructures in the 'production' namespace"

### Get Bot Defense App Infrastructure Details

> "Get details of the bot-defense-app-infrastructure named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl config bot-defense-app-infrastructure create {name} --namespace {namespace}
```

Create bot-defense-app-infrastructure

### file_based

```bash
f5xcctl config bot-defense-app-infrastructure create -f {file}.yaml
```

Create from YAML file

### delete

```bash
f5xcctl config bot-defense-app-infrastructure delete {name} --namespace {namespace}
```

Delete bot-defense-app-infrastructure

### get_specific

```bash
f5xcctl config bot-defense-app-infrastructure get {name} --namespace {namespace}
```

Get specific bot-defense-app-infrastructure

### list_all

```bash
f5xcctl config bot-defense-app-infrastructure list --namespace {namespace}
```

List all bot-defense-app-infrastructures

### update

```bash
f5xcctl config bot-defense-app-infrastructure update {name} --namespace {namespace} -f {file}.yaml
```

Update bot-defense-app-infrastructure

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl bot_and_threat_defense create bot_defense_app_infrastructure -n <namespace> -i bot_defense_app_infrastructure.yaml

# Get
f5xcctl bot_and_threat_defense get bot_defense_app_infrastructure <name> -n <namespace>

# List
f5xcctl bot_and_threat_defense list bot_defense_app_infrastructure -n <namespace>

# Delete
f5xcctl bot_and_threat_defense delete bot_defense_app_infrastructure <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_bot_defense_app_infrastructure" "example" {
  name      = "example-bot-defense-app-infrastructure"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
