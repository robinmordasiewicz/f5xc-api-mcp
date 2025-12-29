---
page_title: f5xc_firewall_log - f5xc-api-mcp
subcategory: Sites
description: Firewall Logs Query.
---

# Firewall Log

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Request to GET access logs and network logs with policy hits.
By default, the firewall logs in the
response are sorted in the reverse chronological order.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-firewall-log-create` | Firewall Logs Query. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- firewall-log

## Example Usage

Ask Claude to help you work with Firewall Log resources:

### Create Firewall Log

> "Create a firewall-log named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl data firewall-log create {name} --namespace {namespace}
```

Create firewall-log

### file_based

```bash
f5xcctl data firewall-log create -f {file}.yaml
```

Create from YAML file

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl sites create firewall_log -n <namespace> -i firewall_log.yaml

# Get
f5xcctl sites get firewall_log <name> -n <namespace>

# List
f5xcctl sites list firewall_log -n <namespace>

# Delete
f5xcctl sites delete firewall_log <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_firewall_log" "example" {
  name      = "example-firewall-log"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
