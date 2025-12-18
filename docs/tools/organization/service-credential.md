---
page_title: f5xc_service_credential - f5xc-api-mcp
subcategory: Organization
description: Bulk Revoke service credential
---

# Service Credential

It is used to revoke multiple service credentials. This API would disable the credentials and mark
them for deletion.
The actual removal of objects would be done in the background. Only admins are
allowed to access this API.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-service-credential-create` | Bulk Revoke service credential |
| `f5xc-api-core-service-credential-get` | Get Service Credential |
| `f5xc-api-core-service-credential-list` | List service credentials |
| `f5xc-api-core-service-credential-update` | Replace service credentials |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Credential name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Service Credential resources:

### Create Service Credential

> "Create a service-credential named 'example' in the 'production' namespace"

### List Service Credentials

> "List all service-credentials in the 'production' namespace"

### Get Service Credential Details

> "Get details of the service-credential named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f service_credential.yaml

# Get
f5xcctl get service_credential {name} -n {namespace}

# List
f5xcctl get service_credentials -n {namespace}

# Delete
f5xcctl delete service_credential {name} -n {namespace}
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
