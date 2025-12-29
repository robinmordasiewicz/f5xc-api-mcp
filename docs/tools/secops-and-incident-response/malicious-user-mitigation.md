---
page_title: f5xc_malicious_user_mitigation - f5xc-api-mcp
subcategory: Secops And Incident Response
description: Create Malicious User Mitigation.
---

# Malicious User Mitigation

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replace malicious_user_mitigation replaces an existing object in the storage backend for
metadata.namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-secopsandincidentresponse-malicious-user-mitigation-create` | Create Malicious User Mitigation. |
| `f5xc-api-secopsandincidentresponse-malicious-user-mitigation-get` | GET Malicious User Mitigation. |
| `f5xc-api-secopsandincidentresponse-malicious-user-mitigation-list` | List Malicious User Mitigation. |
| `f5xc-api-secopsandincidentresponse-malicious-user-mitigation-update` | Replace Malicious User Mitigation. |
| `f5xc-api-secopsandincidentresponse-malicious-user-mitigation-delete` | DELETE Malicious User Mitigation. |

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

- malicious-user-mitigation

**Modifies:**

- malicious-user-mitigation

**Deletes:**

- malicious-user-mitigation
- contained_resources

## Example Usage

Ask Claude to help you work with Malicious User Mitigation resources:

### Create Malicious User Mitigation

> "Create a malicious-user-mitigation named 'example' in the 'production' namespace"

### List Malicious User Mitigations

> "List all malicious-user-mitigations in the 'production' namespace"

### Get Malicious User Mitigation Details

> "Get details of the malicious-user-mitigation named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl config malicious-user-mitigation create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl config malicious-user-mitigation create {name} --namespace {namespace}
```

Create malicious-user-mitigation

### delete

```bash
f5xcctl config malicious-user-mitigation delete {name} --namespace {namespace}
```

Delete malicious-user-mitigation

### get_specific

```bash
f5xcctl config malicious-user-mitigation get {name} --namespace {namespace}
```

Get specific malicious-user-mitigation

### list_all

```bash
f5xcctl config malicious-user-mitigation list --namespace {namespace}
```

List all malicious-user-mitigations

### update

```bash
f5xcctl config malicious-user-mitigation update {name} --namespace {namespace} -f {file}.yaml
```

Update malicious-user-mitigation

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl secops_and_incident_response create malicious_user_mitigation -n <namespace> -i malicious_user_mitigation.yaml

# Get
f5xcctl secops_and_incident_response get malicious_user_mitigation <name> -n <namespace>

# List
f5xcctl secops_and_incident_response list malicious_user_mitigation -n <namespace>

# Delete
f5xcctl secops_and_incident_response delete malicious_user_mitigation <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_malicious_user_mitigation" "example" {
  name      = "example-malicious-user-mitigation"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
