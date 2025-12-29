---
page_title: f5xc_rate_limiter - f5xc-api-mcp
subcategory: Rate Limiting
description: Create Rate Limiter.
---

# Rate Limiter

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replace rate_limiter replaces an existing object in the storage backend for metadata.namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-ratelimiting-rate-limiter-create` | Create Rate Limiter. |
| `f5xc-api-ratelimiting-rate-limiter-get` | GET Rate Limiter. |
| `f5xc-api-ratelimiting-rate-limiter-list` | List Rate Limiter. |
| `f5xc-api-ratelimiting-rate-limiter-update` | Replace Rate Limiter. |
| `f5xc-api-ratelimiting-rate-limiter-delete` | DELETE Rate Limiter. |

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

- rate-limiter

**Modifies:**

- rate-limiter

**Deletes:**

- rate-limiter
- contained_resources

## Example Usage

Ask Claude to help you work with Rate Limiter resources:

### Create Rate Limiter

> "Create a rate-limiter named 'example' in the 'production' namespace"

### List Rate Limiters

> "List all rate-limiters in the 'production' namespace"

### Get Rate Limiter Details

> "Get details of the rate-limiter named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl config rate-limiter create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl config rate-limiter create {name} --namespace {namespace}
```

Create rate-limiter

### delete

```bash
f5xcctl config rate-limiter delete {name} --namespace {namespace}
```

Delete rate-limiter

### get_specific

```bash
f5xcctl config rate-limiter get {name} --namespace {namespace}
```

Get specific rate-limiter

### list_all

```bash
f5xcctl config rate-limiter list --namespace {namespace}
```

List all rate-limiters

### update

```bash
f5xcctl config rate-limiter update {name} --namespace {namespace} -f {file}.yaml
```

Update rate-limiter

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl rate_limiting create rate_limiter -n <namespace> -i rate_limiter.yaml

# Get
f5xcctl rate_limiting get rate_limiter <name> -n <namespace>

# List
f5xcctl rate_limiting list rate_limiter -n <namespace>

# Delete
f5xcctl rate_limiting delete rate_limiter <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_rate_limiter" "example" {
  name      = "example-rate-limiter"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
