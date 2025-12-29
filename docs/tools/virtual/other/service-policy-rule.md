---
page_title: f5xc_service_policy_rule - f5xc-api-mcp
subcategory: Virtual
description: Create Service Policy Rule.
---

# Service Policy Rule

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replace service_policy_rule replaces an existing object in the storage backend for
metadata.namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-virtual-service-policy-rule-create` | Create Service Policy Rule. |
| `f5xc-api-virtual-service-policy-rule-get` | GET Service Policy Rule. |
| `f5xc-api-virtual-service-policy-rule-list` | List Service Policy Rule. |
| `f5xc-api-virtual-service-policy-rule-update` | Replace Service Policy Rule. |
| `f5xc-api-virtual-service-policy-rule-delete` | DELETE Service Policy Rule. |

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

- service-policy-rule

**Modifies:**

- service-policy-rule

**Deletes:**

- service-policy-rule
- contained_resources

## Example Usage

Ask Claude to help you work with Service Policy Rule resources:

### Create Service Policy Rule

> "Create a service-policy-rule named 'example' in the 'production' namespace"

### List Service Policy Rules

> "List all service-policy-rules in the 'production' namespace"

### Get Service Policy Rule Details

> "Get details of the service-policy-rule named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl config service-policy-rule create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl config service-policy-rule create {name} --namespace {namespace}
```

Create service-policy-rule

### delete

```bash
f5xcctl config service-policy-rule delete {name} --namespace {namespace}
```

Delete service-policy-rule

### get_specific

```bash
f5xcctl config service-policy-rule get {name} --namespace {namespace}
```

Get specific service-policy-rule

### list_all

```bash
f5xcctl config service-policy-rule list --namespace {namespace}
```

List all service-policy-rules

### update

```bash
f5xcctl config service-policy-rule update {name} --namespace {namespace} -f {file}.yaml
```

Update service-policy-rule

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl virtual create service_policy_rule -n <namespace> -i service_policy_rule.yaml

# Get
f5xcctl virtual get service_policy_rule <name> -n <namespace>

# List
f5xcctl virtual list service_policy_rule -n <namespace>

# Delete
f5xcctl virtual delete service_policy_rule <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_service_policy_rule" "example" {
  name      = "example-service-policy-rule"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
