---
page_title: f5xc_ike2 - f5xc-api-mcp
subcategory: Network
description: Create IKE Phase2 Profile.
---

# Ike2

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Shape of the IKE Phase2 Profile configuration specification.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-network-ike2-create` | Create IKE Phase2 Profile. |
| `f5xc-api-network-ike2-get` | GET IKE Phase2 profile configuration. |
| `f5xc-api-network-ike2-list` | List IKE Phase 2 Profile. |
| `f5xc-api-network-ike2-update` | Replace IKE Phase2 Profile configuration. |
| `f5xc-api-network-ike2-delete` | DELETE IKE Phase 2 Profile. |

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

- ike2

**Modifies:**

- ike2

**Deletes:**

- ike2
- contained_resources

## Example Usage

Ask Claude to help you work with Ike2 resources:

### Create Ike2

> "Create a ike2 named 'example' in the 'production' namespace"

### List Ike2s

> "List all ike2s in the 'production' namespace"

### Get Ike2 Details

> "Get details of the ike2 named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl config ike2 create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl config ike2 create {name} --namespace {namespace}
```

Create ike2

### delete

```bash
f5xcctl config ike2 delete {name} --namespace {namespace}
```

Delete ike2

### get_specific

```bash
f5xcctl config ike2 get {name} --namespace {namespace}
```

Get specific ike2

### list_all

```bash
f5xcctl config ike2 list --namespace {namespace}
```

List all ike2s

### update

```bash
f5xcctl config ike2 update {name} --namespace {namespace} -f {file}.yaml
```

Update ike2

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl network create ike2 -n <namespace> -i ike2.yaml

# Get
f5xcctl network get ike2 <name> -n <namespace>

# List
f5xcctl network list ike2 -n <namespace>

# Delete
f5xcctl network delete ike2 <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_ike2" "example" {
  name      = "example-ike2"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
