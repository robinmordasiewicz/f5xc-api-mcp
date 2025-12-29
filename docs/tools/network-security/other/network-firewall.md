---
page_title: f5xc_network_firewall - f5xc-api-mcp
subcategory: Network Security
description: Create Network Firewall.
---

# Network Firewall

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replace network firewall will replace the contains of given object.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networksecurity-network-firewall-create` | Create Network Firewall. |
| `f5xc-api-networksecurity-network-firewall-get` | GET Network Firewall. |
| `f5xc-api-networksecurity-network-firewall-list` | List Network Firewall. |
| `f5xc-api-networksecurity-network-firewall-update` | Replace Network Firewall. |
| `f5xc-api-networksecurity-network-firewall-delete` | DELETE Network Firewall. |

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

- network-firewall

**Modifies:**

- network-firewall

**Deletes:**

- network-firewall
- contained_resources

## Example Usage

Ask Claude to help you work with Network Firewall resources:

### Create Network Firewall

> "Create a network-firewall named 'example' in the 'production' namespace"

### List Network Firewalls

> "List all network-firewalls in the 'production' namespace"

### Get Network Firewall Details

> "Get details of the network-firewall named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl config network-firewall create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl config network-firewall create {name} --namespace {namespace}
```

Create network-firewall

### delete

```bash
f5xcctl config network-firewall delete {name} --namespace {namespace}
```

Delete network-firewall

### get_specific

```bash
f5xcctl config network-firewall get {name} --namespace {namespace}
```

Get specific network-firewall

### list_all

```bash
f5xcctl config network-firewall list --namespace {namespace}
```

List all network-firewalls

### update

```bash
f5xcctl config network-firewall update {name} --namespace {namespace} -f {file}.yaml
```

Update network-firewall

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl network_security create network_firewall -n <namespace> -i network_firewall.yaml

# Get
f5xcctl network_security get network_firewall <name> -n <namespace>

# List
f5xcctl network_security list network_firewall -n <namespace>

# Delete
f5xcctl network_security delete network_firewall <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_network_firewall" "example" {
  name      = "example-network-firewall"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
