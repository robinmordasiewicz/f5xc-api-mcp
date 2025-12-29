---
page_title: f5xc_mobile_base_config - f5xc-api-mcp
subcategory: Shape
description: Create Mobile SDK Base Configuration.
---

# Mobile Base Config

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

List the set of mobile_base_config in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-mobile-base-config-create` | Create Mobile SDK Base Configuration. |
| `f5xc-api-shape-mobile-base-config-get` | GET Mobile SDK Base Configuration. |
| `f5xc-api-shape-mobile-base-config-list` | List Mobile SDK Base Configuration. |
| `f5xc-api-shape-mobile-base-config-update` | Replace Mobile SDK Base Configuration. |
| `f5xc-api-shape-mobile-base-config-delete` | DELETE Mobile SDK Base Configuration. |

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

- mobile-base-config

**Modifies:**

- mobile-base-config

**Deletes:**

- mobile-base-config
- contained_resources

## Example Usage

Ask Claude to help you work with Mobile Base Config resources:

### Create Mobile Base Config

> "Create a mobile-base-config named 'example' in the 'production' namespace"

### List Mobile Base Configs

> "List all mobile-base-configs in the 'production' namespace"

### Get Mobile Base Config Details

> "Get details of the mobile-base-config named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl mobile mobile-base-config create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl mobile mobile-base-config create {name} --namespace {namespace}
```

Create mobile-base-config

### delete

```bash
f5xcctl mobile mobile-base-config delete {name} --namespace {namespace}
```

Delete mobile-base-config

### get_specific

```bash
f5xcctl mobile mobile-base-config get {name} --namespace {namespace}
```

Get specific mobile-base-config

### list_all

```bash
f5xcctl mobile mobile-base-config list --namespace {namespace}
```

List all mobile-base-configs

### update

```bash
f5xcctl mobile mobile-base-config update {name} --namespace {namespace} -f {file}.yaml
```

Update mobile-base-config

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create mobile_base_config -n <namespace> -i mobile_base_config.yaml

# Get
f5xcctl shape get mobile_base_config <name> -n <namespace>

# List
f5xcctl shape list mobile_base_config -n <namespace>

# Delete
f5xcctl shape delete mobile_base_config <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_mobile_base_config" "example" {
  name      = "example-mobile-base-config"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
