# Secret

Secrets provide secure storage for sensitive data like API keys, passwords, and certificates,
with encryption at rest and controlled access through F5 Distributed Cloud.

!!! info "Subscription Tier"
    **NO_TIER** - Available with any F5XC subscription.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-secret-create` | Create a Secret |
| `f5xc-api-core-secret-get` | Get Secret metadata (not value) |
| `f5xc-api-core-secret-list` | List Secrets in namespace |
| `f5xc-api-core-secret-update` | Update Secret |
| `f5xc-api-core-secret-delete` | Delete Secret |

## Required Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| namespace | string | Target namespace |
| name | string | Secret name |
| secret_data | object | Secret value configuration |

## Example Usage

### Create Secret

Ask Claude:

> "Create a secret named 'example-api-key' to store an API key in the production namespace"

### f5xcctl Equivalent

```bash
f5xcctl apply -f - <<EOF
apiVersion: config.volterra.io/v1
kind: secret
metadata:
  name: example-api-key
  namespace: production
spec:
  secret_encoding_type: EncodingNone
  data:
    wingman_secret_info:
      name: example-api-key
EOF
```

### Terraform Resource

```hcl
resource "volterra_secret" "example_api_key" {
  name      = "example-api-key"
  namespace = "production"

  secret_encoding_type = "EncodingNone"

  data {
    wingman_secret_info {
      name = "example-api-key"
    }
  }
}
```

## Secret Types

| Type | Description |
|------|-------------|
| `blindfold_secret_info` | Encrypted with F5XC blindfold key |
| `wingman_secret_info` | Managed through F5XC Wingman service |
| `clear_secret_info` | Plain text (not recommended) |
| `vault_secret_info` | Retrieved from HashiCorp Vault |

## Encoding Types

| Encoding | Description |
|----------|-------------|
| `EncodingNone` | No encoding |
| `EncodingBase64` | Base64 encoded |
| `EncodingPEM` | PEM format for certificates |

## Common Configurations

### API Key Secret

```json
{
  "name": "example-api-key",
  "namespace": "production",
  "secret_encoding_type": "EncodingNone",
  "data": {
    "wingman_secret_info": {
      "name": "example-api-key"
    }
  }
}
```

### Certificate Private Key

```json
{
  "name": "example-cert-key",
  "namespace": "production",
  "secret_encoding_type": "EncodingPEM",
  "data": {
    "blindfold_secret_info": {
      "location": "string:///BASE64_ENCODED_ENCRYPTED_KEY"
    }
  }
}
```

### Vault Integration

```json
{
  "name": "example-vault-secret",
  "namespace": "production",
  "data": {
    "vault_secret_info": {
      "key": "secret/data/myapp/api-key",
      "location": "https://vault.example.com",
      "provider": "production-vault"
    }
  }
}
```

### Base64 Encoded Secret

```json
{
  "name": "example-encoded-secret",
  "namespace": "production",
  "secret_encoding_type": "EncodingBase64",
  "data": {
    "clear_secret_info": {
      "value": "BASE64_ENCODED_VALUE"
    }
  }
}
```

## Usage in Other Resources

### In Origin Pool (mTLS)

```json
{
  "use_tls": {
    "use_mtls": {
      "tls_certificates": [{
        "private_key": {
          "secret_encoding_type": "EncodingPEM",
          "blindfold_secret_info": {
            "location": "string:///..."
          }
        }
      }]
    }
  }
}
```

### In Workload (Environment Variable)

```json
{
  "containers": [{
    "env": [{
      "name": "API_KEY",
      "secret_ref": {
        "namespace": "production",
        "name": "example-api-key",
        "key": "value"
      }
    }]
  }]
}
```

## Related Resources

- [Certificate](certificate.md) - TLS certificate management
- [Cloud Credentials](cloud-credentials.md) - Cloud provider credentials
- [Origin Pool](origin-pool.md) - Uses secrets for mTLS
- [Workload](workload.md) - Container environment secrets

## Troubleshooting

### Secret Not Found

1. Verify namespace is correct
2. Check secret name matches reference
3. Confirm secret exists in target namespace
4. Review permissions for accessing secrets

### Decryption Failed

!!! warning "Security"
    Never expose secret values in logs or error messages.

1. Verify encoding type matches secret format
2. Check blindfold key is accessible
3. Confirm Vault connectivity if using Vault
4. Review secret data format

### Secret Value Not Updating

1. Resources may cache secret values
2. Restart dependent resources after secret update
3. Verify secret update was successful
4. Check for version conflicts
