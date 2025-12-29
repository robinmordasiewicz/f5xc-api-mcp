---
page_title: f5xc_waf_exclusion_policy - f5xc-api-mcp
subcategory: WAF
description: Create WAF Exclusion Policy.
---

# WAF Exclusion Policy

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

List the set of waf_exclusion_policy in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-waf-waf-exclusion-policy-create` | Create WAF Exclusion Policy. |
| `f5xc-api-waf-waf-exclusion-policy-get` | GET WAF Exclusion Policy. |
| `f5xc-api-waf-waf-exclusion-policy-list` | List WAF Exclusion Policy. |
| `f5xc-api-waf-waf-exclusion-policy-update` | Replace WAF Exclusion Policy. |
| `f5xc-api-waf-waf-exclusion-policy-delete` | DELETE WAF Exclusion Policy. |

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

- waf-exclusion-policy

**Modifies:**

- waf-exclusion-policy

**Deletes:**

- waf-exclusion-policy
- contained_resources

## Example Usage

Ask Claude to help you work with WAF Exclusion Policy resources:

### Create WAF Exclusion Policy

> "Create a waf-exclusion-policy named 'example' in the 'production' namespace"

### List WAF Exclusion Policys

> "List all waf-exclusion-policys in the 'production' namespace"

### Get WAF Exclusion Policy Details

> "Get details of the waf-exclusion-policy named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl config waf-exclusion-policy create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl config waf-exclusion-policy create {name} --namespace {namespace}
```

Create waf-exclusion-policy

### delete

```bash
f5xcctl config waf-exclusion-policy delete {name} --namespace {namespace}
```

Delete waf-exclusion-policy

### get_specific

```bash
f5xcctl config waf-exclusion-policy get {name} --namespace {namespace}
```

Get specific waf-exclusion-policy

### list_all

```bash
f5xcctl config waf-exclusion-policy list --namespace {namespace}
```

List all waf-exclusion-policys

### update

```bash
f5xcctl config waf-exclusion-policy update {name} --namespace {namespace} -f {file}.yaml
```

Update waf-exclusion-policy

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl waf create waf_exclusion_policy -n <namespace> -i waf_exclusion_policy.yaml

# Get
f5xcctl waf get waf_exclusion_policy <name> -n <namespace>

# List
f5xcctl waf list waf_exclusion_policy -n <namespace>

# Delete
f5xcctl waf delete waf_exclusion_policy <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_waf_exclusion_policy" "example" {
  name      = "example-waf-exclusion-policy"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
