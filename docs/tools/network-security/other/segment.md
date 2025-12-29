---
page_title: f5xc_segment - f5xc-api-mcp
subcategory: Network Security
description: Create segment.
---

# Segment

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

List the set of segment in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networksecurity-segment-create` | Create segment. |
| `f5xc-api-networksecurity-segment-get` | GET segment. |
| `f5xc-api-networksecurity-segment-list` | List Segment. |
| `f5xc-api-networksecurity-segment-update` | Replace segment. |
| `f5xc-api-networksecurity-segment-delete` | DELETE Segment. |

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

- segment

**Modifies:**

- segment

**Deletes:**

- segment
- contained_resources

## Example Usage

Ask Claude to help you work with Segment resources:

### Create Segment

> "Create a segment named 'example' in the 'production' namespace"

### List Segments

> "List all segments in the 'production' namespace"

### Get Segment Details

> "Get details of the segment named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl config segment create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl config segment create {name} --namespace {namespace}
```

Create segment

### delete

```bash
f5xcctl config segment delete {name} --namespace {namespace}
```

Delete segment

### get_specific

```bash
f5xcctl config segment get {name} --namespace {namespace}
```

Get specific segment

### list_all

```bash
f5xcctl config segment list --namespace {namespace}
```

List all segments

### update

```bash
f5xcctl config segment update {name} --namespace {namespace} -f {file}.yaml
```

Update segment

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl network_security create segment -n <namespace> -i segment.yaml

# Get
f5xcctl network_security get segment <name> -n <namespace>

# List
f5xcctl network_security list segment -n <namespace>

# Delete
f5xcctl network_security delete segment <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_segment" "example" {
  name      = "example-segment"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
