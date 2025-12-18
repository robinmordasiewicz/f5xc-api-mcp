# API Definition

API Definitions allow you to upload OpenAPI/Swagger specifications to F5 Distributed Cloud
for API security, discovery, and schema validation on HTTP Load Balancers.

!!! info "Subscription Tier"
    **ADVANCED** - Requires advanced F5XC subscription tier.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-waap-api-definition-create` | Create a new API Definition |
| `f5xc-api-waap-api-definition-get` | Get API Definition details |
| `f5xc-api-waap-api-definition-list` | List API Definitions in namespace |
| `f5xc-api-waap-api-definition-update` | Update API Definition |
| `f5xc-api-waap-api-definition-delete` | Delete API Definition |

## Required Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| namespace | string | Target namespace |
| name | string | API definition name |
| swagger_specs | array | OpenAPI/Swagger specification content |

## Example Usage

### Create API Definition

Ask Claude:

> "Create an API definition named 'petstore-api' in the 'production' namespace
> using my OpenAPI 3.0 specification"

### f5xcctl Equivalent

```bash
f5xcctl apply -f - <<EOF
apiVersion: config.volterra.io/v1
kind: api_definition
metadata:
  name: petstore-api
  namespace: production
spec:
  swagger_specs:
    - https://petstore.swagger.io/v2/swagger.json
EOF
```

### Terraform Resource

```hcl
resource "volterra_api_definition" "petstore_api" {
  name      = "petstore-api"
  namespace = "production"

  swagger_specs = [
    "https://petstore.swagger.io/v2/swagger.json"
  ]
}
```

## Common Configurations

### URL-Based Specification

```json
{
  "name": "petstore-api",
  "namespace": "production",
  "swagger_specs": [
    "https://api.example.com/openapi.json"
  ]
}
```

### Inline Specification (Base64)

```json
{
  "name": "custom-api",
  "namespace": "production",
  "swagger_specs": [
    "string:///BASE64_ENCODED_OPENAPI_SPEC"
  ]
}
```

### Multiple API Specifications

```json
{
  "name": "microservices-api",
  "namespace": "production",
  "swagger_specs": [
    "https://api.example.com/users/openapi.json",
    "https://api.example.com/orders/openapi.json",
    "https://api.example.com/products/openapi.json"
  ]
}
```

### With Validation Settings

```json
{
  "name": "strict-api",
  "namespace": "production",
  "swagger_specs": [
    "https://api.example.com/openapi.json"
  ],
  "validation_disabled": false,
  "validation_all_spec_endpoints": {},
  "validation_properties": {
    "request_validation_properties": {
      "request_body": "VALIDATION_MODE_SKIP_INVALID",
      "request_parameters": "VALIDATION_MODE_SKIP_INVALID"
    },
    "response_validation_properties": {
      "response_body": "VALIDATION_MODE_SKIP_INVALID",
      "response_headers": "VALIDATION_MODE_SKIP_INVALID"
    }
  }
}
```

## Usage with HTTP Load Balancer

To enable API protection on an HTTP Load Balancer, reference the API definition:

```json
{
  "name": "api-gateway",
  "namespace": "production",
  "domains": ["api.example.com"],
  "api_definition": {
    "namespace": "production",
    "name": "petstore-api"
  },
  "api_protection_rules": {
    "api_groups_rules": [{
      "api_group": "all",
      "metadata": {
        "name": "allow-documented-endpoints"
      },
      "action": {
        "api_group_action_allow": {}
      }
    }]
  }
}
```

## Validation Modes

| Mode | Description |
|------|-------------|
| `VALIDATION_MODE_SKIP` | Skip validation entirely |
| `VALIDATION_MODE_SKIP_INVALID` | Log invalid requests but allow |
| `VALIDATION_MODE_BLOCK` | Block invalid requests |
| `VALIDATION_MODE_REPORT` | Report violations to security logs |

## API Security Features

### Schema Validation

Validate requests against OpenAPI schema:

- Request body validation
- Parameter type checking
- Required field enforcement
- Response validation

### Endpoint Discovery

Automatically discover API endpoints:

- Baseline legitimate traffic patterns
- Identify undocumented endpoints
- Shadow API detection

### Rate Limiting by Endpoint

Apply different rate limits per API operation:

```json
{
  "api_rate_limit": {
    "api_endpoint_rules": [{
      "api_endpoint_method": "POST",
      "api_endpoint_path": "/api/v1/users",
      "rate_limit": {
        "threshold": 100,
        "unit": "MINUTE"
      }
    }]
  }
}
```

## Related Resources

- [HTTP Load Balancer](http-loadbalancer.md) - Apply API definitions to load balancers
- [App Firewall](app-firewall.md) - WAF protection for APIs
- [Rate Limiter](rate-limiter.md) - Rate limiting policies
- [API Discovery](api-discovery.md) - Automatic API endpoint discovery

## Troubleshooting

### "Invalid OpenAPI specification"

The specification has syntax errors or is not valid OpenAPI:

1. Validate your spec at [editor.swagger.io](https://editor.swagger.io)
2. Ensure the spec is valid OpenAPI 2.0 or 3.0
3. Check JSON/YAML syntax

!!! tip "Specification Validation"
    Use online validators to verify your OpenAPI specification before uploading.

### "Specification URL not accessible"

If using a URL reference:

1. Verify the URL is publicly accessible
2. Check CORS settings if applicable
3. Ensure HTTPS certificate is valid
4. Consider using inline Base64 encoding instead

### "Endpoints not being validated"

1. Verify API definition is attached to the HTTP Load Balancer
2. Check `validation_disabled` is not set to `true`
3. Review `validation_all_spec_endpoints` configuration
4. Ensure request paths match specification paths

### "Legitimate requests being blocked"

If valid requests are blocked:

1. Review the validation mode settings
2. Check for schema mismatches between spec and actual API
3. Consider using `VALIDATION_MODE_SKIP_INVALID` initially
4. Update the OpenAPI specification to match actual API behavior

> "Show me the API definition validation logs for 'petstore-api'"
