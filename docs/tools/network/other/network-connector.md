---
page_title: f5xc_network_connector - f5xc-api-mcp
subcategory: Network
description: Create Network Connector.
---

# Network Connector

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replace Network Connector will replace the contains of given object.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-network-network-connector-create` | Create Network Connector. |
| `f5xc-api-network-network-connector-get` | GET Network Connector. |
| `f5xc-api-network-network-connector-list` | List Network Connector. |
| `f5xc-api-network-network-connector-update` | Replace Network Connector. |
| `f5xc-api-network-network-connector-delete` | DELETE Network Connector. |

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

- network-connector

**Modifies:**

- network-connector

**Deletes:**

- network-connector
- contained_resources

## Example Usage

Ask Claude to help you work with Network Connector resources:

### Create Network Connector

> "Create a network-connector named 'example' in the 'production' namespace"

### List Network Connectors

> "List all network-connectors in the 'production' namespace"

### Get Network Connector Details

> "Get details of the network-connector named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl config network-connector create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl config network-connector create {name} --namespace {namespace}
```

Create network-connector

### delete

```bash
f5xcctl config network-connector delete {name} --namespace {namespace}
```

Delete network-connector

### get_specific

```bash
f5xcctl config network-connector get {name} --namespace {namespace}
```

Get specific network-connector

### list_all

```bash
f5xcctl config network-connector list --namespace {namespace}
```

List all network-connectors

### update

```bash
f5xcctl config network-connector update {name} --namespace {namespace} -f {file}.yaml
```

Update network-connector

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl network create network_connector -n <namespace> -i network_connector.yaml

# Get
f5xcctl network get network_connector <name> -n <namespace>

# List
f5xcctl network list network_connector -n <namespace>

# Delete
f5xcctl network delete network_connector <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_network_connector" "example" {
  name      = "example-network-connector"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
