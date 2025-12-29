---
page_title: f5xc_udp_loadbalancer - f5xc-api-mcp
subcategory: Virtual
description: Create UDP Load Balancer.
---

# UDP Loadbalancer

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Shape of the UDP load balancer replace specification.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-virtual-udp-loadbalancer-create` | Create UDP Load Balancer. |
| `f5xc-api-virtual-udp-loadbalancer-get` | GET UDP Load Balancer. |
| `f5xc-api-virtual-udp-loadbalancer-list` | List Configure UDP Load Balancer. |
| `f5xc-api-virtual-udp-loadbalancer-update` | Replace UDP Load Balancer. |
| `f5xc-api-virtual-udp-loadbalancer-delete` | DELETE Configure UDP Load Balancer. |

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

- udp-loadbalancer

**Modifies:**

- udp-loadbalancer

**Deletes:**

- udp-loadbalancer
- contained_resources

## Example Usage

Ask Claude to help you work with UDP Loadbalancer resources:

### Create UDP Loadbalancer

> "Create a udp-loadbalancer named 'example' in the 'production' namespace"

### List UDP Loadbalancers

> "List all udp-loadbalancers in the 'production' namespace"

### Get UDP Loadbalancer Details

> "Get details of the udp-loadbalancer named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl config udp-loadbalancer create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl config udp-loadbalancer create {name} --namespace {namespace}
```

Create udp-loadbalancer

### delete

```bash
f5xcctl config udp-loadbalancer delete {name} --namespace {namespace}
```

Delete udp-loadbalancer

### get_specific

```bash
f5xcctl config udp-loadbalancer get {name} --namespace {namespace}
```

Get specific udp-loadbalancer

### list_all

```bash
f5xcctl config udp-loadbalancer list --namespace {namespace}
```

List all udp-loadbalancers

### update

```bash
f5xcctl config udp-loadbalancer update {name} --namespace {namespace} -f {file}.yaml
```

Update udp-loadbalancer

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl virtual create udp_loadbalancer -n <namespace> -i udp_loadbalancer.yaml

# Get
f5xcctl virtual get udp_loadbalancer <name> -n <namespace>

# List
f5xcctl virtual list udp_loadbalancer -n <namespace>

# Delete
f5xcctl virtual delete udp_loadbalancer <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_udp_loadbalancer" "example" {
  name      = "example-udp-loadbalancer"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
