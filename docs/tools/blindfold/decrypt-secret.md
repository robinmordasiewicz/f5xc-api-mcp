---
page_title: f5xc_decrypt_secret - f5xc-api-mcp
subcategory: Blindfold
description: DecryptSecret.
---

# Decrypt Secret

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

DecryptSecret API takes blinded encrypted secret and policy and responds with blinded decrypted
secret if user is allowed by the policy.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-blindfold-decrypt-secret-create` | DecryptSecret. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- decrypt-secret

## Example Usage

Ask Claude to help you work with Decrypt Secret resources:

### Create Decrypt Secret

> "Create a decrypt-secret named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/decrypt_secrets" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/decrypt_secrets/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/decrypt_secrets" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @decrypt_secret.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/decrypt_secrets/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
