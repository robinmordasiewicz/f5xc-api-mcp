# Certificate

Certificates manage TLS/SSL certificates for secure communication in F5 Distributed Cloud.

!!! info "Subscription Tier"
    **STANDARD** - Available with standard F5XC subscription.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-certificate-create` | Upload a certificate |
| `f5xc-api-core-certificate-get` | Get certificate details |
| `f5xc-api-core-certificate-list` | List certificates |
| `f5xc-api-core-certificate-update` | Update certificate |
| `f5xc-api-core-certificate-delete` | Delete certificate |

## Required Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| namespace | string | Target namespace |
| name | string | Certificate name |
| certificate_url | string | PEM-encoded certificate |
| private_key | object | Private key (blindfolded) |

## Example Usage

### Upload Certificate

Ask Claude:

> "Upload a TLS certificate named 'app-cert' to the production namespace"

### f5xcctl Equivalent

```bash
f5xcctl apply -f - <<EOF
apiVersion: config.volterra.io/v1
kind: certificate
metadata:
  name: app-cert
  namespace: production
spec:
  certificate_url: "string:///base64-encoded-cert"
  private_key:
    blindfold_secret_info:
      location: "string:///base64-encoded-key"
EOF
```

### Terraform Resource

```hcl
resource "volterra_certificate" "app_cert" {
  name      = "app-cert"
  namespace = "production"

  certificate_url = "string:///${base64encode(file("cert.pem"))}"

  private_key {
    blindfold_secret_info {
      location = "string:///${base64encode(file("key.pem"))}"
    }
  }
}
```

## Certificate Types

### Custom Certificate

Upload your own certificate:

```json
{
  "certificate_url": "string:///base64-encoded-cert-chain",
  "private_key": {
    "blindfold_secret_info": {
      "location": "string:///base64-encoded-private-key"
    }
  }
}
```

### Auto-Generated (Let's Encrypt)

Use automatic certificate management with HTTP Load Balancer:

```json
{
  "https_auto_cert": {
    "http_redirect": true,
    "add_hsts": true
  }
}
```

!!! tip "Auto Certificates"
    For most use cases, use `https_auto_cert` on HTTP Load Balancers
    instead of manually managing certificates.

## Related Resources

- [HTTP Load Balancer](http-loadbalancer.md) - Uses certificates for HTTPS
- [Namespace](namespace.md) - Certificate scope

## Troubleshooting

### "Certificate validation failed"

1. Verify certificate chain is complete
2. Check certificate is not expired
3. Ensure private key matches certificate

### "Domain mismatch"

1. Verify certificate covers the domain
2. Check for wildcard certificate requirements
3. Review SAN (Subject Alternative Names)
