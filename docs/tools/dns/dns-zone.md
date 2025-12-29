---
page_title: f5xc_dns_zone - f5xc-api-mcp
subcategory: DNS
description: Create DNS Zone.
---

# DNS Zone

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Create DNS Zone in a given namespace. If one already exist it will give a error.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-dns-dns-zone-create` | Create DNS Zone. |
| `f5xc-api-dns-dns-zone-get` | GET DNS Zone. |
| `f5xc-api-dns-dns-zone-list` | List DNS Zone. |
| `f5xc-api-dns-dns-zone-update` | Replace DNS Zone. |
| `f5xc-api-dns-dns-zone-delete` | DELETE DNS Zone. |

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

- dns-zone

**Modifies:**

- dns-zone

**Deletes:**

- dns-zone
- contained_resources

## Example Usage

Ask Claude to help you work with DNS Zone resources:

### Create DNS Zone

> "Create a dns-zone named 'example' in the 'production' namespace"

### List DNS Zones

> "List all dns-zones in the 'production' namespace"

### Get DNS Zone Details

> "Get details of the dns-zone named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl config dns-zone create {name} --namespace {namespace}
```

Create dns-zone

### file_based

```bash
f5xcctl config dns-zone create -f {file}.yaml
```

Create from YAML file

### delete

```bash
f5xcctl config dns-zone delete {name} --namespace {namespace}
```

Delete dns-zone

### get_specific

```bash
f5xcctl config dns-zone get {name} --namespace {namespace}
```

Get specific dns-zone

### list_all

```bash
f5xcctl config dns-zone list --namespace {namespace}
```

List all dns-zones

### update

```bash
f5xcctl config dns-zone update {name} --namespace {namespace} -f {file}.yaml
```

Update dns-zone

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl dns create dns_zone -n <namespace> -i dns_zone.yaml

# Get
f5xcctl dns get dns_zone <name> -n <namespace>

# List
f5xcctl dns list dns_zone -n <namespace>

# Delete
f5xcctl dns delete dns_zone <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_dns_zone" "example" {
  name      = "example-dns-zone"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
