---
page_title: f5xc_api_credential - f5xc-api-mcp
subcategory: Authentication
description: Bulk Revoke API credentials.
---

# API Credential

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

It is used to revoke multiple API credentials. This API would disable the credentials and mark them
for deletion.
The actual removal of objects would be done in the background.
Depending upon if user
is admin or not, following behaviour is supported:-

* for admins : user has the access to DELETE
their own as well as credentials created by others
* for non-admins: user can only DELETE their own
credentials.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-authentication-api-credential-create` | Bulk Revoke API credentials. |
| `f5xc-api-authentication-api-credential-get` | GET API Credentials. |
| `f5xc-api-authentication-api-credential-list` | List API Credentials. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Credential name | `Value` |
| `namespace` | Namespace | `System` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

* api-credential

## Example Usage

Ask Claude to help you work with API Credential resources:

### Create API Credential

> "Create a api-credential named 'example' in the 'production' namespace"

### List API Credentials

> "List all api-credentials in the 'production' namespace"

### Get API Credential Details

> "Get details of the api-credential named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh authentication create api_credential -n <namespace> -i api_credential.yaml

# Get
xcsh authentication get api_credential <name> -n <namespace>

# List
xcsh authentication list api_credential -n <namespace>

# Delete
xcsh authentication delete api_credential <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_api_credential" "example" {
  name      = "example-api-credential"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
