---
page_title: f5xc_nginx_service_discovery - f5xc-api-mcp
subcategory: Nginx One
description: Create NGINX Service Discovery.
---

# Nginx Service Discovery

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

API to replace NGINX Service Discovery object for a site or virtual site in system namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-nginxone-nginx-service-discovery-create` | Create NGINX Service Discovery. |
| `f5xc-api-nginxone-nginx-service-discovery-get` | GET NGINX Service Discovery. |
| `f5xc-api-nginxone-nginx-service-discovery-list` | List NGINX Service Discovery. |
| `f5xc-api-nginxone-nginx-service-discovery-update` | Replace NGINX Service Discovery. |
| `f5xc-api-nginxone-nginx-service-discovery-delete` | DELETE NGINX Service Discovery. |

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

- nginx-service-discovery

**Modifies:**

- nginx-service-discovery

**Deletes:**

- nginx-service-discovery
- contained_resources

## Example Usage

Ask Claude to help you work with Nginx Service Discovery resources:

### Create Nginx Service Discovery

> "Create a nginx-service-discovery named 'example' in the 'production' namespace"

### List Nginx Service Discoverys

> "List all nginx-service-discoverys in the 'production' namespace"

### Get Nginx Service Discovery Details

> "Get details of the nginx-service-discovery named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl config nginx-service-discovery create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl config nginx-service-discovery create {name} --namespace {namespace}
```

Create nginx-service-discovery

### delete

```bash
f5xcctl config nginx-service-discovery delete {name} --namespace {namespace}
```

Delete nginx-service-discovery

### get_specific

```bash
f5xcctl config nginx-service-discovery get {name} --namespace {namespace}
```

Get specific nginx-service-discovery

### list_all

```bash
f5xcctl config nginx-service-discovery list --namespace {namespace}
```

List all nginx-service-discoverys

### update

```bash
f5xcctl config nginx-service-discovery update {name} --namespace {namespace} -f {file}.yaml
```

Update nginx-service-discovery

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl nginx_one create nginx_service_discovery -n <namespace> -i nginx_service_discovery.yaml

# Get
f5xcctl nginx_one get nginx_service_discovery <name> -n <namespace>

# List
f5xcctl nginx_one list nginx_service_discovery -n <namespace>

# Delete
f5xcctl nginx_one delete nginx_service_discovery <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_nginx_service_discovery" "example" {
  name      = "example-nginx-service-discovery"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
