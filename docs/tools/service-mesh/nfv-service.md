---
page_title: f5xc_nfv_service - f5xc-api-mcp
subcategory: Service Mesh
description: Create NFV Service.
---

# Nfv Service

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replaces configured NFV Service with new set of parameters.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-servicemesh-nfv-service-create` | Create NFV Service. |
| `f5xc-api-servicemesh-nfv-service-get` | GET NFV Service. |
| `f5xc-api-servicemesh-nfv-service-list` | List NFV Service. |
| `f5xc-api-servicemesh-nfv-service-update` | Replace NFV Service. |
| `f5xc-api-servicemesh-nfv-service-delete` | DELETE NFV Service. |

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

- nfv-service

**Modifies:**

- nfv-service

**Deletes:**

- nfv-service
- contained_resources

## Example Usage

Ask Claude to help you work with Nfv Service resources:

### Create Nfv Service

> "Create a nfv-service named 'example' in the 'production' namespace"

### List Nfv Services

> "List all nfv-services in the 'production' namespace"

### Get Nfv Service Details

> "Get details of the nfv-service named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl config nfv-service create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl config nfv-service create {name} --namespace {namespace}
```

Create nfv-service

### delete

```bash
f5xcctl config nfv-service delete {name} --namespace {namespace}
```

Delete nfv-service

### get_specific

```bash
f5xcctl config nfv-service get {name} --namespace {namespace}
```

Get specific nfv-service

### list_all

```bash
f5xcctl config nfv-service list --namespace {namespace}
```

List all nfv-services

### update

```bash
f5xcctl config nfv-service update {name} --namespace {namespace} -f {file}.yaml
```

Update nfv-service

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl service_mesh create nfv_service -n <namespace> -i nfv_service.yaml

# Get
f5xcctl service_mesh get nfv_service <name> -n <namespace>

# List
f5xcctl service_mesh list nfv_service -n <namespace>

# Delete
f5xcctl service_mesh delete nfv_service <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_nfv_service" "example" {
  name      = "example-nfv-service"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
