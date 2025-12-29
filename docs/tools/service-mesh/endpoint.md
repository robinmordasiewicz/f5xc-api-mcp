---
page_title: f5xc_endpoint - f5xc-api-mcp
subcategory: Service Mesh
description: Create Endpoint.
---

# Endpoint

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replacing an endpoint object will update the object by replacing the existing spec with the provided
one.
For read-then-write operations a resourceVersion mismatch will occur if the object was modified
between the read and write.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-servicemesh-endpoint-create` | Create Endpoint. |
| `f5xc-api-servicemesh-endpoint-get` | GET Endpoint. |
| `f5xc-api-servicemesh-endpoint-list` | List Endpoint. |
| `f5xc-api-servicemesh-endpoint-update` | Replace Endpoint. |
| `f5xc-api-servicemesh-endpoint-delete` | DELETE Endpoint. |

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

- endpoint

**Modifies:**

- endpoint

**Deletes:**

- endpoint
- contained_resources

## Example Usage

Ask Claude to help you work with Endpoint resources:

### Create Endpoint

> "Create a endpoint named 'example' in the 'production' namespace"

### List Endpoints

> "List all endpoints in the 'production' namespace"

### Get Endpoint Details

> "Get details of the endpoint named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl config endpoint create {name} --namespace {namespace}
```

Create endpoint

### file_based

```bash
f5xcctl config endpoint create -f {file}.yaml
```

Create from YAML file

### delete

```bash
f5xcctl config endpoint delete {name} --namespace {namespace}
```

Delete endpoint

### get_specific

```bash
f5xcctl config endpoint get {name} --namespace {namespace}
```

Get specific endpoint

### list_all

```bash
f5xcctl config endpoint list --namespace {namespace}
```

List all endpoints

### update

```bash
f5xcctl config endpoint update {name} --namespace {namespace} -f {file}.yaml
```

Update endpoint

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl service_mesh create endpoint -n <namespace> -i endpoint.yaml

# Get
f5xcctl service_mesh get endpoint <name> -n <namespace>

# List
f5xcctl service_mesh list endpoint -n <namespace>

# Delete
f5xcctl service_mesh delete endpoint <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_endpoint" "example" {
  name      = "example-endpoint"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
