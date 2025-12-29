---
page_title: f5xc_irule - f5xc-api-mcp
subcategory: BIG-IP Integration
description: Create iRule.
---

# Irule

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Create iRule in a given namespace. If one already exists it will give an error.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-bigip-irule-create` | Create iRule. |
| `f5xc-api-bigip-irule-get` | GET iRule |
| `f5xc-api-bigip-irule-list` | List Configure iRule. |
| `f5xc-api-bigip-irule-update` | Replace iRule. |
| `f5xc-api-bigip-irule-delete` | DELETE Configure iRule. |

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

- irule

**Modifies:**

- irule

**Deletes:**

- irule
- contained_resources

## Example Usage

Ask Claude to help you work with Irule resources:

### Create Irule

> "Create a irule named 'example' in the 'production' namespace"

### List Irules

> "List all irules in the 'production' namespace"

### Get Irule Details

> "Get details of the irule named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl config irule create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl config irule create {name} --namespace {namespace}
```

Create irule

### delete

```bash
f5xcctl config irule delete {name} --namespace {namespace}
```

Delete irule

### get_specific

```bash
f5xcctl config irule get {name} --namespace {namespace}
```

Get specific irule

### list_all

```bash
f5xcctl config irule list --namespace {namespace}
```

List all irules

### update

```bash
f5xcctl config irule update {name} --namespace {namespace} -f {file}.yaml
```

Update irule

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl bigip create irule -n <namespace> -i irule.yaml

# Get
f5xcctl bigip get irule <name> -n <namespace>

# List
f5xcctl bigip list irule -n <namespace>

# Delete
f5xcctl bigip delete irule <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_irule" "example" {
  name      = "example-irule"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
