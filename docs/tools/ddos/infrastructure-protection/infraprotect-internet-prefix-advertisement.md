---
page_title: f5xc_infraprotect_internet_prefix_advertisement - f5xc-api-mcp
subcategory: Ddos
description: Create DDoS transit Internet Prefix.
---

# Infraprotect Internet Prefix Advertisement

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

List the set of infraprotect_internet_prefix_advertisement in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-ddos-infraprotect-internet-prefix-advertisement-create` | Create DDoS transit Internet Prefix. |
| `f5xc-api-ddos-infraprotect-internet-prefix-advertisement-get` | GET Infraprotect Internet Prefix. |
| `f5xc-api-ddos-infraprotect-internet-prefix-advertisement-list` | List Infraprotect Internet Prefix Advertisement. |
| `f5xc-api-ddos-infraprotect-internet-prefix-advertisement-update` | Replace DDoS transit Internet Prefix. |
| `f5xc-api-ddos-infraprotect-internet-prefix-advertisement-delete` | DELETE Infraprotect Internet Prefix Advertisement. |

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

- infraprotect-internet-prefix-advertisement

**Modifies:**

- infraprotect-internet-prefix-advertisement

**Deletes:**

- infraprotect-internet-prefix-advertisement
- contained_resources

## Example Usage

Ask Claude to help you work with Infraprotect Internet Prefix Advertisement resources:

### Create Infraprotect Internet Prefix Advertisement

> "Create a infraprotect-internet-prefix-advertisement named 'example' in the 'production' namespace"

### List Infraprotect Internet Prefix Advertisements

> "List all infraprotect-internet-prefix-advertisements in the 'production' namespace"

### Get Infraprotect Internet Prefix Advertisement Details

> "Get details of the infraprotect-internet-prefix-advertisement named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh ddos create infraprotect_internet_prefix_advertisement -n <namespace> -i infraprotect_internet_prefix_advertisement.yaml

# Get
xcsh ddos get infraprotect_internet_prefix_advertisement <name> -n <namespace>

# List
xcsh ddos list infraprotect_internet_prefix_advertisement -n <namespace>

# Delete
xcsh ddos delete infraprotect_internet_prefix_advertisement <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_infraprotect_internet_prefix_advertisement" "example" {
  name      = "example-infraprotect-internet-prefix-advertisement"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
