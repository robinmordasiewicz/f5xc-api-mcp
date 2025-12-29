---
page_title: f5xc_sensitive_data_policy - f5xc-api-mcp
subcategory: Data And Privacy Security
description: Create Sensitive Data Discovery.
---

# Sensitive Data Policy

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replace sensitive_data_policy replaces an existing object in the storage backend for
metadata.namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-dataandprivacysecurity-sensitive-data-policy-create` | Create Sensitive Data Discovery. |
| `f5xc-api-dataandprivacysecurity-sensitive-data-policy-get` | GET Sensitive Data Discovery. |
| `f5xc-api-dataandprivacysecurity-sensitive-data-policy-list` | List Sensitive Data Discovery. |
| `f5xc-api-dataandprivacysecurity-sensitive-data-policy-update` | Replace Sensitive Data Discovery. |
| `f5xc-api-dataandprivacysecurity-sensitive-data-policy-delete` | DELETE Sensitive Data Discovery. |

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

- sensitive-data-policy

**Modifies:**

- sensitive-data-policy

**Deletes:**

- sensitive-data-policy
- contained_resources

## Example Usage

Ask Claude to help you work with Sensitive Data Policy resources:

### Create Sensitive Data Policy

> "Create a sensitive-data-policy named 'example' in the 'production' namespace"

### List Sensitive Data Policys

> "List all sensitive-data-policys in the 'production' namespace"

### Get Sensitive Data Policy Details

> "Get details of the sensitive-data-policy named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl config sensitive-data-policy create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl config sensitive-data-policy create {name} --namespace {namespace}
```

Create sensitive-data-policy

### delete

```bash
f5xcctl config sensitive-data-policy delete {name} --namespace {namespace}
```

Delete sensitive-data-policy

### get_specific

```bash
f5xcctl config sensitive-data-policy get {name} --namespace {namespace}
```

Get specific sensitive-data-policy

### list_all

```bash
f5xcctl config sensitive-data-policy list --namespace {namespace}
```

List all sensitive-data-policys

### update

```bash
f5xcctl config sensitive-data-policy update {name} --namespace {namespace} -f {file}.yaml
```

Update sensitive-data-policy

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl data_and_privacy_security create sensitive_data_policy -n <namespace> -i sensitive_data_policy.yaml

# Get
f5xcctl data_and_privacy_security get sensitive_data_policy <name> -n <namespace>

# List
f5xcctl data_and_privacy_security list sensitive_data_policy -n <namespace>

# Delete
f5xcctl data_and_privacy_security delete sensitive_data_policy <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_sensitive_data_policy" "example" {
  name      = "example-sensitive-data-policy"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
