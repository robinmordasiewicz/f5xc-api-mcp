---
page_title: f5xc_protected_domain - f5xc-api-mcp
subcategory: Shape
description: Create Domain to protect.
---

# Protected Domain

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

List the set of protected_domain in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-protected-domain-create` | Create Domain to protect. |
| `f5xc-api-shape-protected-domain-get` | GET Protected Domain. |
| `f5xc-api-shape-protected-domain-list` | List Client-Side Defense Domain to Protect. |
| `f5xc-api-shape-protected-domain-delete` | DELETE Client-Side Defense Domain to Protect. |

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

- protected-domain

**Deletes:**

- protected-domain
- contained_resources

## Example Usage

Ask Claude to help you work with Protected Domain resources:

### Create Protected Domain

> "Create a protected-domain named 'example' in the 'production' namespace"

### List Protected Domains

> "List all protected-domains in the 'production' namespace"

### Get Protected Domain Details

> "Get details of the protected-domain named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl shape protected-domain create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl shape protected-domain create {name} --namespace {namespace}
```

Create protected-domain

### delete

```bash
f5xcctl shape protected-domain delete {name} --namespace {namespace}
```

Delete protected-domain

### get_specific

```bash
f5xcctl shape protected-domain get {name} --namespace {namespace}
```

Get specific protected-domain

### list_all

```bash
f5xcctl shape protected-domain list --namespace {namespace}
```

List all protected-domains

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create protected_domain -n <namespace> -i protected_domain.yaml

# Get
f5xcctl shape get protected_domain <name> -n <namespace>

# List
f5xcctl shape list protected_domain -n <namespace>

# Delete
f5xcctl shape delete protected_domain <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_protected_domain" "example" {
  name      = "example-protected-domain"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
