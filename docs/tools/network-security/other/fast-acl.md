---
page_title: f5xc_fast_acl - f5xc-api-mcp
subcategory: Network Security
description: Create Fast ACL.
---

# Fast Acl

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replace a `fast_acl` object, `fast_acl` object contains rules to protect site from denial of
service
It has destination{destination IP, destination port) and references to `fast_acl_rule`

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networksecurity-fast-acl-create` | Create Fast ACL. |
| `f5xc-api-networksecurity-fast-acl-get` | GET Fast ACL. |
| `f5xc-api-networksecurity-fast-acl-list` | List Fast ACL. |
| `f5xc-api-networksecurity-fast-acl-update` | Replace Fast ACL. |
| `f5xc-api-networksecurity-fast-acl-delete` | DELETE Fast ACL. |

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

- fast-acl

**Modifies:**

- fast-acl

**Deletes:**

- fast-acl
- contained_resources

## Example Usage

Ask Claude to help you work with Fast Acl resources:

### Create Fast Acl

> "Create a fast-acl named 'example' in the 'production' namespace"

### List Fast Acls

> "List all fast-acls in the 'production' namespace"

### Get Fast Acl Details

> "Get details of the fast-acl named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl config fast-acl create {name} --namespace {namespace}
```

Create fast-acl

### file_based

```bash
f5xcctl config fast-acl create -f {file}.yaml
```

Create from YAML file

### delete

```bash
f5xcctl config fast-acl delete {name} --namespace {namespace}
```

Delete fast-acl

### get_specific

```bash
f5xcctl config fast-acl get {name} --namespace {namespace}
```

Get specific fast-acl

### list_all

```bash
f5xcctl config fast-acl list --namespace {namespace}
```

List all fast-acls

### update

```bash
f5xcctl config fast-acl update {name} --namespace {namespace} -f {file}.yaml
```

Update fast-acl

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl network_security create fast_acl -n <namespace> -i fast_acl.yaml

# Get
f5xcctl network_security get fast_acl <name> -n <namespace>

# List
f5xcctl network_security list fast_acl -n <namespace>

# Delete
f5xcctl network_security delete fast_acl <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_fast_acl" "example" {
  name      = "example-fast-acl"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
