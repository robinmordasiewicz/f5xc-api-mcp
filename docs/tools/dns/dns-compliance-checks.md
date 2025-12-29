---
page_title: f5xc_dns_compliance_checks - f5xc-api-mcp
subcategory: DNS
description: Create DNS Compliance Checks.
---

# DNS Compliance Checks

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Create DNS Compliance Checks Specification in a given namespace. If one already exists it will give
an error.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-dns-dns-compliance-checks-create` | Create DNS Compliance Checks. |
| `f5xc-api-dns-dns-compliance-checks-get` | GET DNS Compliance Checks. |
| `f5xc-api-dns-dns-compliance-checks-list` | List Configure DNS Compliance Checks. |
| `f5xc-api-dns-dns-compliance-checks-update` | Replace DNS Compliance Checks. |
| `f5xc-api-dns-dns-compliance-checks-delete` | DELETE Configure DNS Compliance Checks. |

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

- dns-compliance-checks

**Modifies:**

- dns-compliance-checks

**Deletes:**

- dns-compliance-checks
- contained_resources

## Example Usage

Ask Claude to help you work with DNS Compliance Checks resources:

### Create DNS Compliance Checks

> "Create a dns-compliance-checks named 'example' in the 'production' namespace"

### List DNS Compliance Checkss

> "List all dns-compliance-checkss in the 'production' namespace"

### Get DNS Compliance Checks Details

> "Get details of the dns-compliance-checks named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl config dns-compliance-checks create {name} --namespace {namespace}
```

Create dns-compliance-checks

### file_based

```bash
f5xcctl config dns-compliance-checks create -f {file}.yaml
```

Create from YAML file

### delete

```bash
f5xcctl config dns-compliance-checks delete {name} --namespace {namespace}
```

Delete dns-compliance-checks

### get_specific

```bash
f5xcctl config dns-compliance-checks get {name} --namespace {namespace}
```

Get specific dns-compliance-checks

### list_all

```bash
f5xcctl config dns-compliance-checks list --namespace {namespace}
```

List all dns-compliance-checkss

### update

```bash
f5xcctl config dns-compliance-checks update {name} --namespace {namespace} -f {file}.yaml
```

Update dns-compliance-checks

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl dns create dns_compliance_checks -n <namespace> -i dns_compliance_checks.yaml

# Get
f5xcctl dns get dns_compliance_checks <name> -n <namespace>

# List
f5xcctl dns list dns_compliance_checks -n <namespace>

# Delete
f5xcctl dns delete dns_compliance_checks <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_dns_compliance_checks" "example" {
  name      = "example-dns-compliance-checks"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
