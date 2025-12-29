---
page_title: f5xc_mitigated_domain - f5xc-api-mcp
subcategory: Shape
description: Create Mitigated Domain.
---

# Mitigated Domain

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

List the set of mitigated_domain in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-mitigated-domain-create` | Create Mitigated Domain. |
| `f5xc-api-shape-mitigated-domain-get` | GET Mitigated Domain. |
| `f5xc-api-shape-mitigated-domain-list` | List Client-Side Defense Mitigated Domain. |
| `f5xc-api-shape-mitigated-domain-delete` | DELETE Client-Side Defense Mitigated Domain. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `metadata.namespace` | Namespace | `Staging` |
| `name` | Name | `Name` |
| `namespace` | Namespace | `Ns1` |

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

- mitigated-domain

**Deletes:**

- mitigated-domain
- contained_resources

## Example Usage

Ask Claude to help you work with Mitigated Domain resources:

### Create Mitigated Domain

> "Create a mitigated-domain named 'example' in the 'production' namespace"

### List Mitigated Domains

> "List all mitigated-domains in the 'production' namespace"

### Get Mitigated Domain Details

> "Get details of the mitigated-domain named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl shape mitigated-domain create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl shape mitigated-domain create {name} --namespace {namespace}
```

Create mitigated-domain

### delete

```bash
f5xcctl shape mitigated-domain delete {name} --namespace {namespace}
```

Delete mitigated-domain

### get_specific

```bash
f5xcctl shape mitigated-domain get {name} --namespace {namespace}
```

Get specific mitigated-domain

### list_all

```bash
f5xcctl shape mitigated-domain list --namespace {namespace}
```

List all mitigated-domains

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create mitigated_domain -n <namespace> -i mitigated_domain.yaml

# Get
f5xcctl shape get mitigated_domain <name> -n <namespace>

# List
f5xcctl shape list mitigated_domain -n <namespace>

# Delete
f5xcctl shape delete mitigated_domain <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_mitigated_domain" "example" {
  name      = "example-mitigated-domain"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
