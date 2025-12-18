# API Discovery

API Discovery automatically identifies and catalogs API endpoints in your applications,
providing visibility into API usage patterns and enabling schema-based security.

!!! info "Subscription Tier"
    **ADVANCED** - Requires advanced F5XC subscription tier.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-api-discovery-create` | Create API Discovery configuration |
| `f5xc-api-security-api-discovery-get` | Get API Discovery details |
| `f5xc-api-security-api-discovery-list` | List API Discovery in namespace |
| `f5xc-api-security-api-discovery-update` | Update API Discovery configuration |
| `f5xc-api-security-api-discovery-delete` | Delete API Discovery |

## Required Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| namespace | string | Target namespace |
| name | string | Discovery configuration name |
| discovery_config | object | Discovery settings |

## Example Usage

### Create API Discovery

Ask Claude:

> "Create an API discovery configuration named 'example-api-discovery' to catalog all API endpoints"

### f5xcctl Equivalent

```bash
f5xcctl apply -f - <<EOF
apiVersion: config.volterra.io/v1
kind: api_discovery
metadata:
  name: example-api-discovery
  namespace: production
spec:
  discovery_config:
    discovered_api_settings:
      purge_duration_for_inactive_discovered_apis: 48h
    enable_learn_from_redirect_responses: true
  sensitive_data_detection:
    enabled: true
    data_types:
      - CREDIT_CARD
      - SSN
      - EMAIL
      - PHONE
  api_definition_inventory:
    namespace: production
    name: example-api-inventory
EOF
```

### Terraform Resource

```hcl
resource "volterra_api_discovery" "example_api_discovery" {
  name      = "example-api-discovery"
  namespace = "production"

  discovery_config {
    discovered_api_settings {
      purge_duration_for_inactive_discovered_apis = "48h"
    }
    enable_learn_from_redirect_responses = true
  }

  sensitive_data_detection {
    enabled    = true
    data_types = ["CREDIT_CARD", "SSN", "EMAIL", "PHONE"]
  }

  api_definition_inventory {
    namespace = "production"
    name      = volterra_api_definition_inventory.inventory.name
  }
}
```

## Discovery Features

| Feature | Description |
|---------|-------------|
| Endpoint Discovery | Automatically identify API endpoints |
| Schema Learning | Learn request/response schemas |
| Sensitive Data Detection | Identify PII and sensitive data |
| Shadow API Detection | Find undocumented APIs |
| Change Tracking | Monitor API changes over time |

## Sensitive Data Types

| Type | Description |
|------|-------------|
| `CREDIT_CARD` | Credit card numbers |
| `SSN` | Social Security Numbers |
| `EMAIL` | Email addresses |
| `PHONE` | Phone numbers |
| `IP_ADDRESS` | IP addresses |
| `API_KEY` | API keys and tokens |
| `CUSTOM` | Custom regex patterns |

## Common Configurations

### Basic Discovery

```json
{
  "name": "example-api-discovery",
  "namespace": "production",
  "discovery_config": {
    "enable_learn_from_redirect_responses": true
  }
}
```

### With Sensitive Data Detection

```json
{
  "name": "example-api-discovery",
  "discovery_config": {
    "discovered_api_settings": {
      "purge_duration_for_inactive_discovered_apis": "72h"
    }
  },
  "sensitive_data_detection": {
    "enabled": true,
    "data_types": [
      "CREDIT_CARD",
      "SSN",
      "EMAIL",
      "PHONE",
      "API_KEY"
    ]
  }
}
```

### With Custom Data Patterns

```json
{
  "name": "example-api-discovery",
  "sensitive_data_detection": {
    "enabled": true,
    "data_types": ["EMAIL", "PHONE"],
    "custom_patterns": [{
      "name": "employee_id",
      "regex": "EMP-[0-9]{6}"
    }]
  }
}
```

### With API Inventory

```json
{
  "name": "example-api-discovery",
  "discovery_config": {
    "enable_learn_from_redirect_responses": true
  },
  "api_definition_inventory": {
    "namespace": "production",
    "name": "api-catalog"
  }
}
```

## Apply to Load Balancer

Reference in HTTP Load Balancer:

```json
{
  "name": "example-app",
  "api_discovery": {
    "namespace": "production",
    "name": "example-api-discovery"
  },
  "api_protection": {
    "discovered_apis": {
      "action": "REPORT"
    }
  }
}
```

## Discovery Workflow

1. **Enable Discovery**: Configure and attach to load balancer
2. **Collect Traffic**: System analyzes API traffic patterns
3. **Review Endpoints**: Examine discovered API inventory
4. **Generate Schema**: Export OpenAPI specification
5. **Enable Protection**: Apply schema-based security

## Related Resources

- [HTTP Load Balancer](http-loadbalancer.md) - Enables API discovery
- [App Firewall](app-firewall.md) - WAF protection
- [Bot Defense](bot-defense.md) - API bot protection
- [Service Policy](service-policy.md) - API access control

## Troubleshooting

### APIs Not Being Discovered

1. Verify discovery is enabled on load balancer
2. Check traffic is flowing through the load balancer
3. Review discovery configuration settings
4. Confirm namespace permissions

### Sensitive Data Not Detected

!!! tip "Review Patterns"
    Custom patterns require correct regex syntax matching your data format.

1. Enable sensitive data detection
2. Verify data type configuration
3. Check custom pattern regex syntax
4. Review traffic for data presence

### Stale APIs Listed

1. Review purge duration settings
2. Check endpoint activity status
3. Manually remove inactive endpoints
4. Verify traffic patterns
