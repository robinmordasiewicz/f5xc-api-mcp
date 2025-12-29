---
page_title: f5xc_app_firewall - f5xc-api-mcp
subcategory: WAF
description: Create Application Firewall.
---

# App Firewall

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

List the set of app_firewall in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-waf-app-firewall-create` | Create Application Firewall. |
| `f5xc-api-waf-app-firewall-get` | GET Application Firewall. |
| `f5xc-api-waf-app-firewall-list` | List Application Firewall. |
| `f5xc-api-waf-app-firewall-update` | Replace Application Firewall. |
| `f5xc-api-waf-app-firewall-delete` | DELETE Application Firewall. |

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

- app-firewall

**Modifies:**

- app-firewall

**Deletes:**

- app-firewall
- contained_resources

## Example Usage

Ask Claude to help you work with App Firewall resources:

### Create App Firewall

> "Create a app-firewall named 'example' in the 'production' namespace"

### List App Firewalls

> "List all app-firewalls in the 'production' namespace"

### Get App Firewall Details

> "Get details of the app-firewall named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl config app-firewall create {name} --namespace {namespace}
```

Create app-firewall

### file_based

```bash
f5xcctl config app-firewall create -f {file}.yaml
```

Create from YAML file

### delete

```bash
f5xcctl config app-firewall delete {name} --namespace {namespace}
```

Delete app-firewall

### get_specific

```bash
f5xcctl config app-firewall get {name} --namespace {namespace}
```

Get specific app-firewall

### list_all

```bash
f5xcctl config app-firewall list --namespace {namespace}
```

List all app-firewalls

### update

```bash
f5xcctl config app-firewall update {name} --namespace {namespace} -f {file}.yaml
```

Update app-firewall

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl waf create app_firewall -n <namespace> -i app_firewall.yaml

# Get
f5xcctl waf get app_firewall <name> -n <namespace>

# List
f5xcctl waf list app_firewall -n <namespace>

# Delete
f5xcctl waf delete app_firewall <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_app_firewall" "example" {
  name      = "example-app-firewall"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
