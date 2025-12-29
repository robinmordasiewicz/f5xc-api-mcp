---
page_title: f5xc_workload - f5xc-api-mcp
subcategory: Container Services
description: Create Workload.
---

# Workload

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

List the set of workload in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-containerservices-workload-create` | Create Workload. |
| `f5xc-api-containerservices-workload-get` | GET Workload. |
| `f5xc-api-containerservices-workload-list` | List Workload. |
| `f5xc-api-containerservices-workload-update` | Replace Workload. |
| `f5xc-api-containerservices-workload-delete` | DELETE Workload. |

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

- workload

**Modifies:**

- workload

**Deletes:**

- workload
- contained_resources

## Example Usage

Ask Claude to help you work with Workload resources:

### Create Workload

> "Create a workload named 'example' in the 'production' namespace"

### List Workloads

> "List all workloads in the 'production' namespace"

### Get Workload Details

> "Get details of the workload named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl config workload create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl config workload create {name} --namespace {namespace}
```

Create workload

### delete

```bash
f5xcctl config workload delete {name} --namespace {namespace}
```

Delete workload

### get_specific

```bash
f5xcctl config workload get {name} --namespace {namespace}
```

Get specific workload

### list_all

```bash
f5xcctl config workload list --namespace {namespace}
```

List all workloads

### update

```bash
f5xcctl config workload update {name} --namespace {namespace} -f {file}.yaml
```

Update workload

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl container_services create workload -n <namespace> -i workload.yaml

# Get
f5xcctl container_services get workload <name> -n <namespace>

# List
f5xcctl container_services list workload -n <namespace>

# Delete
f5xcctl container_services delete workload <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_workload" "example" {
  name      = "example-workload"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
