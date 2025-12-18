# Terraform Integration

The F5XC API MCP Server provides Terraform HCL examples for all operations.

## Overview

Every tool response includes Terraform resource examples, enabling you to:

- Generate infrastructure-as-code from AI conversations
- Learn Terraform patterns for F5XC resources
- Export existing configurations as Terraform
- Maintain consistent infrastructure management

## Volterra Terraform Provider

### Installation

```hcl
terraform {
  required_providers {
    volterra = {
      source  = "volterraedge/volterra"
      version = "~> 0.11"
    }
  }
}
```

### Configuration

```hcl
provider "volterra" {
  api_p12_file = var.api_p12_file
  url          = var.api_url
}
```

Or with API token:

```hcl
provider "volterra" {
  api_token = var.api_token
  url       = var.api_url
}
```

### Variables

```hcl
variable "api_url" {
  description = "F5XC API URL"
  type        = string
}

variable "api_p12_file" {
  description = "Path to P12 certificate"
  type        = string
  default     = ""
}

variable "api_token" {
  description = "API token"
  type        = string
  sensitive   = true
  default     = ""
}
```

## Resource Examples

### HTTP Load Balancer

```hcl
resource "volterra_http_loadbalancer" "example" {
  name      = "my-app"
  namespace = "production"

  domains = ["app.example.com"]

  https_auto_cert {
    http_redirect = true
    add_hsts      = true
  }

  default_route_pools {
    pool {
      name      = volterra_origin_pool.backend.name
      namespace = "production"
    }
    weight = 1
  }

  advertise_on_public_default_vip = true

  # Optional: WAF protection
  app_firewall {
    name      = volterra_app_firewall.waf.name
    namespace = "production"
  }
}
```

### Origin Pool

```hcl
resource "volterra_origin_pool" "backend" {
  name      = "backend-pool"
  namespace = "production"

  origin_servers {
    public_ip {
      ip = "10.0.0.1"
    }
  }

  origin_servers {
    public_ip {
      ip = "10.0.0.2"
    }
  }

  port               = 8080
  no_tls             = true
  endpoint_selection = "LOCAL_PREFERRED"
  loadbalancer_algorithm = "ROUND_ROBIN"

  healthcheck {
    name      = volterra_healthcheck.http.name
    namespace = "production"
  }
}
```

### App Firewall

```hcl
resource "volterra_app_firewall" "waf" {
  name      = "api-protection"
  namespace = "production"

  detection_settings {
    signature_selection_setting {
      default_attack_type_settings {}
      high_medium_accuracy_signatures {}
    }
    enable_suppression {}
    enable_threat_campaigns {}
  }

  bot_protection_setting {
    malicious_bot_action  = "BLOCK"
    suspicious_bot_action = "REPORT"
    good_bot_action       = "REPORT"
  }

  blocking {}
}
```

### Health Check

```hcl
resource "volterra_healthcheck" "http" {
  name      = "http-health"
  namespace = "production"

  http_health_check {
    path = "/health"
    expected_status_codes = ["200"]
  }

  timeout             = 3
  interval            = 15
  unhealthy_threshold = 2
  healthy_threshold   = 3
}
```

## AI-Assisted Workflows

### Generate Terraform from Description

Ask Claude:

> "Generate Terraform for an HTTP load balancer at api.example.com with WAF and two origin servers"

### Import Existing Resources

Ask Claude:

> "Generate Terraform import statements for all HTTP load balancers in the production namespace"

Example output:

```bash
terraform import volterra_http_loadbalancer.my_app production/my-app
terraform import volterra_http_loadbalancer.api production/api
```

### Convert f5xcctl to Terraform

Ask Claude:

> "Convert this f5xcctl config to Terraform:
>
> ```yaml
> kind: http_loadbalancer
> metadata:
>   name: my-app
> spec:
>   ...
> ```"

## Module Patterns

### Load Balancer Module

```hcl
module "load_balancer" {
  source = "./modules/load-balancer"

  name        = "my-app"
  namespace   = "production"
  domains     = ["app.example.com"]

  origin_servers = [
    { ip = "10.0.0.1", port = 8080 },
    { ip = "10.0.0.2", port = 8080 },
  ]

  enable_waf = true
  waf_mode   = "blocking"
}
```

### Multi-Environment

```hcl
locals {
  environments = {
    dev = {
      namespace = "development"
      domains   = ["dev.example.com"]
    }
    prod = {
      namespace = "production"
      domains   = ["app.example.com", "www.example.com"]
    }
  }
}

resource "volterra_http_loadbalancer" "app" {
  for_each = local.environments

  name      = "app-${each.key}"
  namespace = each.value.namespace
  domains   = each.value.domains

  # ... rest of config
}
```

## Best Practices

### State Management

Use remote state:

```hcl
terraform {
  backend "s3" {
    bucket = "terraform-state"
    key    = "f5xc/production/terraform.tfstate"
    region = "us-east-1"
  }
}
```

### Sensitive Values

```hcl
variable "api_token" {
  type      = string
  sensitive = true
}
```

Never commit credentials. Use:

- Environment variables
- HashiCorp Vault
- AWS Secrets Manager

### Resource Dependencies

Terraform handles dependencies automatically:

```hcl
resource "volterra_http_loadbalancer" "app" {
  # Automatically waits for origin_pool to be created
  default_route_pools {
    pool {
      name = volterra_origin_pool.backend.name
    }
  }
}
```

## Data Sources

### Read Existing Resources

```hcl
data "volterra_namespace" "production" {
  name = "production"
}

data "volterra_http_loadbalancer" "existing" {
  name      = "my-app"
  namespace = data.volterra_namespace.production.name
}
```

## Troubleshooting

### "Provider not found"

```bash
terraform init -upgrade
```

### "Authentication failed"

Check provider configuration:

```hcl
provider "volterra" {
  api_p12_file = "/absolute/path/to/cert.p12"
  url          = "https://tenant.console.ves.volterra.io/api"
}
```

### "Resource already exists"

Import the existing resource:

```bash
terraform import volterra_http_loadbalancer.app production/my-app
```

## Next Steps

- [f5xcctl Integration](f5xcctl.md)
- [Tools Reference](../tools/index.md)
- [Authentication](../configuration/authentication.md)
