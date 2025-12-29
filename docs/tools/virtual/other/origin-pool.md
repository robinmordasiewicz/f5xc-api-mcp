---
page_title: f5xc_origin_pool - f5xc-api-mcp
subcategory: Virtual
description: Create Origin Pool.
---

# Origin Pool

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Shape of the origin pool create specification.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-virtual-origin-pool-create` | Create Origin Pool. |
| `f5xc-api-virtual-origin-pool-get` | GET Origin Pool. |
| `f5xc-api-virtual-origin-pool-list` | List Origin Pool. |
| `f5xc-api-virtual-origin-pool-update` | Replace Origin Pool. |
| `f5xc-api-virtual-origin-pool-delete` | DELETE Origin Pool. |

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

- origin-pool

**Modifies:**

- origin-pool

**Deletes:**

- origin-pool
- contained_resources

## Example Usage

Ask Claude to help you work with Origin Pool resources:

### Create Origin Pool

> "Create a origin-pool named 'example' in the 'production' namespace"

### List Origin Pools

> "List all origin-pools in the 'production' namespace"

### Get Origin Pool Details

> "Get details of the origin-pool named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl config origin-pool create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl config origin-pool create {name} --namespace {namespace}
```

Create origin-pool

### delete

```bash
f5xcctl config origin-pool delete {name} --namespace {namespace}
```

Delete origin-pool

### get_specific

```bash
f5xcctl config origin-pool get {name} --namespace {namespace}
```

Get specific origin-pool

### list_all

```bash
f5xcctl config origin-pool list --namespace {namespace}
```

List all origin-pools

### update

```bash
f5xcctl config origin-pool update {name} --namespace {namespace} -f {file}.yaml
```

Update origin-pool

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl virtual create origin_pool -n <namespace> -i origin_pool.yaml

# Get
f5xcctl virtual get origin_pool <name> -n <namespace>

# List
f5xcctl virtual list origin_pool -n <namespace>

# Delete
f5xcctl virtual delete origin_pool <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_origin_pool" "example" {
  name      = "example-origin-pool"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
