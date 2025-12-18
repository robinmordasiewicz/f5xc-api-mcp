---
page_title: f5xc_certificate_chain - f5xc-api-mcp
subcategory: Certificates
description: Create Certificate Chain
---

# Certificate Chain

List the set of certificate_chain in a namespace

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-certificate-chain-create` | Create Certificate Chain |
| `f5xc-api-core-certificate-chain-get` | Get Certificate Chain |
| `f5xc-api-core-certificate-chain-list` | List Certificate Chain |
| `f5xc-api-core-certificate-chain-update` | Replace Certificate Chain |
| `f5xc-api-core-certificate-chain-delete` | Delete Certificate Chain |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `metadata.namespace` | namespace |
| `name` | name |
| `namespace` | namespace |
| `metadata.name` | name |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | The label_filter parameter |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with Certificate Chain resources:

### Create Certificate Chain

> "Create a certificate-chain named 'example' in the 'production' namespace"

### List Certificate Chains

> "List all certificate-chains in the 'production' namespace"

### Get Certificate Chain Details

> "Get details of the certificate-chain named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f certificate_chain.yaml

# Get
f5xcctl get certificate_chain {name} -n {namespace}

# List
f5xcctl get certificate_chains -n {namespace}

# Delete
f5xcctl delete certificate_chain {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_certificate_chain" "example" {
  name      = "example-certificate-chain"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
