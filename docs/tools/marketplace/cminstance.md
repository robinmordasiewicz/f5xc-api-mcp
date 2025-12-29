---
page_title: f5xc_cminstance - f5xc-api-mcp
subcategory: Marketplace
description: Create Central Manager Insatnce.
---

# Cminstance

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Update the configuration by replacing the existing spec with the provided one.
For read-then-write
operations a resourceVersion mismatch will occur if the object was modified between the read and
write.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-marketplace-cminstance-create` | Create Central Manager Insatnce. |
| `f5xc-api-marketplace-cminstance-get` | GET Central Manager Instance. |
| `f5xc-api-marketplace-cminstance-list` | List Central Manager Instance. |
| `f5xc-api-marketplace-cminstance-update` | Replace Central Manager Instance. |
| `f5xc-api-marketplace-cminstance-delete` | DELETE Central Manager Instance. |

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

- cminstance

**Modifies:**

- cminstance

**Deletes:**

- cminstance
- contained_resources

## Example Usage

Ask Claude to help you work with Cminstance resources:

### Create Cminstance

> "Create a cminstance named 'example' in the 'production' namespace"

### List Cminstances

> "List all cminstances in the 'production' namespace"

### Get Cminstance Details

> "Get details of the cminstance named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl config cminstance create {name} --namespace {namespace}
```

Create cminstance

### file_based

```bash
f5xcctl config cminstance create -f {file}.yaml
```

Create from YAML file

### delete

```bash
f5xcctl config cminstance delete {name} --namespace {namespace}
```

Delete cminstance

### get_specific

```bash
f5xcctl config cminstance get {name} --namespace {namespace}
```

Get specific cminstance

### list_all

```bash
f5xcctl config cminstance list --namespace {namespace}
```

List all cminstances

### update

```bash
f5xcctl config cminstance update {name} --namespace {namespace} -f {file}.yaml
```

Update cminstance

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl marketplace create cminstance -n <namespace> -i cminstance.yaml

# Get
f5xcctl marketplace get cminstance <name> -n <namespace>

# List
f5xcctl marketplace list cminstance -n <namespace>

# Delete
f5xcctl marketplace delete cminstance <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_cminstance" "example" {
  name      = "example-cminstance"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
