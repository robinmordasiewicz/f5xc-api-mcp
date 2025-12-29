---
page_title: f5xc_service_credential - f5xc-api-mcp
subcategory: Authentication
description: Bulk Revoke service credential.
---

# Service Credential

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

It is used to revoke multiple service credentials. This API would disable the credentials and mark
them for deletion.
The actual removal of objects would be done in the background. Only admins are
allowed to access this API.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-authentication-service-credential-create` | Bulk Revoke service credential. |
| `f5xc-api-authentication-service-credential-get` | GET Service Credential. |
| `f5xc-api-authentication-service-credential-list` | List service credentials. |
| `f5xc-api-authentication-service-credential-update` | Replace service credentials. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Credential name | `Value` |
| `namespace` | Namespace | `System` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- service-credential

**Modifies:**

- service-credential

## Example Usage

Ask Claude to help you work with Service Credential resources:

### Create Service Credential

> "Create a service-credential named 'example' in the 'production' namespace"

### List Service Credentials

> "List all service-credentials in the 'production' namespace"

### Get Service Credential Details

> "Get details of the service-credential named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl web service-credential create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl web service-credential create {name} --namespace {namespace}
```

Create service-credential

### get_specific

```bash
f5xcctl web service-credential get {name} --namespace {namespace}
```

Get specific service-credential

### list_all

```bash
f5xcctl web service-credential list --namespace {namespace}
```

List all service-credentials

### update

```bash
f5xcctl web service-credential update {name} --namespace {namespace} -f {file}.yaml
```

Update service-credential

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl authentication create service_credential -n <namespace> -i service_credential.yaml

# Get
f5xcctl authentication get service_credential <name> -n <namespace>

# List
f5xcctl authentication list service_credential -n <namespace>

# Delete
f5xcctl authentication delete service_credential <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_service_credential" "example" {
  name      = "example-service-credential"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
