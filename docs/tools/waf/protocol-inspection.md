---
page_title: f5xc_protocol_inspection - f5xc-api-mcp
subcategory: WAF
description: Create Protocol Inspection.
---

# Protocol Inspection

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Create Protocol Inspection Specification in a given namespace. If one already exists it will give an
error.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-waf-protocol-inspection-create` | Create Protocol Inspection. |
| `f5xc-api-waf-protocol-inspection-get` | GET Protocol Inspection. |
| `f5xc-api-waf-protocol-inspection-list` | List Configure Protocol Inspection. |
| `f5xc-api-waf-protocol-inspection-update` | Replace Protocol Inspection. |
| `f5xc-api-waf-protocol-inspection-delete` | DELETE Configure Protocol Inspection. |

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

- protocol-inspection

**Modifies:**

- protocol-inspection

**Deletes:**

- protocol-inspection
- contained_resources

## Example Usage

Ask Claude to help you work with Protocol Inspection resources:

### Create Protocol Inspection

> "Create a protocol-inspection named 'example' in the 'production' namespace"

### List Protocol Inspections

> "List all protocol-inspections in the 'production' namespace"

### Get Protocol Inspection Details

> "Get details of the protocol-inspection named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl config protocol-inspection create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl config protocol-inspection create {name} --namespace {namespace}
```

Create protocol-inspection

### delete

```bash
f5xcctl config protocol-inspection delete {name} --namespace {namespace}
```

Delete protocol-inspection

### get_specific

```bash
f5xcctl config protocol-inspection get {name} --namespace {namespace}
```

Get specific protocol-inspection

### list_all

```bash
f5xcctl config protocol-inspection list --namespace {namespace}
```

List all protocol-inspections

### update

```bash
f5xcctl config protocol-inspection update {name} --namespace {namespace} -f {file}.yaml
```

Update protocol-inspection

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl waf create protocol_inspection -n <namespace> -i protocol_inspection.yaml

# Get
f5xcctl waf get protocol_inspection <name> -n <namespace>

# List
f5xcctl waf list protocol_inspection -n <namespace>

# Delete
f5xcctl waf delete protocol_inspection <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_protocol_inspection" "example" {
  name      = "example-protocol-inspection"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
