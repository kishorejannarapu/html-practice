To configure Grafana for LDAP authentication while running on Docker, you'll need to follow these steps:

1. **Create an LDAP Configuration File**:
   Create a file named `ldap.toml` with your LDAP settings. Here is an example configuration:

   ```toml
   [[servers]]
   # Ldap server host (specify multiple hosts space separated)
   host = "ldap.yourdomain.com"
   # Default port is 389 or 636 if use_ssl = true
   port = 389
   # Set to true if ldap server supports TLS
   use_ssl = false
   # Set to true if connect ldap server with STARTTLS pattern (create connection in insecure, then upgrade to secure connection with TLS)
   start_tls = false
   # set to true if you want to skip ssl cert validation
   ssl_skip_verify = false
   # set to the path to your root CA certificate or leave unset to use system defaults
   root_ca_cert = "/path/to/certificate.crt"
   # Authentication against LDAP servers requiring client certificates
   client_cert = "/path/to/client.crt"
   client_key = "/path/to/client.key"

   # Search user bind dn
   bind_dn = "cn=admin,dc=yourdomain,dc=com"
   # Search user bind password
   bind_password = 'yourpassword'

   # Search filters that will return the user
   search_filter = "(uid=%s)"

   # An array of base dns to search through
   search_base_dns = ["ou=users,dc=yourdomain,dc=com"]

   # Specify names of the ldap attributes your ldap uses
   [servers.attributes]
   name = "givenName"
   surname = "sn"
   username = "cn"
   member_of = "memberOf"
   email = "email"

   # Map ldap groups to grafana org roles
   [[servers.group_mappings]]
   group_dn = "cn=admins,ou=groups,dc=yourdomain,dc=com"
   org_role = "Admin"

   [[servers.group_mappings]]
   group_dn = "cn=editors,ou=groups,dc=yourdomain,dc=com"
   org_role = "Editor"

   [[servers.group_mappings]]
   group_dn = "cn=viewers,ou=groups,dc=yourdomain,dc=com"
   org_role = "Viewer"
   ```

2. **Modify Grafana Configuration**:
   Create a custom `grafana.ini` file or modify the existing one to enable LDAP authentication and point to your `ldap.toml` file.

   Here is an example `grafana.ini` configuration:

   ```ini
   [auth.generic_oauth]
   enabled = true
   allow_sign_up = true

   [auth.ldap]
   enabled = true
   config_file = /etc/grafana/ldap.toml
   allow_sign_up = true
   ```

3. **Prepare Docker Configuration**:
   Create a Docker Compose file to mount the `ldap.toml` and `grafana.ini` files into the container.

   Here’s an example `docker-compose.yml`:

   ```yaml
   version: '3'
   services:
     grafana:
       image: grafana/grafana:latest
       container_name: grafana
       ports:
         - "3000:3000"
       volumes:
         - ./grafana.ini:/etc/grafana/grafana.ini
         - ./ldap.toml:/etc/grafana/ldap.toml
       environment:
         - GF_AUTH_LDAP_ENABLED=true
         - GF_AUTH_LDAP_CONFIG_FILE=/etc/grafana/ldap.toml
   ```

4. **Deploy Grafana**:
   Run the following command to start your Grafana instance with the specified configuration:

   ```sh
   docker-compose up -d
   ```

This setup mounts your `ldap.toml` and `grafana.ini` files into the Docker container, enabling LDAP authentication for Grafana. Adjust the `ldap.toml` file to match your LDAP server's settings and user structure.