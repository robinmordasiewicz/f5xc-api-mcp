/**
 * Category Mapping for Documentation Generation
 *
 * Maps tool domains and resources to documentation subcategories,
 * matching the structure used in Terraform provider and f5xcctl CLI.
 */

/**
 * Subcategory definitions matching sister projects
 */
export const SUBCATEGORIES = {
  AI_ML: "AI/ML",
  API_SECURITY: "API Security",
  APPLICATIONS: "Applications",
  AUTHENTICATION: "Authentication",
  BIGIP_INTEGRATION: "BIG-IP Integration",
  BOT_DEFENSE: "Bot Defense",
  CERTIFICATES: "Certificates",
  CLOUD_RESOURCES: "Cloud Resources",
  DNS: "DNS",
  INFRASTRUCTURE_PROTECTION: "Infrastructure Protection",
  INTEGRATIONS: "Integrations",
  KUBERNETES: "Kubernetes",
  LOAD_BALANCING: "Load Balancing",
  MONITORING: "Monitoring",
  NETWORKING: "Networking",
  ORGANIZATION: "Organization",
  SECURITY: "Security",
  SERVICE_MESH: "Service Mesh",
  SITES: "Sites",
  SUBSCRIPTIONS: "Subscriptions",
  VPN: "VPN",
  GENERAL: "General",
} as const;

export type Subcategory = (typeof SUBCATEGORIES)[keyof typeof SUBCATEGORIES];

/**
 * Domain to subcategory mapping
 * Primary categorization based on tool domain
 */
const DOMAIN_MAP: Record<string, Subcategory> = {
  waap: SUBCATEGORIES.LOAD_BALANCING,
  dns: SUBCATEGORIES.DNS,
  site: SUBCATEGORIES.SITES,
  network: SUBCATEGORIES.NETWORKING,
  appstack: SUBCATEGORIES.KUBERNETES,
  security: SUBCATEGORIES.SECURITY,
  core: SUBCATEGORIES.ORGANIZATION,
};

/**
 * Resource pattern to subcategory mapping
 * Secondary categorization based on resource name patterns
 * These take precedence over domain-based mapping
 */
