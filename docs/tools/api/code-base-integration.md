---
page_title: f5xc_code_base_integration - f5xc-api-mcp
subcategory: API
description: CREATE Code Base Integration.
---

# Code Base Integration

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

List the set of code_base_integration in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-api-code-base-integration-create` | CREATE Code Base Integration. |
| `f5xc-api-api-code-base-integration-get` | GET Code Base Integration. |
| `f5xc-api-api-code-base-integration-list` | List Code Base Integration. |
| `f5xc-api-api-code-base-integration-update` | Replace Code Base Integration. |
| `f5xc-api-api-code-base-integration-delete` | DELETE Code Base Integration. |

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

- code-base-integration

**Modifies:**

- code-base-integration

**Deletes:**

- code-base-integration
- contained_resources

## Example Usage

Ask Claude to help you work with Code Base Integration resources:

### Create Code Base Integration

> "Create a code-base-integration named 'example' in the 'production' namespace"

### List Code Base Integrations

> "List all code-base-integrations in the 'production' namespace"

### Get Code Base Integration Details

> "Get details of the code-base-integration named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl config code-base-integration create {name} --namespace {namespace}
```

Create code-base-integration

### file_based

```bash
f5xcctl config code-base-integration create -f {file}.yaml
```

Create from YAML file

### delete

```bash
f5xcctl config code-base-integration delete {name} --namespace {namespace}
```

Delete code-base-integration

### get_specific

```bash
f5xcctl config code-base-integration get {name} --namespace {namespace}
```

Get specific code-base-integration

### list_all

```bash
f5xcctl config code-base-integration list --namespace {namespace}
```

List all code-base-integrations

### update

```bash
f5xcctl config code-base-integration update {name} --namespace {namespace} -f {file}.yaml
```

Update code-base-integration

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl api create code_base_integration -n <namespace> -i code_base_integration.yaml

# Get
f5xcctl api get code_base_integration <name> -n <namespace>

# List
f5xcctl api list code_base_integration -n <namespace>

# Delete
f5xcctl api delete code_base_integration <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_code_base_integration" "example" {
  name      = "example-code-base-integration"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
