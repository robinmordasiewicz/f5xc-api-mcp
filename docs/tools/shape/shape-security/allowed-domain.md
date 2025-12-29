---
page_title: f5xc_allowed_domain - f5xc-api-mcp
subcategory: Shape
description: Create Allowed Domain.
---

# Allowed Domain

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

List the set of allowed_domain in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-allowed-domain-create` | Create Allowed Domain. |
| `f5xc-api-shape-allowed-domain-get` | GET Allowed Domain. |
| `f5xc-api-shape-allowed-domain-list` | List Client-Side Defense Allowed Domain. |
| `f5xc-api-shape-allowed-domain-delete` | DELETE Client-Side Defense Allowed Domain. |

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

- allowed-domain

**Deletes:**

- allowed-domain
- contained_resources

## Example Usage

Ask Claude to help you work with Allowed Domain resources:

### Create Allowed Domain

> "Create a allowed-domain named 'example' in the 'production' namespace"

### List Allowed Domains

> "List all allowed-domains in the 'production' namespace"

### Get Allowed Domain Details

> "Get details of the allowed-domain named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl shape allowed-domain create {name} --namespace {namespace}
```

Create allowed-domain

### file_based

```bash
f5xcctl shape allowed-domain create -f {file}.yaml
```

Create from YAML file

### delete

```bash
f5xcctl shape allowed-domain delete {name} --namespace {namespace}
```

Delete allowed-domain

### get_specific

```bash
f5xcctl shape allowed-domain get {name} --namespace {namespace}
```

Get specific allowed-domain

### list_all

```bash
f5xcctl shape allowed-domain list --namespace {namespace}
```

List all allowed-domains

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create allowed_domain -n <namespace> -i allowed_domain.yaml

# Get
f5xcctl shape get allowed_domain <name> -n <namespace>

# List
f5xcctl shape list allowed_domain -n <namespace>

# Delete
f5xcctl shape delete allowed_domain <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_allowed_domain" "example" {
  name      = "example-allowed-domain"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
