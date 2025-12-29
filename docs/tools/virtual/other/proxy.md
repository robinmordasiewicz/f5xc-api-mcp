---
page_title: f5xc_proxy - f5xc-api-mcp
subcategory: Virtual
description: Create Proxy.
---

# Proxy

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Shape of the TCP loadbalancer replace specification.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-virtual-proxy-create` | Create Proxy. |
| `f5xc-api-virtual-proxy-get` | GET Proxy |
| `f5xc-api-virtual-proxy-list` | List Proxy. |
| `f5xc-api-virtual-proxy-update` | Replace Proxy. |
| `f5xc-api-virtual-proxy-delete` | DELETE Proxy. |

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

- proxy

**Modifies:**

- proxy

**Deletes:**

- proxy
- contained_resources

## Example Usage

Ask Claude to help you work with Proxy resources:

### Create Proxy

> "Create a proxy named 'example' in the 'production' namespace"

### List Proxys

> "List all proxys in the 'production' namespace"

### Get Proxy Details

> "Get details of the proxy named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl config proxy create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl config proxy create {name} --namespace {namespace}
```

Create proxy

### delete

```bash
f5xcctl config proxy delete {name} --namespace {namespace}
```

Delete proxy

### get_specific

```bash
f5xcctl config proxy get {name} --namespace {namespace}
```

Get specific proxy

### list_all

```bash
f5xcctl config proxy list --namespace {namespace}
```

List all proxys

### update

```bash
f5xcctl config proxy update {name} --namespace {namespace} -f {file}.yaml
```

Update proxy

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl virtual create proxy -n <namespace> -i proxy.yaml

# Get
f5xcctl virtual get proxy <name> -n <namespace>

# List
f5xcctl virtual list proxy -n <namespace>

# Delete
f5xcctl virtual delete proxy <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_proxy" "example" {
  name      = "example-proxy"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
