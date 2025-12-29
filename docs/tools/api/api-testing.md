---
page_title: f5xc_api_testing - f5xc-api-mcp
subcategory: API
description: Create API Testing.
---

# API Testing

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

List the set of api_testing in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-api-api-testing-create` | Create API Testing. |
| `f5xc-api-api-api-testing-get` | GET API testing. |
| `f5xc-api-api-api-testing-list` | List API Testing. |
| `f5xc-api-api-api-testing-update` | Replace API testing. |
| `f5xc-api-api-api-testing-delete` | DELETE API Testing. |

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

- api-testing

**Modifies:**

- api-testing

**Deletes:**

- api-testing
- contained_resources

## Example Usage

Ask Claude to help you work with API Testing resources:

### Create API Testing

> "Create a api-testing named 'example' in the 'production' namespace"

### List API Testings

> "List all api-testings in the 'production' namespace"

### Get API Testing Details

> "Get details of the api-testing named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl config api-testing create {name} --namespace {namespace}
```

Create api-testing

### file_based

```bash
f5xcctl config api-testing create -f {file}.yaml
```

Create from YAML file

### delete

```bash
f5xcctl config api-testing delete {name} --namespace {namespace}
```

Delete api-testing

### get_specific

```bash
f5xcctl config api-testing get {name} --namespace {namespace}
```

Get specific api-testing

### list_all

```bash
f5xcctl config api-testing list --namespace {namespace}
```

List all api-testings

### update

```bash
f5xcctl config api-testing update {name} --namespace {namespace} -f {file}.yaml
```

Update api-testing

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl api create api_testing -n <namespace> -i api_testing.yaml

# Get
f5xcctl api get api_testing <name> -n <namespace>

# List
f5xcctl api list api_testing -n <namespace>

# Delete
f5xcctl api delete api_testing <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_api_testing" "example" {
  name      = "example-api-testing"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
