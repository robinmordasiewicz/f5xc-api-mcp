---
page_title: f5xc_infraprotect_deny_list_rule - f5xc-api-mcp
subcategory: Ddos
description: Create DDoS transit Deny List Rule.
---

# Infraprotect Deny List Rule

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

List the set of infraprotect_deny_list_rule in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-ddos-infraprotect-deny-list-rule-create` | Create DDoS transit Deny List Rule. |
| `f5xc-api-ddos-infraprotect-deny-list-rule-get` | GET Infraprotect Deny List Rule. |
| `f5xc-api-ddos-infraprotect-deny-list-rule-list` | List Infraprotect Deny List Rule. |
| `f5xc-api-ddos-infraprotect-deny-list-rule-update` | Replace DDoS transit Deny List Rule. |
| `f5xc-api-ddos-infraprotect-deny-list-rule-delete` | DELETE Infraprotect Deny List Rule. |

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

- infraprotect-deny-list-rule

**Modifies:**

- infraprotect-deny-list-rule

**Deletes:**

- infraprotect-deny-list-rule
- contained_resources

## Example Usage

Ask Claude to help you work with Infraprotect Deny List Rule resources:

### Create Infraprotect Deny List Rule

> "Create a infraprotect-deny-list-rule named 'example' in the 'production' namespace"

### List Infraprotect Deny List Rules

> "List all infraprotect-deny-list-rules in the 'production' namespace"

### Get Infraprotect Deny List Rule Details

> "Get details of the infraprotect-deny-list-rule named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl infraprotect infraprotect-deny-list-rule create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl infraprotect infraprotect-deny-list-rule create {name} --namespace {namespace}
```

Create infraprotect-deny-list-rule

### delete

```bash
f5xcctl infraprotect infraprotect-deny-list-rule delete {name} --namespace {namespace}
```

Delete infraprotect-deny-list-rule

### get_specific

```bash
f5xcctl infraprotect infraprotect-deny-list-rule get {name} --namespace {namespace}
```

Get specific infraprotect-deny-list-rule

### list_all

```bash
f5xcctl infraprotect infraprotect-deny-list-rule list --namespace {namespace}
```

List all infraprotect-deny-list-rules

### update

```bash
f5xcctl infraprotect infraprotect-deny-list-rule update {name} --namespace {namespace} -f {file}.yaml
```

Update infraprotect-deny-list-rule

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl ddos create infraprotect_deny_list_rule -n <namespace> -i infraprotect_deny_list_rule.yaml

# Get
f5xcctl ddos get infraprotect_deny_list_rule <name> -n <namespace>

# List
f5xcctl ddos list infraprotect_deny_list_rule -n <namespace>

# Delete
f5xcctl ddos delete infraprotect_deny_list_rule <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_infraprotect_deny_list_rule" "example" {
  name      = "example-infraprotect-deny-list-rule"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
