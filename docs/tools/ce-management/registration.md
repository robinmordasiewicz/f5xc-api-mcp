---
page_title: f5xc_registration - f5xc-api-mcp
subcategory: Ce Management
description: Create Registration.
---

# Registration

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

VPM creates registration using this message, never used by users.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cemanagement-registration-create` | Create Registration. |
| `f5xc-api-cemanagement-registration-get` | GET Registration. |
| `f5xc-api-cemanagement-registration-list` | List Registration. |
| `f5xc-api-cemanagement-registration-update` | Replace Registration. |
| `f5xc-api-cemanagement-registration-delete` | DELETE Registration. |

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
| `fail_if_referred` | Fail the DELETE operation if this object is being referred by other objects. | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- registration

**Modifies:**

- registration

**Deletes:**

- registration
- contained_resources

## Example Usage

Ask Claude to help you work with Registration resources:

### Create Registration

> "Create a registration named 'example' in the 'production' namespace"

### List Registrations

> "List all registrations in the 'production' namespace"

### Get Registration Details

> "Get details of the registration named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl register registration create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl register registration create {name} --namespace {namespace}
```

Create registration

### delete

```bash
f5xcctl register registration delete {name} --namespace {namespace}
```

Delete registration

### get_specific

```bash
f5xcctl register registration get {name} --namespace {namespace}
```

Get specific registration

### list_all

```bash
f5xcctl register registration list --namespace {namespace}
```

List all registrations

### update

```bash
f5xcctl register registration update {name} --namespace {namespace} -f {file}.yaml
```

Update registration

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl ce_management create registration -n <namespace> -i registration.yaml

# Get
f5xcctl ce_management get registration <name> -n <namespace>

# List
f5xcctl ce_management list registration -n <namespace>

# Delete
f5xcctl ce_management delete registration <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_registration" "example" {
  name      = "example-registration"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
