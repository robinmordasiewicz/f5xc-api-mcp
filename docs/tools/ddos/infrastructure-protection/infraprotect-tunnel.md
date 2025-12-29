---
page_title: f5xc_infraprotect_tunnel - f5xc-api-mcp
subcategory: Ddos
description: Create DDoS Transit Tunnel.
---

# Infraprotect Tunnel

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

List the set of infraprotect_tunnel in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-ddos-infraprotect-tunnel-create` | Create DDoS Transit Tunnel. |
| `f5xc-api-ddos-infraprotect-tunnel-get` | GET Tunnel. |
| `f5xc-api-ddos-infraprotect-tunnel-list` | List Tunnel. |
| `f5xc-api-ddos-infraprotect-tunnel-update` | Replace DDoS Transit Tunnel. |
| `f5xc-api-ddos-infraprotect-tunnel-delete` | DELETE Tunnel. |

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

- infraprotect-tunnel

**Modifies:**

- infraprotect-tunnel

**Deletes:**

- infraprotect-tunnel
- contained_resources

## Example Usage

Ask Claude to help you work with Infraprotect Tunnel resources:

### Create Infraprotect Tunnel

> "Create a infraprotect-tunnel named 'example' in the 'production' namespace"

### List Infraprotect Tunnels

> "List all infraprotect-tunnels in the 'production' namespace"

### Get Infraprotect Tunnel Details

> "Get details of the infraprotect-tunnel named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl infraprotect infraprotect-tunnel create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl infraprotect infraprotect-tunnel create {name} --namespace {namespace}
```

Create infraprotect-tunnel

### delete

```bash
f5xcctl infraprotect infraprotect-tunnel delete {name} --namespace {namespace}
```

Delete infraprotect-tunnel

### get_specific

```bash
f5xcctl infraprotect infraprotect-tunnel get {name} --namespace {namespace}
```

Get specific infraprotect-tunnel

### list_all

```bash
f5xcctl infraprotect infraprotect-tunnel list --namespace {namespace}
```

List all infraprotect-tunnels

### update

```bash
f5xcctl infraprotect infraprotect-tunnel update {name} --namespace {namespace} -f {file}.yaml
```

Update infraprotect-tunnel

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl ddos create infraprotect_tunnel -n <namespace> -i infraprotect_tunnel.yaml

# Get
f5xcctl ddos get infraprotect_tunnel <name> -n <namespace>

# List
f5xcctl ddos list infraprotect_tunnel -n <namespace>

# Delete
f5xcctl ddos delete infraprotect_tunnel <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_infraprotect_tunnel" "example" {
  name      = "example-infraprotect-tunnel"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