const RESOURCE_PATTERNS: Array<{ pattern: RegExp; subcategory: Subcategory }> = [
  // ============================================================
  // IMPORTANT: Order matters! More specific patterns should come first.
  // Prefix-based patterns (^) are used to catch all resources starting
  // with that prefix, preventing them from falling through to domain mapping.
  // ============================================================

  // Bot Defense (Shape = Bot Defense Advanced) - MUST catch all bot/shape resources
  { pattern: /^bot[-_]/i, subcategory: SUBCATEGORIES.BOT_DEFENSE },
  { pattern: /^shape[-_]/i, subcategory: SUBCATEGORIES.BOT_DEFENSE },
  { pattern: /bot[-_]?defense/i, subcategory: SUBCATEGORIES.BOT_DEFENSE },
  { pattern: /bot[-_]?allowlist/i, subcategory: SUBCATEGORIES.BOT_DEFENSE },
  { pattern: /bot[-_]?detection/i, subcategory: SUBCATEGORIES.BOT_DEFENSE },
  { pattern: /bot[-_]?infrastructure/i, subcategory: SUBCATEGORIES.BOT_DEFENSE },
  { pattern: /bot[-_]?network/i, subcategory: SUBCATEGORIES.BOT_DEFENSE },
  { pattern: /bot[-_]?endpoint/i, subcategory: SUBCATEGORIES.BOT_DEFENSE },
  { pattern: /client[-_]?side[-_]?defense/i, subcategory: SUBCATEGORIES.BOT_DEFENSE },
  { pattern: /mobile[-_]?sdk/i, subcategory: SUBCATEGORIES.BOT_DEFENSE },
  { pattern: /mobile[-_]?base[-_]?config/i, subcategory: SUBCATEGORIES.BOT_DEFENSE },
  { pattern: /mobile[-_]?integrator/i, subcategory: SUBCATEGORIES.BOT_DEFENSE },
  { pattern: /mobile[-_]?app[-_]?shield/i, subcategory: SUBCATEGORIES.BOT_DEFENSE },
  { pattern: /fraud/i, subcategory: SUBCATEGORIES.BOT_DEFENSE },
  { pattern: /bad[-_]?bot/i, subcategory: SUBCATEGORIES.BOT_DEFENSE },
  { pattern: /^browser$/i, subcategory: SUBCATEGORIES.BOT_DEFENSE },
  { pattern: /^device$/i, subcategory: SUBCATEGORIES.BOT_DEFENSE },
  { pattern: /^behavior$/i, subcategory: SUBCATEGORIES.BOT_DEFENSE },
  { pattern: /js[-_]?configuration/i, subcategory: SUBCATEGORIES.BOT_DEFENSE },

  // Monitoring - catch ALL alert/log/audit/metric resources with prefix patterns
  { pattern: /^alert[-_]/i, subcategory: SUBCATEGORIES.MONITORING },
  { pattern: /^alert$/i, subcategory: SUBCATEGORIES.MONITORING },
  { pattern: /active[-_]?alert/i, subcategory: SUBCATEGORIES.MONITORING },
  { pattern: /all[-_]?ns[-_]?alert/i, subcategory: SUBCATEGORIES.MONITORING },
  { pattern: /all[-_]?ns[-_]?event/i, subcategory: SUBCATEGORIES.MONITORING },
  { pattern: /all[-_]?ns[-_]?stat/i, subcategory: SUBCATEGORIES.MONITORING },
  { pattern: /all[-_]?ns[-_]?metric/i, subcategory: SUBCATEGORIES.MONITORING },
  { pattern: /^log[-_]/i, subcategory: SUBCATEGORIES.MONITORING },
  { pattern: /^log$/i, subcategory: SUBCATEGORIES.MONITORING },
  { pattern: /firewall[-_]?log/i, subcategory: SUBCATEGORIES.MONITORING },
  { pattern: /^audit[-_]/i, subcategory: SUBCATEGORIES.MONITORING },
  { pattern: /^audit$/i, subcategory: SUBCATEGORIES.MONITORING },
  { pattern: /^metric[-_]/i, subcategory: SUBCATEGORIES.MONITORING },
  { pattern: /^metric$/i, subcategory: SUBCATEGORIES.MONITORING },
  { pattern: /global[-_]?log/i, subcategory: SUBCATEGORIES.MONITORING },
  { pattern: /access[-_]?log/i, subcategory: SUBCATEGORIES.MONITORING },
  { pattern: /synthetic[-_]?monitor/i, subcategory: SUBCATEGORIES.MONITORING },
  { pattern: /report[-_]?config/i, subcategory: SUBCATEGORIES.MONITORING },
  { pattern: /^report$/i, subcategory: SUBCATEGORIES.MONITORING },
  { pattern: /http[-_]?monitor/i, subcategory: SUBCATEGORIES.MONITORING },
  { pattern: /platform[-_]?event/i, subcategory: SUBCATEGORIES.MONITORING },
  { pattern: /monitor[-_]?event/i, subcategory: SUBCATEGORIES.MONITORING },
  { pattern: /monitor[-_]?history/i, subcategory: SUBCATEGORIES.MONITORING },
  { pattern: /^event$/i, subcategory: SUBCATEGORIES.MONITORING },
  { pattern: /event[-_]?count/i, subcategory: SUBCATEGORIES.MONITORING },
  { pattern: /events[-_]?summary/i, subcategory: SUBCATEGORIES.MONITORING },
  { pattern: /^health$/i, subcategory: SUBCATEGORIES.MONITORING },
  { pattern: /health[-_]?statu/i, subcategory: SUBCATEGORIES.MONITORING },
  { pattern: /^incident/i, subcategory: SUBCATEGORIES.MONITORING },
  { pattern: /^diagnosi/i, subcategory: SUBCATEGORIES.MONITORING },
  { pattern: /flow[-_]?anomaly/i, subcategory: SUBCATEGORIES.MONITORING },
  { pattern: /flow[-_]?collection/i, subcategory: SUBCATEGORIES.MONITORING },
  { pattern: /global[-_]?history/i, subcategory: SUBCATEGORIES.MONITORING },
  { pattern: /global[-_]?summary/i, subcategory: SUBCATEGORIES.MONITORING },

  // Networking - catch BGP and network resources with prefix patterns
  { pattern: /^bgp[-_]/i, subcategory: SUBCATEGORIES.NETWORKING },
  { pattern: /^bgp$/i, subcategory: SUBCATEGORIES.NETWORKING },
  { pattern: /^bgpstatu/i, subcategory: SUBCATEGORIES.NETWORKING },
  { pattern: /^asn$/i, subcategory: SUBCATEGORIES.NETWORKING },
  { pattern: /^asorg$/i, subcategory: SUBCATEGORIES.NETWORKING },
  { pattern: /^network[-_]/i, subcategory: SUBCATEGORIES.NETWORKING },
  { pattern: /^network$/i, subcategory: SUBCATEGORIES.NETWORKING },
  { pattern: /active[-_]?network[-_]?polic/i, subcategory: SUBCATEGORIES.NETWORKING },
  { pattern: /virtual[-_]?network/i, subcategory: SUBCATEGORIES.NETWORKING },
  { pattern: /fleet/i, subcategory: SUBCATEGORIES.NETWORKING },
  { pattern: /^interface$/i, subcategory: SUBCATEGORIES.NETWORKING },
  { pattern: /vlan/i, subcategory: SUBCATEGORIES.NETWORKING },
  { pattern: /forward[-_]?proxy/i, subcategory: SUBCATEGORIES.NETWORKING },
  { pattern: /nat[-_]?policy/i, subcategory: SUBCATEGORIES.NETWORKING },
  { pattern: /proxy/i, subcategory: SUBCATEGORIES.NETWORKING },
  { pattern: /policer/i, subcategory: SUBCATEGORIES.NETWORKING },
  { pattern: /connectivity/i, subcategory: SUBCATEGORIES.NETWORKING },
  { pattern: /global[-_]?network/i, subcategory: SUBCATEGORIES.NETWORKING },
  { pattern: /policy[-_]?based[-_]?routing/i, subcategory: SUBCATEGORIES.NETWORKING },
  { pattern: /address[-_]?allocator/i, subcategory: SUBCATEGORIES.NETWORKING },
  { pattern: /allocateip/i, subcategory: SUBCATEGORIES.NETWORKING },
  { pattern: /deallocateip/i, subcategory: SUBCATEGORIES.NETWORKING },
  { pattern: /public[-_]?ip/i, subcategory: SUBCATEGORIES.NETWORKING },
  { pattern: /^dhcp/i, subcategory: SUBCATEGORIES.NETWORKING },
  { pattern: /flowlabel/i, subcategory: SUBCATEGORIES.NETWORKING },
  { pattern: /endpointlabel/i, subcategory: SUBCATEGORIES.NETWORKING },

  // DNS - catch ALL dns resources with prefix pattern
  { pattern: /^dns[-_]/i, subcategory: SUBCATEGORIES.DNS },
  { pattern: /^dns$/i, subcategory: SUBCATEGORIES.DNS },
  { pattern: /^rrset$/i, subcategory: SUBCATEGORIES.DNS },

  // Sites - catch ALL site resources
  { pattern: /[-_]site$/i, subcategory: SUBCATEGORIES.SITES },
  { pattern: /^site[-_]/i, subcategory: SUBCATEGORIES.SITES },
  { pattern: /^site$/i, subcategory: SUBCATEGORIES.SITES },
  { pattern: /^aws[-_]?vpc/i, subcategory: SUBCATEGORIES.SITES },
  { pattern: /^aws[-_]?tgw/i, subcategory: SUBCATEGORIES.SITES },
  { pattern: /^azure[-_]?vnet/i, subcategory: SUBCATEGORIES.SITES },
  { pattern: /^gcp[-_]?vpc/i, subcategory: SUBCATEGORIES.SITES },
  { pattern: /voltstack/i, subcategory: SUBCATEGORIES.SITES },
  { pattern: /securemesh/i, subcategory: SUBCATEGORIES.SITES },
  { pattern: /customer[-_]?edge/i, subcategory: SUBCATEGORIES.SITES },
  { pattern: /edge[-_]?site/i, subcategory: SUBCATEGORIES.SITES },
  { pattern: /^registration/i, subcategory: SUBCATEGORIES.SITES },
  { pattern: /^node$/i, subcategory: SUBCATEGORIES.SITES },
  { pattern: /^pop$/i, subcategory: SUBCATEGORIES.SITES },
  { pattern: /^region$/i, subcategory: SUBCATEGORIES.SITES },
  { pattern: /lma[-_]?region/i, subcategory: SUBCATEGORIES.SITES },
  { pattern: /^edge[-_]/i, subcategory: SUBCATEGORIES.SITES },
  { pattern: /^edge$/i, subcategory: SUBCATEGORIES.SITES },
  { pattern: /upgrade/i, subcategory: SUBCATEGORIES.SITES },
  { pattern: /^pre[-_]?upgrade/i, subcategory: SUBCATEGORIES.SITES },
  { pattern: /reboot/i, subcategory: SUBCATEGORIES.SITES },
  { pattern: /^certified[-_]?hardware/i, subcategory: SUBCATEGORIES.SITES },
  { pattern: /cloud[-_]?init/i, subcategory: SUBCATEGORIES.SITES },
  { pattern: /image[-_]?download/i, subcategory: SUBCATEGORIES.SITES },
  { pattern: /get[-_]?image/i, subcategory: SUBCATEGORIES.SITES },
  { pattern: /^nfv[-_]?service/i, subcategory: SUBCATEGORIES.SITES },
  { pattern: /^rescue$/i, subcategory: SUBCATEGORIES.SITES },
  { pattern: /^recover$/i, subcategory: SUBCATEGORIES.SITES },
  { pattern: /^tcpdump/i, subcategory: SUBCATEGORIES.SITES },
  { pattern: /host[-_]?ping/i, subcategory: SUBCATEGORIES.SITES },
  { pattern: /^ping$/i, subcategory: SUBCATEGORIES.SITES },
  { pattern: /debug[-_]?info/i, subcategory: SUBCATEGORIES.SITES },
  { pattern: /geolocation/i, subcategory: SUBCATEGORIES.SITES },
  { pattern: /geo[-_]?config/i, subcategory: SUBCATEGORIES.SITES },
  { pattern: /geo[-_]?location/i, subcategory: SUBCATEGORIES.SITES },

  // Security - WAF and policies
  { pattern: /^waf[-_]/i, subcategory: SUBCATEGORIES.SECURITY },
  { pattern: /^waf$/i, subcategory: SUBCATEGORIES.SECURITY },
  { pattern: /app[-_]?firewall/i, subcategory: SUBCATEGORIES.SECURITY },
  { pattern: /service[-_]?policy/i, subcategory: SUBCATEGORIES.SECURITY },
  { pattern: /active[-_]?service[-_]?polic/i, subcategory: SUBCATEGORIES.SECURITY },
  { pattern: /rate[-_]?limit/i, subcategory: SUBCATEGORIES.SECURITY },
  { pattern: /ip[-_]?prefix/i, subcategory: SUBCATEGORIES.SECURITY },
  { pattern: /known[-_]?attack/i, subcategory: SUBCATEGORIES.SECURITY },
  { pattern: /malicious[-_]?user/i, subcategory: SUBCATEGORIES.SECURITY },
  { pattern: /fast[-_]?acl/i, subcategory: SUBCATEGORIES.SECURITY },
  { pattern: /advertise[-_]?policy/i, subcategory: SUBCATEGORIES.SECURITY },
  { pattern: /usb[-_]?policy/i, subcategory: SUBCATEGORIES.SECURITY },
  { pattern: /sensitive[-_]?data/i, subcategory: SUBCATEGORIES.SECURITY },
  { pattern: /data[-_]?type/i, subcategory: SUBCATEGORIES.SECURITY },
  { pattern: /enhanced[-_]?firewall/i, subcategory: SUBCATEGORIES.SECURITY },
  { pattern: /protocol[-_]?inspection/i, subcategory: SUBCATEGORIES.SECURITY },
  { pattern: /get[-_]?security[-_]?config/i, subcategory: SUBCATEGORIES.SECURITY },
  { pattern: /staged[-_]?signature/i, subcategory: SUBCATEGORIES.SECURITY },
  { pattern: /released[-_]?signature/i, subcategory: SUBCATEGORIES.SECURITY },
  { pattern: /credential[-_]?stuffing/i, subcategory: SUBCATEGORIES.SECURITY },
  { pattern: /data[-_]?exposure/i, subcategory: SUBCATEGORIES.SECURITY },
  { pattern: /attack/i, subcategory: SUBCATEGORIES.SECURITY },

  // API Security
  { pattern: /^api[-_]?definition/i, subcategory: SUBCATEGORIES.API_SECURITY },
  { pattern: /^api[-_]?discovery/i, subcategory: SUBCATEGORIES.API_SECURITY },
  { pattern: /^api[-_]?crawler/i, subcategory: SUBCATEGORIES.API_SECURITY },
  { pattern: /^api[-_]?testing/i, subcategory: SUBCATEGORIES.API_SECURITY },
  { pattern: /^api[-_]?group/i, subcategory: SUBCATEGORIES.API_SECURITY },
  { pattern: /app[-_]?api[-_]?group/i, subcategory: SUBCATEGORIES.API_SECURITY },
  { pattern: /api[-_]?endpoint[-_]?protection/i, subcategory: SUBCATEGORIES.API_SECURITY },
  { pattern: /^swagger/i, subcategory: SUBCATEGORIES.API_SECURITY },
  { pattern: /^openapi/i, subcategory: SUBCATEGORIES.API_SECURITY },
  { pattern: /^graphql/i, subcategory: SUBCATEGORIES.API_SECURITY },
  { pattern: /oas[-_]?validation/i, subcategory: SUBCATEGORIES.API_SECURITY },
  { pattern: /learnt[-_]?schema/i, subcategory: SUBCATEGORIES.API_SECURITY },
  { pattern: /schema[-_]?update/i, subcategory: SUBCATEGORIES.API_SECURITY },

  // Certificates
  { pattern: /^certificate/i, subcategory: SUBCATEGORIES.CERTIFICATES },
  { pattern: /^ca[-_]?certificate/i, subcategory: SUBCATEGORIES.CERTIFICATES },
  { pattern: /trusted[-_]?ca/i, subcategory: SUBCATEGORIES.CERTIFICATES },
  { pattern: /^tls[-_]/i, subcategory: SUBCATEGORIES.CERTIFICATES },
  { pattern: /^secret[-_]/i, subcategory: SUBCATEGORIES.CERTIFICATES },
  { pattern: /^secret$/i, subcategory: SUBCATEGORIES.CERTIFICATES },
  { pattern: /blindfold/i, subcategory: SUBCATEGORIES.CERTIFICATES },
  { pattern: /^crl$/i, subcategory: SUBCATEGORIES.CERTIFICATES },
  { pattern: /decrypt[-_]?secret/i, subcategory: SUBCATEGORIES.CERTIFICATES },
  { pattern: /public[-_]?key/i, subcategory: SUBCATEGORIES.CERTIFICATES },
  { pattern: /download[-_]?certificate/i, subcategory: SUBCATEGORIES.CERTIFICATES },

  // Kubernetes
  { pattern: /^k8s[-_]/i, subcategory: SUBCATEGORIES.KUBERNETES },
  { pattern: /^k8s$/i, subcategory: SUBCATEGORIES.KUBERNETES },
  { pattern: /virtual[-_]?k8s/i, subcategory: SUBCATEGORIES.KUBERNETES },
  { pattern: /^vk8s/i, subcategory: SUBCATEGORIES.KUBERNETES },
  { pattern: /workload/i, subcategory: SUBCATEGORIES.KUBERNETES },
  { pattern: /^deployment/i, subcategory: SUBCATEGORIES.KUBERNETES },
  { pattern: /^pod$/i, subcategory: SUBCATEGORIES.KUBERNETES },
  { pattern: /^daemonset/i, subcategory: SUBCATEGORIES.KUBERNETES },
  { pattern: /^cronjob/i, subcategory: SUBCATEGORIES.KUBERNETES },
  { pattern: /^job$/i, subcategory: SUBCATEGORIES.KUBERNETES },
  { pattern: /^configmap/i, subcategory: SUBCATEGORIES.KUBERNETES },
  { pattern: /persistentvolume/i, subcategory: SUBCATEGORIES.KUBERNETES },
  { pattern: /^cluster$/i, subcategory: SUBCATEGORIES.KUBERNETES },
  { pattern: /dc[-_]?cluster/i, subcategory: SUBCATEGORIES.KUBERNETES },
  { pattern: /kubeconfig/i, subcategory: SUBCATEGORIES.KUBERNETES },
  { pattern: /container[-_]?registry/i, subcategory: SUBCATEGORIES.KUBERNETES },
  { pattern: /^replicaset/i, subcategory: SUBCATEGORIES.KUBERNETES },

  // Cloud Resources
  { pattern: /^cloud[-_]?credential/i, subcategory: SUBCATEGORIES.CLOUD_RESOURCES },
  { pattern: /^cloud[-_]?region/i, subcategory: SUBCATEGORIES.CLOUD_RESOURCES },
  { pattern: /^cloud[-_]?connect/i, subcategory: SUBCATEGORIES.CLOUD_RESOURCES },
  { pattern: /^cloud[-_]?elastic/i, subcategory: SUBCATEGORIES.CLOUD_RESOURCES },
  { pattern: /^cloud[-_]?link/i, subcategory: SUBCATEGORIES.CLOUD_RESOURCES },
  { pattern: /discover[-_]?vpc/i, subcategory: SUBCATEGORIES.CLOUD_RESOURCES },

  // Load Balancing
  { pattern: /http[-_]?loadbalancer/i, subcategory: SUBCATEGORIES.LOAD_BALANCING },
  { pattern: /tcp[-_]?loadbalancer/i, subcategory: SUBCATEGORIES.LOAD_BALANCING },
  { pattern: /udp[-_]?loadbalancer/i, subcategory: SUBCATEGORIES.LOAD_BALANCING },
  { pattern: /cdn[-_]?loadbalancer/i, subcategory: SUBCATEGORIES.LOAD_BALANCING },
  { pattern: /create[-_]?http[-_]?load/i, subcategory: SUBCATEGORIES.LOAD_BALANCING },
  { pattern: /create[-_]?tcp[-_]?load/i, subcategory: SUBCATEGORIES.LOAD_BALANCING },
  { pattern: /origin[-_]?pool/i, subcategory: SUBCATEGORIES.LOAD_BALANCING },
  { pattern: /healthcheck/i, subcategory: SUBCATEGORIES.LOAD_BALANCING },
  { pattern: /^endpoint$/i, subcategory: SUBCATEGORIES.LOAD_BALANCING },
  { pattern: /^route$/i, subcategory: SUBCATEGORIES.LOAD_BALANCING },
  { pattern: /route[-_]?table/i, subcategory: SUBCATEGORIES.LOAD_BALANCING },
  { pattern: /virtual[-_]?host/i, subcategory: SUBCATEGORIES.LOAD_BALANCING },
  { pattern: /cache[-_]?purge/i, subcategory: SUBCATEGORIES.LOAD_BALANCING },
  { pattern: /cdn[-_]?cache/i, subcategory: SUBCATEGORIES.LOAD_BALANCING },
  { pattern: /dos[-_]?automitigation/i, subcategory: SUBCATEGORIES.LOAD_BALANCING },
  { pattern: /^loadbalancer$/i, subcategory: SUBCATEGORIES.LOAD_BALANCING },
  { pattern: /lb[-_]?cache/i, subcategory: SUBCATEGORIES.LOAD_BALANCING },
  { pattern: /^nginx[-_]/i, subcategory: SUBCATEGORIES.LOAD_BALANCING },

  // Organization - Only truly organizational resources
  { pattern: /^namespace$/i, subcategory: SUBCATEGORIES.ORGANIZATION },
  { pattern: /^namespace[-_]role/i, subcategory: SUBCATEGORIES.ORGANIZATION },
  { pattern: /^tenant/i, subcategory: SUBCATEGORIES.ORGANIZATION },
  { pattern: /^user[-_]?group/i, subcategory: SUBCATEGORIES.ORGANIZATION },
  { pattern: /^user[-_]?role/i, subcategory: SUBCATEGORIES.ORGANIZATION },
  { pattern: /^user[-_]?setting/i, subcategory: SUBCATEGORIES.ORGANIZATION },
  { pattern: /^rbac/i, subcategory: SUBCATEGORIES.ORGANIZATION },
  { pattern: /^contact$/i, subcategory: SUBCATEGORIES.ORGANIZATION },
  { pattern: /^known[-_]?label/i, subcategory: SUBCATEGORIES.ORGANIZATION },
  { pattern: /^implicit[-_]?label/i, subcategory: SUBCATEGORIES.ORGANIZATION },
  { pattern: /^scim/i, subcategory: SUBCATEGORIES.ORGANIZATION },
  { pattern: /^login$/i, subcategory: SUBCATEGORIES.ORGANIZATION },
  { pattern: /^signup/i, subcategory: SUBCATEGORIES.ORGANIZATION },
  { pattern: /^password/i, subcategory: SUBCATEGORIES.ORGANIZATION },

  // Authentication
  { pattern: /^oidc/i, subcategory: SUBCATEGORIES.AUTHENTICATION },
  { pattern: /^oauth/i, subcategory: SUBCATEGORIES.AUTHENTICATION },
  { pattern: /^saml/i, subcategory: SUBCATEGORIES.AUTHENTICATION },
  { pattern: /^ldap/i, subcategory: SUBCATEGORIES.AUTHENTICATION },
  { pattern: /^authentication$/i, subcategory: SUBCATEGORIES.AUTHENTICATION },
  { pattern: /^api[-_]?credential/i, subcategory: SUBCATEGORIES.AUTHENTICATION },

  // BIG-IP Integration
  { pattern: /^bigip/i, subcategory: SUBCATEGORIES.BIGIP_INTEGRATION },
  { pattern: /^big[-_]?ip/i, subcategory: SUBCATEGORIES.BIGIP_INTEGRATION },
  { pattern: /^irule/i, subcategory: SUBCATEGORIES.BIGIP_INTEGRATION },
  { pattern: /^apm$/i, subcategory: SUBCATEGORIES.BIGIP_INTEGRATION },

  // Service Mesh
  { pattern: /^segment$/i, subcategory: SUBCATEGORIES.SERVICE_MESH },
  { pattern: /^segment[-_]/i, subcategory: SUBCATEGORIES.SERVICE_MESH },
  { pattern: /forwarding[-_]?class/i, subcategory: SUBCATEGORIES.SERVICE_MESH },
  { pattern: /service[-_]?mesh/i, subcategory: SUBCATEGORIES.SERVICE_MESH },
  { pattern: /srv6/i, subcategory: SUBCATEGORIES.SERVICE_MESH },

  // Infrastructure Protection
  { pattern: /^infraprotect/i, subcategory: SUBCATEGORIES.INFRASTRUCTURE_PROTECTION },
  { pattern: /^ddos/i, subcategory: SUBCATEGORIES.INFRASTRUCTURE_PROTECTION },
  { pattern: /l7ddos/i, subcategory: SUBCATEGORIES.INFRASTRUCTURE_PROTECTION },

  // Subscriptions
  { pattern: /subscription/i, subcategory: SUBCATEGORIES.SUBSCRIPTIONS },
  { pattern: /^addon[-_]/i, subcategory: SUBCATEGORIES.SUBSCRIPTIONS },
  { pattern: /^addon$/i, subcategory: SUBCATEGORIES.SUBSCRIPTIONS },
  { pattern: /^billing/i, subcategory: SUBCATEGORIES.SUBSCRIPTIONS },
  { pattern: /^payment/i, subcategory: SUBCATEGORIES.SUBSCRIPTIONS },
  { pattern: /^invoice/i, subcategory: SUBCATEGORIES.SUBSCRIPTIONS },
  { pattern: /^plan[-_]/i, subcategory: SUBCATEGORIES.SUBSCRIPTIONS },
  { pattern: /^plan$/i, subcategory: SUBCATEGORIES.SUBSCRIPTIONS },
  { pattern: /^quota$/i, subcategory: SUBCATEGORIES.SUBSCRIPTIONS },
  { pattern: /^usage[-_]/i, subcategory: SUBCATEGORIES.SUBSCRIPTIONS },
  { pattern: /^usage$/i, subcategory: SUBCATEGORIES.SUBSCRIPTIONS },

  // Integrations
  { pattern: /^external[-_]?connector/i, subcategory: SUBCATEGORIES.INTEGRATIONS },
  { pattern: /^webhook/i, subcategory: SUBCATEGORIES.INTEGRATIONS },
  { pattern: /^third[-_]?party/i, subcategory: SUBCATEGORIES.INTEGRATIONS },
  { pattern: /code[-_]?base[-_]?integration/i, subcategory: SUBCATEGORIES.INTEGRATIONS },
  { pattern: /^jira/i, subcategory: SUBCATEGORIES.INTEGRATIONS },
  { pattern: /^ticket/i, subcategory: SUBCATEGORIES.INTEGRATIONS },

  // VPN
  { pattern: /^ike/i, subcategory: SUBCATEGORIES.VPN },
  { pattern: /^ipsec/i, subcategory: SUBCATEGORIES.VPN },
  { pattern: /^tunnel$/i, subcategory: SUBCATEGORIES.VPN },
  { pattern: /^tunnel[-_]/i, subcategory: SUBCATEGORIES.VPN },
  { pattern: /^vpn/i, subcategory: SUBCATEGORIES.VPN },

  // AI/ML
  { pattern: /^ai[-_]/i, subcategory: SUBCATEGORIES.AI_ML },
  { pattern: /^ml[-_]/i, subcategory: SUBCATEGORIES.AI_ML },

  // Applications
  { pattern: /^app[-_]?type/i, subcategory: SUBCATEGORIES.APPLICATIONS },
  { pattern: /^app[-_]?setting/i, subcategory: SUBCATEGORIES.APPLICATIONS },
  { pattern: /^application/i, subcategory: SUBCATEGORIES.APPLICATIONS },
  { pattern: /^protected[-_]?application/i, subcategory: SUBCATEGORIES.APPLICATIONS },
  { pattern: /^app[-_]?inventory/i, subcategory: SUBCATEGORIES.APPLICATIONS },
  { pattern: /all[-_]?application[-_]?inventory/i, subcategory: SUBCATEGORIES.APPLICATIONS },
  { pattern: /discovered[-_]?service/i, subcategory: SUBCATEGORIES.APPLICATIONS },
  { pattern: /^discovery$/i, subcategory: SUBCATEGORIES.APPLICATIONS },
  { pattern: /protected[-_]?domain/i, subcategory: SUBCATEGORIES.APPLICATIONS },
  { pattern: /mitigated[-_]?domain/i, subcategory: SUBCATEGORIES.APPLICATIONS },
  { pattern: /detected[-_]?domain/i, subcategory: SUBCATEGORIES.APPLICATIONS },
  { pattern: /domain[-_]?detail/i, subcategory: SUBCATEGORIES.APPLICATIONS },
  { pattern: /all[-_]?ns[-_]?service/i, subcategory: SUBCATEGORIES.APPLICATIONS },
  { pattern: /list[-_]?service$/i, subcategory: SUBCATEGORIES.APPLICATIONS },
];

