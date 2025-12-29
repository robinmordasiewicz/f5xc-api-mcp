---
page_title: f5xc_bgp_routing_policy - f5xc-api-mcp
subcategory: Network
description: Create BGP Routing Policy.
---

# Bgp Routing Policy

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

BGP Routing Policy is a list of rules containing match criteria
and action to be applied. These
rules help contol routes which are
imported or exported to BGP peers.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-network-bgp-routing-policy-create` | Create BGP Routing Policy. |
| `f5xc-api-network-bgp-routing-policy-get` | GET BGP Routing Policy. |
| `f5xc-api-network-bgp-routing-policy-list` | List BGP Routing Policy. |
| `f5xc-api-network-bgp-routing-policy-update` | Replace BGP Routing Policy. |
| `f5xc-api-network-bgp-routing-policy-delete` | DELETE BGP Routing Policy. |

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

- bgp-routing-policy

**Modifies:**

- bgp-routing-policy

**Deletes:**

- bgp-routing-policy
- contained_resources

## Example Usage

Ask Claude to help you work with Bgp Routing Policy resources:

### Create Bgp Routing Policy

> "Create a bgp-routing-policy named 'example' in the 'production' namespace"

### List Bgp Routing Policys

> "List all bgp-routing-policys in the 'production' namespace"

### Get Bgp Routing Policy Details

> "Get details of the bgp-routing-policy named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl config bgp-routing-policy create {name} --namespace {namespace}
```

Create bgp-routing-policy

### file_based

```bash
f5xcctl config bgp-routing-policy create -f {file}.yaml
```

Create from YAML file

### delete

```bash
f5xcctl config bgp-routing-policy delete {name} --namespace {namespace}
```

Delete bgp-routing-policy

### get_specific

```bash
f5xcctl config bgp-routing-policy get {name} --namespace {namespace}
```

Get specific bgp-routing-policy

### list_all

```bash
f5xcctl config bgp-routing-policy list --namespace {namespace}
```

List all bgp-routing-policys

### update

```bash
f5xcctl config bgp-routing-policy update {name} --namespace {namespace} -f {file}.yaml
```

Update bgp-routing-policy

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl network create bgp_routing_policy -n <namespace> -i bgp_routing_policy.yaml

# Get
f5xcctl network get bgp_routing_policy <name> -n <namespace>

# List
f5xcctl network list bgp_routing_policy -n <namespace>

# Delete
f5xcctl network delete bgp_routing_policy <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_bgp_routing_policy" "example" {
  name      = "example-bgp-routing-policy"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
