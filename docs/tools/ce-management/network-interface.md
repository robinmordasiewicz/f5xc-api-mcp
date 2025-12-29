---
page_title: f5xc_network_interface - f5xc-api-mcp
subcategory: Ce Management
description: Create Network Interface.
---

# Network Interface

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Network interface represents configuration of a network device.
Replace network interface will
replace the contents of given network interface object.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cemanagement-network-interface-create` | Create Network Interface. |
| `f5xc-api-cemanagement-network-interface-get` | GET Network Interface. |
| `f5xc-api-cemanagement-network-interface-list` | List Network Interface. |
| `f5xc-api-cemanagement-network-interface-update` | Replace Network Interface. |
| `f5xc-api-cemanagement-network-interface-delete` | DELETE Network Interface. |

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

- network-interface

**Modifies:**

- network-interface

**Deletes:**

- network-interface
- contained_resources

## Example Usage

Ask Claude to help you work with Network Interface resources:

### Create Network Interface

> "Create a network-interface named 'example' in the 'production' namespace"

### List Network Interfaces

> "List all network-interfaces in the 'production' namespace"

### Get Network Interface Details

> "Get details of the network-interface named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl config network-interface create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl config network-interface create {name} --namespace {namespace}
```

Create network-interface

### delete

```bash
f5xcctl config network-interface delete {name} --namespace {namespace}
```

Delete network-interface

### get_specific

```bash
f5xcctl config network-interface get {name} --namespace {namespace}
```

Get specific network-interface

### list_all

```bash
f5xcctl config network-interface list --namespace {namespace}
```

List all network-interfaces

### update

```bash
f5xcctl config network-interface update {name} --namespace {namespace} -f {file}.yaml
```

Update network-interface

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl ce_management create network_interface -n <namespace> -i network_interface.yaml

# Get
f5xcctl ce_management get network_interface <name> -n <namespace>

# List
f5xcctl ce_management list network_interface -n <namespace>

# Delete
f5xcctl ce_management delete network_interface <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_network_interface" "example" {
  name      = "example-network-interface"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
