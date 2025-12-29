---
page_title: f5xc_cloud_credentials - f5xc-api-mcp
subcategory: Cloud Infrastructure
description: Create Cloud Credentials.
---

# Cloud Credentials

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

List the set of cloud_credentials in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cloudinfrastructure-cloud-credentials-create` | Create Cloud Credentials. |
| `f5xc-api-cloudinfrastructure-cloud-credentials-get` | GET Cloud Credentials. |
| `f5xc-api-cloudinfrastructure-cloud-credentials-list` | List Cloud Credentials. |
| `f5xc-api-cloudinfrastructure-cloud-credentials-update` | Replace Cloud Credentials. |
| `f5xc-api-cloudinfrastructure-cloud-credentials-delete` | DELETE Cloud Credentials. |

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

- cloud-credentials

**Modifies:**

- cloud-credentials

**Deletes:**

- cloud-credentials
- contained_resources

## Example Usage

Ask Claude to help you work with Cloud Credentials resources:

### Create Cloud Credentials

> "Create a cloud-credentials named 'example' in the 'production' namespace"

### List Cloud Credentialss

> "List all cloud-credentialss in the 'production' namespace"

### Get Cloud Credentials Details

> "Get details of the cloud-credentials named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl config cloud-credentials create {name} --namespace {namespace}
```

Create cloud-credentials

### file_based

```bash
f5xcctl config cloud-credentials create -f {file}.yaml
```

Create from YAML file

### delete

```bash
f5xcctl config cloud-credentials delete {name} --namespace {namespace}
```

Delete cloud-credentials

### get_specific

```bash
f5xcctl config cloud-credentials get {name} --namespace {namespace}
```

Get specific cloud-credentials

### list_all

```bash
f5xcctl config cloud-credentials list --namespace {namespace}
```

List all cloud-credentialss

### update

```bash
f5xcctl config cloud-credentials update {name} --namespace {namespace} -f {file}.yaml
```

Update cloud-credentials

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl cloud_infrastructure create cloud_credentials -n <namespace> -i cloud_credentials.yaml

# Get
f5xcctl cloud_infrastructure get cloud_credentials <name> -n <namespace>

# List
f5xcctl cloud_infrastructure list cloud_credentials -n <namespace>

# Delete
f5xcctl cloud_infrastructure delete cloud_credentials <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_cloud_credentials" "example" {
  name      = "example-cloud-credentials"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
