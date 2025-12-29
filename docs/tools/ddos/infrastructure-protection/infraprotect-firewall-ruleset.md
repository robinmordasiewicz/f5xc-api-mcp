---
page_title: f5xc_infraprotect_firewall_ruleset - f5xc-api-mcp
subcategory: Ddos
description: GET Infraprotect Firewall Ruleset.
---

# Infraprotect Firewall Ruleset

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

List the set of infraprotect_firewall_ruleset in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-ddos-infraprotect-firewall-ruleset-get` | GET Infraprotect Firewall Ruleset. |
| `f5xc-api-ddos-infraprotect-firewall-ruleset-list` | List Infraprotect Firewall Ruleset. |
| `f5xc-api-ddos-infraprotect-firewall-ruleset-update` | Replace DDoS transit Firewall Ruleset. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Name` |
| `namespace` | Namespace | `Ns1` |
| `metadata.name` | Name | `Example-corp-web.` |
| `metadata.namespace` | Namespace | `Staging` |

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

- infraprotect-firewall-ruleset

## Example Usage

Ask Claude to help you work with Infraprotect Firewall Ruleset resources:

### List Infraprotect Firewall Rulesets

> "List all infraprotect-firewall-rulesets in the 'production' namespace"

### Get Infraprotect Firewall Ruleset Details

> "Get details of the infraprotect-firewall-ruleset named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### get_specific

```bash
f5xcctl infraprotect infraprotect-firewall-ruleset get {name} --namespace {namespace}
```

Get specific infraprotect-firewall-ruleset

### list_all

```bash
f5xcctl infraprotect infraprotect-firewall-ruleset list --namespace {namespace}
```

List all infraprotect-firewall-rulesets

### update

```bash
f5xcctl infraprotect infraprotect-firewall-ruleset update {name} --namespace {namespace} -f {file}.yaml
```

Update infraprotect-firewall-ruleset

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl ddos create infraprotect_firewall_ruleset -n <namespace> -i infraprotect_firewall_ruleset.yaml

# Get
f5xcctl ddos get infraprotect_firewall_ruleset <name> -n <namespace>

# List
f5xcctl ddos list infraprotect_firewall_ruleset -n <namespace>

# Delete
f5xcctl ddos delete infraprotect_firewall_ruleset <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_infraprotect_firewall_ruleset" "example" {
  name      = "example-infraprotect-firewall-ruleset"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
