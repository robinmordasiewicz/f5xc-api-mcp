---
page_title: f5xc_secret_policy - f5xc-api-mcp
subcategory: Blindfold
description: Create Secret Policy.
---

# Secret Policy

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replace secret_policy replaces an existing object in the storage backend for metadata.namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-blindfold-secret-policy-create` | Create Secret Policy. |
| `f5xc-api-blindfold-secret-policy-get` | GET Secret Policy. |
| `f5xc-api-blindfold-secret-policy-list` | List Secret Policy. |
| `f5xc-api-blindfold-secret-policy-update` | Replace Secret Policy. |
| `f5xc-api-blindfold-secret-policy-delete` | DELETE Secret Policy. |

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

- secret-policy

**Modifies:**

- secret-policy

**Deletes:**

- secret-policy
- contained_resources

## Example Usage

Ask Claude to help you work with Secret Policy resources:

### Create Secret Policy

> "Create a secret-policy named 'example' in the 'production' namespace"

### List Secret Policys

> "List all secret-policys in the 'production' namespace"

### Get Secret Policy Details

> "Get details of the secret-policy named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl secret_management secret-policy create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl secret_management secret-policy create {name} --namespace {namespace}
```

Create secret-policy

### delete

```bash
f5xcctl secret_management secret-policy delete {name} --namespace {namespace}
```

Delete secret-policy

### get_specific

```bash
f5xcctl secret_management secret-policy get {name} --namespace {namespace}
```

Get specific secret-policy

### list_all

```bash
f5xcctl secret_management secret-policy list --namespace {namespace}
```

List all secret-policys

### update

```bash
f5xcctl secret_management secret-policy update {name} --namespace {namespace} -f {file}.yaml
```

Update secret-policy

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl blindfold create secret_policy -n <namespace> -i secret_policy.yaml

# Get
f5xcctl blindfold get secret_policy <name> -n <namespace>

# List
f5xcctl blindfold list secret_policy -n <namespace>

# Delete
f5xcctl blindfold delete secret_policy <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_secret_policy" "example" {
  name      = "example-secret-policy"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
