---
page_title: f5xc_infraprotect_firewall_rule_group - f5xc-api-mcp
subcategory: Ddos
description: Replace DDoS transit Firewall Rule Group.
---

# Infraprotect Firewall Rule Group

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

List the set of infraprotect_firewall_rule_group in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-ddos-infraprotect-firewall-rule-group-create` | Replace DDoS transit Firewall Rule Group. |
| `f5xc-api-ddos-infraprotect-firewall-rule-group-get` | GET Infraprotect Firewall Rule Group. |
| `f5xc-api-ddos-infraprotect-firewall-rule-group-list` | List Infraprotect Firewall Rule Group. |
| `f5xc-api-ddos-infraprotect-firewall-rule-group-update` | Replace DDoS transit Firewall Rule Group. |
| `f5xc-api-ddos-infraprotect-firewall-rule-group-delete` | DELETE Infraprotect Firewall Rule Group. |

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

- infraprotect-firewall-rule-group

**Modifies:**

- infraprotect-firewall-rule-group

**Deletes:**

- infraprotect-firewall-rule-group
- contained_resources

## Example Usage

Ask Claude to help you work with Infraprotect Firewall Rule Group resources:

### Create Infraprotect Firewall Rule Group

> "Create a infraprotect-firewall-rule-group named 'example' in the 'production' namespace"

### List Infraprotect Firewall Rule Groups

> "List all infraprotect-firewall-rule-groups in the 'production' namespace"

### Get Infraprotect Firewall Rule Group Details

> "Get details of the infraprotect-firewall-rule-group named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl infraprotect infraprotect-firewall-rule-group create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl infraprotect infraprotect-firewall-rule-group create {name} --namespace {namespace}
```

Create infraprotect-firewall-rule-group

### delete

```bash
f5xcctl infraprotect infraprotect-firewall-rule-group delete {name} --namespace {namespace}
```

Delete infraprotect-firewall-rule-group

### get_specific

```bash
f5xcctl infraprotect infraprotect-firewall-rule-group get {name} --namespace {namespace}
```

Get specific infraprotect-firewall-rule-group

### list_all

```bash
f5xcctl infraprotect infraprotect-firewall-rule-group list --namespace {namespace}
```

List all infraprotect-firewall-rule-groups

### update

```bash
f5xcctl infraprotect infraprotect-firewall-rule-group update {name} --namespace {namespace} -f {file}.yaml
```

Update infraprotect-firewall-rule-group

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl ddos create infraprotect_firewall_rule_group -n <namespace> -i infraprotect_firewall_rule_group.yaml

# Get
f5xcctl ddos get infraprotect_firewall_rule_group <name> -n <namespace>

# List
f5xcctl ddos list infraprotect_firewall_rule_group -n <namespace>

# Delete
f5xcctl ddos delete infraprotect_firewall_rule_group <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_infraprotect_firewall_rule_group" "example" {
  name      = "example-infraprotect-firewall-rule-group"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
