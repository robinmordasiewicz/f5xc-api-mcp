---
page_title: f5xc_protocol_policer - f5xc-api-mcp
subcategory: Rate Limiting
description: Create Protocol Policer.
---

# Protocol Policer

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Create a protocol_policer object, protocol_policer object contains list
of L4 protocol match
condition and corresponding traffic rate limits.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-ratelimiting-protocol-policer-create` | Create Protocol Policer. |
| `f5xc-api-ratelimiting-protocol-policer-get` | GET Protocol Policer. |
| `f5xc-api-ratelimiting-protocol-policer-list` | List Protocol Policer. |
| `f5xc-api-ratelimiting-protocol-policer-update` | Replace Protocol Policer. |
| `f5xc-api-ratelimiting-protocol-policer-delete` | DELETE Protocol Policer. |

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

- protocol-policer

**Modifies:**

- protocol-policer

**Deletes:**

- protocol-policer
- contained_resources

## Example Usage

Ask Claude to help you work with Protocol Policer resources:

### Create Protocol Policer

> "Create a protocol-policer named 'example' in the 'production' namespace"

### List Protocol Policers

> "List all protocol-policers in the 'production' namespace"

### Get Protocol Policer Details

> "Get details of the protocol-policer named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl config protocol-policer create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl config protocol-policer create {name} --namespace {namespace}
```

Create protocol-policer

### delete

```bash
f5xcctl config protocol-policer delete {name} --namespace {namespace}
```

Delete protocol-policer

### get_specific

```bash
f5xcctl config protocol-policer get {name} --namespace {namespace}
```

Get specific protocol-policer

### list_all

```bash
f5xcctl config protocol-policer list --namespace {namespace}
```

List all protocol-policers

### update

```bash
f5xcctl config protocol-policer update {name} --namespace {namespace} -f {file}.yaml
```

Update protocol-policer

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl rate_limiting create protocol_policer -n <namespace> -i protocol_policer.yaml

# Get
f5xcctl rate_limiting get protocol_policer <name> -n <namespace>

# List
f5xcctl rate_limiting list protocol_policer -n <namespace>

# Delete
f5xcctl rate_limiting delete protocol_policer <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_protocol_policer" "example" {
  name      = "example-protocol-policer"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