/**
 * Exact resource name to subcategory mapping
 * Highest priority - overrides both patterns and domain mapping
 */
const EXACT_RESOURCE_MAP: Record<string, Subcategory> = {
  // Load Balancing
  "http-loadbalancer": SUBCATEGORIES.LOAD_BALANCING,
  "tcp-loadbalancer": SUBCATEGORIES.LOAD_BALANCING,
  "udp-loadbalancer": SUBCATEGORIES.LOAD_BALANCING,
  "origin-pool": SUBCATEGORIES.LOAD_BALANCING,
  healthcheck: SUBCATEGORIES.LOAD_BALANCING,

  // DNS
  "dns-zone": SUBCATEGORIES.DNS,
  "dns-loadbalancer": SUBCATEGORIES.DNS,

  // Security
  "app-firewall": SUBCATEGORIES.SECURITY,
  "service-policy": SUBCATEGORIES.SECURITY,
  "rate-limiter": SUBCATEGORIES.SECURITY,

  // Organization
  namespace: SUBCATEGORIES.ORGANIZATION,
  tenant: SUBCATEGORIES.ORGANIZATION,

  // Certificates
  certificate: SUBCATEGORIES.CERTIFICATES,
  secret: SUBCATEGORIES.CERTIFICATES,

  // Sites
  "aws-vpc-site": SUBCATEGORIES.SITES,
  "azure-vnet-site": SUBCATEGORIES.SITES,
  "gcp-vpc-site": SUBCATEGORIES.SITES,

  // Kubernetes
  "k8s-cluster": SUBCATEGORIES.KUBERNETES,
  "virtual-k8s": SUBCATEGORIES.KUBERNETES,
};

