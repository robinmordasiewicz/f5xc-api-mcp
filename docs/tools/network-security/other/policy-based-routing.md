---
page_title: f5xc_policy_based_routing - f5xc-api-mcp
subcategory: Network Security
description: Create Policy based Routing.
---

# Policy Based Routing

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Shape of the Network Policy based routing replace specification.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networksecurity-policy-based-routing-create` | Create Policy based Routing. |
| `f5xc-api-networksecurity-policy-based-routing-get` | GET Policy based Routing. |
| `f5xc-api-networksecurity-policy-based-routing-list` | List Policy based Routing. |
| `f5xc-api-networksecurity-policy-based-routing-update` | Replace Policy based Routing. |
| `f5xc-api-networksecurity-policy-based-routing-delete` | DELETE Policy based Routing. |

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

- policy-based-routing

**Modifies:**

- policy-based-routing

**Deletes:**

- policy-based-routing
- contained_resources

## Example Usage

Ask Claude to help you work with Policy Based Routing resources:

### Create Policy Based Routing

> "Create a policy-based-routing named 'example' in the 'production' namespace"

### List Policy Based Routings

> "List all policy-based-routings in the 'production' namespace"

### Get Policy Based Routing Details

> "Get details of the policy-based-routing named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh network_security create policy_based_routing -n <namespace> -i policy_based_routing.yaml

# Get
xcsh network_security get policy_based_routing <name> -n <namespace>

# List
xcsh network_security list policy_based_routing -n <namespace>

# Delete
xcsh network_security delete policy_based_routing <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_policy_based_routing" "example" {
  name      = "example-policy-based-routing"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
