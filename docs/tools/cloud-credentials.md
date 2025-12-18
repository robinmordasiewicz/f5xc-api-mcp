# Cloud Credentials

Cloud Credentials store authentication information for cloud provider integrations (AWS, Azure, GCP).

!!! info "Subscription Tier"
    **STANDARD** - Available with standard F5XC subscription.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-cloud-credentials-create` | Create cloud credentials |
| `f5xc-api-core-cloud-credentials-get` | Get cloud credentials details |
| `f5xc-api-core-cloud-credentials-list` | List cloud credentials |
| `f5xc-api-core-cloud-credentials-update` | Update cloud credentials |
| `f5xc-api-core-cloud-credentials-delete` | Delete cloud credentials |

## Required Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| namespace | string | Target namespace (typically "system") |
| name | string | Credential name |
| cloud_provider | object | Provider-specific credentials |

## Example Usage

### Create AWS Credentials

Ask Claude:

> "Create AWS cloud credentials named 'aws-prod' using access key authentication"

### f5xcctl Equivalent

```bash
f5xcctl apply -f - <<EOF
apiVersion: config.volterra.io/v1
kind: cloud_credentials
metadata:
  name: aws-prod
  namespace: system
spec:
  aws_secret_key:
    access_key: "AKIA..."
    secret_key:
      blindfold_secret_info:
        location: "string:///base64-encoded-secret"
EOF
```

### Terraform Resource

```hcl
resource "volterra_cloud_credentials" "aws" {
  name      = "aws-prod"
  namespace = "system"

  aws_secret_key {
    access_key = "AKIA..."
    secret_key {
      blindfold_secret_info {
        location = "string:///base64-encoded-secret"
      }
    }
  }
}
```

## Provider Configurations

### AWS - Access Key

```json
{
  "aws_secret_key": {
    "access_key": "AKIAIOSFODNN7EXAMPLE",
    "secret_key": {
      "blindfold_secret_info": {
        "location": "string:///base64-encoded-secret"
      }
    }
  }
}
```

### AWS - IAM Role

```json
{
  "aws_assume_role": {
    "role_arn": "arn:aws:iam::123456789012:role/F5XCRole",
    "external_id": "external-id-value"
  }
}
```

### Azure - Service Principal

```json
{
  "azure_client_secret": {
    "subscription_id": "sub-id",
    "tenant_id": "tenant-id",
    "client_id": "client-id",
    "client_secret": {
      "blindfold_secret_info": {
        "location": "string:///base64-encoded-secret"
      }
    }
  }
}
```

### GCP - Service Account

```json
{
  "gcp_cred_file": {
    "credential_file": {
      "blindfold_secret_info": {
        "location": "string:///base64-encoded-json-key"
      }
    }
  }
}
```

!!! warning "Security"
    Always use blindfold secrets for sensitive credential data.

## Related Resources

- [AWS VPC Site](aws-vpc-site.md) - Uses AWS credentials
- [Azure VNet Site](azure-vnet-site.md) - Uses Azure credentials
- [GCP VPC Site](gcp-vpc-site.md) - Uses GCP credentials

## Troubleshooting

### "Invalid credentials"

1. Verify access keys are correct
2. Check IAM permissions are sufficient
3. Ensure credentials are not expired

### "Permission denied"

1. Review cloud provider IAM policies
2. Verify role trust relationships
3. Check resource-level permissions