/**
 * Get subcategory for a tool based on its domain and resource
 *
 * Priority:
 * 1. Exact resource name match
 * 2. Resource pattern match
 * 3. Domain-based mapping
 * 4. Default to General
 */
export function getSubcategory(domain: string, resource: string): Subcategory {
  // 1. Check exact resource match (highest priority)
  const normalizedResource = resource.toLowerCase();
  if (normalizedResource in EXACT_RESOURCE_MAP) {
    return EXACT_RESOURCE_MAP[normalizedResource];
  }

  // 2. Check resource patterns
  for (const { pattern, subcategory } of RESOURCE_PATTERNS) {
    if (pattern.test(resource)) {
      return subcategory;
    }
  }

  // 3. Fall back to domain mapping
  const normalizedDomain = domain.toLowerCase();
  if (normalizedDomain in DOMAIN_MAP) {
    return DOMAIN_MAP[normalizedDomain];
  }

  // 4. Default
  return SUBCATEGORIES.GENERAL;
}

/**
 * Convert subcategory to kebab-case directory name
 */
export function subcategoryToDirectory(subcategory: Subcategory): string {
  return subcategory
    .toLowerCase()
    .replace(/\//g, "-")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

/**
 * Convert resource name to human-readable title
 */
export function resourceToTitle(resource: string): string {
  return resource
    .split("-")
    .map((word) => {
      // Handle acronyms
      const acronyms = ["http", "https", "tcp", "udp", "dns", "api", "ip", "waf", "tls", "ssl", "k8s", "vpc", "vnet", "gcp", "aws", "azure"];
      if (acronyms.includes(word.toLowerCase())) {
        return word.toUpperCase();
      }
      // Capitalize first letter
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

/**
 * Get all unique subcategories that have tools
 */
export function getAllUsedSubcategories(
  tools: Array<{ domain: string; resource: string }>
): Subcategory[] {
  const used = new Set<Subcategory>();
  for (const tool of tools) {
    used.add(getSubcategory(tool.domain, tool.resource));
  }
  return Array.from(used).sort();
}
