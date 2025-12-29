---
page_title: f5xc_forward_proxy_policy - f5xc-api-mcp
subcategory: Network Security
description: Create Forward Proxy Policy.
---

# Forward Proxy Policy

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Shape of the Forward Proxy Policy replace specification.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networksecurity-forward-proxy-policy-create` | Create Forward Proxy Policy. |
| `f5xc-api-networksecurity-forward-proxy-policy-get` | GET Forward Proxy Policy. |
| `f5xc-api-networksecurity-forward-proxy-policy-list` | List Configure Forward Proxy Policy. |
| `f5xc-api-networksecurity-forward-proxy-policy-update` | Replace Forward Proxy Policy. |
| `f5xc-api-networksecurity-forward-proxy-policy-delete` | DELETE Configure Forward Proxy Policy. |

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

- forward-proxy-policy

**Modifies:**

- forward-proxy-policy

**Deletes:**

- forward-proxy-policy
- contained_resources

## Example Usage

Ask Claude to help you work with Forward Proxy Policy resources:

### Create Forward Proxy Policy

> "Create a forward-proxy-policy named 'example' in the 'production' namespace"

### List Forward Proxy Policys

> "List all forward-proxy-policys in the 'production' namespace"

### Get Forward Proxy Policy Details

> "Get details of the forward-proxy-policy named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl config forward-proxy-policy create {name} --namespace {namespace}
```

Create forward-proxy-policy

### file_based

```bash
f5xcctl config forward-proxy-policy create -f {file}.yaml
```

Create from YAML file

### delete

```bash
f5xcctl config forward-proxy-policy delete {name} --namespace {namespace}
```

Delete forward-proxy-policy

### get_specific

```bash
f5xcctl config forward-proxy-policy get {name} --namespace {namespace}
```

Get specific forward-proxy-policy

### list_all

```bash
f5xcctl config forward-proxy-policy list --namespace {namespace}
```

List all forward-proxy-policys

### update

```bash
f5xcctl config forward-proxy-policy update {name} --namespace {namespace} -f {file}.yaml
```

Update forward-proxy-policy

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl network_security create forward_proxy_policy -n <namespace> -i forward_proxy_policy.yaml

# Get
f5xcctl network_security get forward_proxy_policy <name> -n <namespace>

# List
f5xcctl network_security list forward_proxy_policy -n <namespace>

# Delete
f5xcctl network_security delete forward_proxy_policy <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_forward_proxy_policy" "example" {
  name      = "example-forward-proxy-policy"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
