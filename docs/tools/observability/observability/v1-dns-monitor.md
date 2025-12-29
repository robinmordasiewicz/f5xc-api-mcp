---
page_title: f5xc_v1_dns_monitor - f5xc-api-mcp
subcategory: Observability
description: Create DNS Monitor.
---

# V1 DNS Monitor

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

List the set of v1_dns_monitor in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-v1-dns-monitor-create` | Create DNS Monitor. |
| `f5xc-api-observability-v1-dns-monitor-get` | GET DNS Monitor. |
| `f5xc-api-observability-v1-dns-monitor-list` | List DNS Monitor. |
| `f5xc-api-observability-v1-dns-monitor-update` | Replace DNS Monitor. |
| `f5xc-api-observability-v1-dns-monitor-delete` | DELETE DNS Monitor. |

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

- v1-dns-monitor

**Modifies:**

- v1-dns-monitor

**Deletes:**

- v1-dns-monitor
- contained_resources

## Example Usage

Ask Claude to help you work with V1 DNS Monitor resources:

### Create V1 DNS Monitor

> "Create a v1-dns-monitor named 'example' in the 'production' namespace"

### List V1 DNS Monitors

> "List all v1-dns-monitors in the 'production' namespace"

### Get V1 DNS Monitor Details

> "Get details of the v1-dns-monitor named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl observability v1-dns-monitor create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl observability v1-dns-monitor create {name} --namespace {namespace}
```

Create v1-dns-monitor

### delete

```bash
f5xcctl observability v1-dns-monitor delete {name} --namespace {namespace}
```

Delete v1-dns-monitor

### get_specific

```bash
f5xcctl observability v1-dns-monitor get {name} --namespace {namespace}
```

Get specific v1-dns-monitor

### list_all

```bash
f5xcctl observability v1-dns-monitor list --namespace {namespace}
```

List all v1-dns-monitors

### update

```bash
f5xcctl observability v1-dns-monitor update {name} --namespace {namespace} -f {file}.yaml
```

Update v1-dns-monitor

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl observability create v1_dns_monitor -n <namespace> -i v1_dns_monitor.yaml

# Get
f5xcctl observability get v1_dns_monitor <name> -n <namespace>

# List
f5xcctl observability list v1_dns_monitor -n <namespace>

# Delete
f5xcctl observability delete v1_dns_monitor <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_v1_dns_monitor" "example" {
  name      = "example-v1-dns-monitor"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
