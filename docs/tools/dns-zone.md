# DNS Zone

DNS Zones enable you to manage DNS records through F5 Distributed Cloud.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-dns-zone-create` | Create a new DNS Zone |
| `f5xc-api-dns-zone-get` | Get DNS Zone details |
| `f5xc-api-dns-zone-list` | List DNS Zones in namespace |
| `f5xc-api-dns-zone-update` | Update DNS Zone configuration |
| `f5xc-api-dns-zone-delete` | Delete DNS Zone |

## Required Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| namespace | string | Target namespace |
| name | string | Zone name (typically the domain) |

## Example Usage

### Create DNS Zone

Ask Claude:

> "Create a DNS zone for 'example.com' in the 'production' namespace"

### f5xcctl Equivalent

```bash
f5xcctl apply -f - <<EOF
apiVersion: config.volterra.io/v1
kind: dns_zone
metadata:
  name: example-com
  namespace: production
spec:
  primary:
    soa_parameters:
      refresh: 3600
      retry: 600
      expire: 604800
      negative_ttl: 1800
    default_rr_set_group: []
EOF
```

### Terraform Resource

```hcl
resource "volterra_dns_zone" "example" {
  name      = "example-com"
  namespace = "production"

  primary {
    soa_parameters {
      refresh      = 3600
      retry        = 600
      expire       = 604800
      negative_ttl = 1800
    }
  }
}
```

## Zone Types

### Primary Zone

F5XC is the authoritative DNS server:

```json
{
  "primary": {
    "soa_parameters": {
      "refresh": 3600,
      "retry": 600,
      "expire": 604800,
      "negative_ttl": 1800
    }
  }
}
```

### Secondary Zone

F5XC mirrors another DNS server:

```json
{
  "secondary": {
    "primary_dns_servers": [
      {
        "public_ip": "1.2.3.4"
      }
    ]
  }
}
```

## DNS Records

### A Record

```json
{
  "default_rr_set_group": [{
    "a_record": {
      "name": "www",
      "values": ["203.0.113.10"],
      "ttl": 300
    }
  }]
}
```

### AAAA Record

```json
{
  "default_rr_set_group": [{
    "aaaa_record": {
      "name": "www",
      "values": ["2001:db8::1"],
      "ttl": 300
    }
  }]
}
```

### CNAME Record

```json
{
  "default_rr_set_group": [{
    "cname_record": {
      "name": "blog",
      "value": "www.example.com",
      "ttl": 300
    }
  }]
}
```

### MX Record

```json
{
  "default_rr_set_group": [{
    "mx_record": {
      "name": "",
      "values": [{
        "priority": 10,
        "domain": "mail.example.com"
      }],
      "ttl": 3600
    }
  }]
}
```

### TXT Record

```json
{
  "default_rr_set_group": [{
    "txt_record": {
      "name": "",
      "values": ["v=spf1 include:_spf.example.com ~all"],
      "ttl": 3600
    }
  }]
}
```

## DNS Load Balancing

For advanced traffic management, use DNS Load Balancers:

### Create DNS Load Balancer

```bash
f5xcctl apply -f - <<EOF
apiVersion: config.volterra.io/v1
kind: dns_load_balancer
metadata:
  name: geo-lb
  namespace: production
spec:
  record_type: A
  rule_list:
    rules:
      - geo_location_match:
          value: "US"
        pool:
          namespace: production
          name: us-pool
      - default_action:
          pool:
            namespace: production
            name: default-pool
EOF
```

### Create DNS LB Pool

```bash
f5xcctl apply -f - <<EOF
apiVersion: config.volterra.io/v1
kind: dns_lb_pool
metadata:
  name: us-pool
  namespace: production
spec:
  members:
    - address: 203.0.113.10
      weight: 100
  load_balancing_mode: ROUND_ROBIN
  ttl: 30
EOF
```

## Delegation Setup

To use F5XC DNS, update your domain registrar with F5XC nameservers:

```
ns1.f5clouddns.com
ns2.f5clouddns.com
```

Or configure delegation in your parent zone.

## Related Resources

- [HTTP Load Balancer](http-loadbalancer.md) - Often uses DNS for discovery

## Subscription Tier

**STANDARD** - Available with standard F5XC subscription.

## Troubleshooting

### "Zone not resolving"

1. Verify nameserver delegation at registrar
2. Check zone is configured and active
3. Use `dig` to test resolution:

   ```bash
   dig @ns1.f5clouddns.com example.com
   ```

### "Record not updating"

1. Check TTL values (may need to wait for cache expiry)
2. Verify record syntax is correct
3. Check for conflicting records

### "DNSSEC issues"

1. F5XC supports DNSSEC - ensure DS records are at registrar
2. Check DNSSEC configuration in zone settings
