---
page_title: f5xc_alert_gen_policy - f5xc-api-mcp
subcategory: Shape
description: Create Alert Generation Policy.
---

# Alert Gen Policy

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replaces the content of an Alert Generation Policy object.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-alert-gen-policy-create` | Create Alert Generation Policy. |
| `f5xc-api-shape-alert-gen-policy-get` | GET Alert Generation Policy. |
| `f5xc-api-shape-alert-gen-policy-list` | List BRM Alert Generation Policy. |
| `f5xc-api-shape-alert-gen-policy-update` | Replace Alert Generation Policy. |
| `f5xc-api-shape-alert-gen-policy-delete` | DELETE BRM Alert Generation Policy. |

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

- alert-gen-policy

**Modifies:**

- alert-gen-policy

**Deletes:**

- alert-gen-policy
- contained_resources

## Example Usage

Ask Claude to help you work with Alert Gen Policy resources:

### Create Alert Gen Policy

> "Create a alert-gen-policy named 'example' in the 'production' namespace"

### List Alert Gen Policys

> "List all alert-gen-policys in the 'production' namespace"

### Get Alert Gen Policy Details

> "Get details of the alert-gen-policy named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl shape alert-gen-policy create {name} --namespace {namespace}
```

Create alert-gen-policy

### file_based

```bash
f5xcctl shape alert-gen-policy create -f {file}.yaml
```

Create from YAML file

### delete

```bash
f5xcctl shape alert-gen-policy delete {name} --namespace {namespace}
```

Delete alert-gen-policy

### get_specific

```bash
f5xcctl shape alert-gen-policy get {name} --namespace {namespace}
```

Get specific alert-gen-policy

### list_all

```bash
f5xcctl shape alert-gen-policy list --namespace {namespace}
```

List all alert-gen-policys

### update

```bash
f5xcctl shape alert-gen-policy update {name} --namespace {namespace} -f {file}.yaml
```

Update alert-gen-policy

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create alert_gen_policy -n <namespace> -i alert_gen_policy.yaml

# Get
f5xcctl shape get alert_gen_policy <name> -n <namespace>

# List
f5xcctl shape list alert_gen_policy -n <namespace>

# Delete
f5xcctl shape delete alert_gen_policy <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_alert_gen_policy" "example" {
  name      = "example-alert-gen-policy"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
