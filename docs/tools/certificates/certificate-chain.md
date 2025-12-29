---
page_title: f5xc_certificate_chain - f5xc-api-mcp
subcategory: Certificates
description: Create Certificate Chain.
---

# Certificate Chain

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

List the set of certificate_chain in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-certificates-certificate-chain-create` | Create Certificate Chain. |
| `f5xc-api-certificates-certificate-chain-get` | GET Certificate Chain. |
| `f5xc-api-certificates-certificate-chain-list` | List Certificate Chain. |
| `f5xc-api-certificates-certificate-chain-update` | Replace Certificate Chain. |
| `f5xc-api-certificates-certificate-chain-delete` | DELETE Certificate Chain. |

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

- certificate-chain

**Modifies:**

- certificate-chain

**Deletes:**

- certificate-chain
- contained_resources

## Example Usage

Ask Claude to help you work with Certificate Chain resources:

### Create Certificate Chain

> "Create a certificate-chain named 'example' in the 'production' namespace"

### List Certificate Chains

> "List all certificate-chains in the 'production' namespace"

### Get Certificate Chain Details

> "Get details of the certificate-chain named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl config certificate-chain create {name} --namespace {namespace}
```

Create certificate-chain

### file_based

```bash
f5xcctl config certificate-chain create -f {file}.yaml
```

Create from YAML file

### delete

```bash
f5xcctl config certificate-chain delete {name} --namespace {namespace}
```

Delete certificate-chain

### get_specific

```bash
f5xcctl config certificate-chain get {name} --namespace {namespace}
```

Get specific certificate-chain

### list_all

```bash
f5xcctl config certificate-chain list --namespace {namespace}
```

List all certificate-chains

### update

```bash
f5xcctl config certificate-chain update {name} --namespace {namespace} -f {file}.yaml
```

Update certificate-chain

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl certificates create certificate_chain -n <namespace> -i certificate_chain.yaml

# Get
f5xcctl certificates get certificate_chain <name> -n <namespace>

# List
f5xcctl certificates list certificate_chain -n <namespace>

# Delete
f5xcctl certificates delete certificate_chain <name> -n <namespace>
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
