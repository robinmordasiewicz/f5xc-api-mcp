---
page_title: f5xc_http_loadbalancer - f5xc-api-mcp
subcategory: Virtual
description: Create HTTP Load Balancer.
---

# HTTP Loadbalancer

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

List the set of http_loadbalancer in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-virtual-http-loadbalancer-create` | Create HTTP Load Balancer. |
| `f5xc-api-virtual-http-loadbalancer-get` | GET HTTP Load Balancer. |
| `f5xc-api-virtual-http-loadbalancer-list` | List Configure HTTP Load Balancer. |
| `f5xc-api-virtual-http-loadbalancer-update` | Replace HTTP Load Balancer. |
| `f5xc-api-virtual-http-loadbalancer-delete` | DELETE Configure HTTP Load Balancer. |

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

- http-loadbalancer

**Modifies:**

- http-loadbalancer

**Deletes:**

- http-loadbalancer
- contained_resources

## Example Usage

Ask Claude to help you work with HTTP Loadbalancer resources:

### Create HTTP Loadbalancer

> "Create a http-loadbalancer named 'example' in the 'production' namespace"

### List HTTP Loadbalancers

> "List all http-loadbalancers in the 'production' namespace"

### Get HTTP Loadbalancer Details

> "Get details of the http-loadbalancer named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl config http-loadbalancer create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl config http-loadbalancer create {name} --namespace {namespace}
```

Create http-loadbalancer

### delete

```bash
f5xcctl config http-loadbalancer delete {name} --namespace {namespace}
```

Delete http-loadbalancer

### get_specific

```bash
f5xcctl config http-loadbalancer get {name} --namespace {namespace}
```

Get specific http-loadbalancer

### list_all

```bash
f5xcctl config http-loadbalancer list --namespace {namespace}
```

List all http-loadbalancers

### update

```bash
f5xcctl config http-loadbalancer update {name} --namespace {namespace} -f {file}.yaml
```

Update http-loadbalancer

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl virtual create http_loadbalancer -n <namespace> -i http_loadbalancer.yaml

# Get
f5xcctl virtual get http_loadbalancer <name> -n <namespace>

# List
f5xcctl virtual list http_loadbalancer -n <namespace>

# Delete
f5xcctl virtual delete http_loadbalancer <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_http_loadbalancer" "example" {
  name      = "example-http-loadbalancer"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
