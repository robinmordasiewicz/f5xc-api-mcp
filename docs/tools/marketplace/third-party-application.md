---
page_title: f5xc_third_party_application - f5xc-api-mcp
subcategory: Marketplace
description: GET Third Party Application.
---

# Third Party Application

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

List the set of third_party_application in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-marketplace-third-party-application-get` | GET Third Party Application. |
| `f5xc-api-marketplace-third-party-application-list` | List Third Party Application. |
| `f5xc-api-marketplace-third-party-application-update` | Replace Third Party Applicationr. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Name` |
| `namespace` | Namespace | `Ns1` |
| `metadata.name` | Name | `Example-corp-web.` |
| `metadata.namespace` | Namespace | `Staging` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. | `Env in (staging, testing), tier in (web, db)` |
| `report_fields` | The report_fields parameter | `-` |
| `report_status_fields` | The report_status_fields parameter | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Modifies:**

- third-party-application

## Example Usage

Ask Claude to help you work with Third Party Application resources:

### List Third Party Applications

> "List all third-party-applications in the 'production' namespace"

### Get Third Party Application Details

> "Get details of the third-party-application named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### get_specific

```bash
f5xcctl config third-party-application get {name} --namespace {namespace}
```

Get specific third-party-application

### list_all

```bash
f5xcctl config third-party-application list --namespace {namespace}
```

List all third-party-applications

### update

```bash
f5xcctl config third-party-application update {name} --namespace {namespace} -f {file}.yaml
```

Update third-party-application

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl marketplace create third_party_application -n <namespace> -i third_party_application.yaml

# Get
f5xcctl marketplace get third_party_application <name> -n <namespace>

# List
f5xcctl marketplace list third_party_application -n <namespace>

# Delete
f5xcctl marketplace delete third_party_application <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_third_party_application" "example" {
  name      = "example-third-party-application"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
