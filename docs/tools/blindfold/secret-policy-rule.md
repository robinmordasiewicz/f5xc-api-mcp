---
page_title: f5xc_secret_policy_rule - f5xc-api-mcp
subcategory: Blindfold
description: Create Secret Policy Rule.
---

# Secret Policy Rule

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replace secret_policy_rule creates a new object in storage backend for metadata.namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-blindfold-secret-policy-rule-create` | Create Secret Policy Rule. |
| `f5xc-api-blindfold-secret-policy-rule-get` | GET Secret Policy Rule. |
| `f5xc-api-blindfold-secret-policy-rule-list` | List Secret Policy Rule. |
| `f5xc-api-blindfold-secret-policy-rule-update` | Replace Secret Policy Rule. |
| `f5xc-api-blindfold-secret-policy-rule-delete` | DELETE Secret Policy Rule. |

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

- secret-policy-rule

**Modifies:**

- secret-policy-rule

**Deletes:**

- secret-policy-rule
- contained_resources

## Example Usage

Ask Claude to help you work with Secret Policy Rule resources:

### Create Secret Policy Rule

> "Create a secret-policy-rule named 'example' in the 'production' namespace"

### List Secret Policy Rules

> "List all secret-policy-rules in the 'production' namespace"

### Get Secret Policy Rule Details

> "Get details of the secret-policy-rule named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl secret_management secret-policy-rule create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl secret_management secret-policy-rule create {name} --namespace {namespace}
```

Create secret-policy-rule

### delete

```bash
f5xcctl secret_management secret-policy-rule delete {name} --namespace {namespace}
```

Delete secret-policy-rule

### get_specific

```bash
f5xcctl secret_management secret-policy-rule get {name} --namespace {namespace}
```

Get specific secret-policy-rule

### list_all

```bash
f5xcctl secret_management secret-policy-rule list --namespace {namespace}
```

List all secret-policy-rules

### update

```bash
f5xcctl secret_management secret-policy-rule update {name} --namespace {namespace} -f {file}.yaml
```

Update secret-policy-rule

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl blindfold create secret_policy_rule -n <namespace> -i secret_policy_rule.yaml

# Get
f5xcctl blindfold get secret_policy_rule <name> -n <namespace>

# List
f5xcctl blindfold list secret_policy_rule -n <namespace>

# Delete
f5xcctl blindfold delete secret_policy_rule <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_secret_policy_rule" "example" {
  name      = "example-secret-policy-rule"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
