Deploying Grafana in Kubernetes without Helm and with LDAP authentication involves creating and applying the necessary Kubernetes manifests manually. Here are the steps:

### 1. Create the LDAP Configuration

Create an `ldap.toml` configuration file with your LDAP settings.

```toml
[[servers]]
# Ldap server host (specify multiple hosts space separated)
host = "ldap.example.com"
# Default port is 389 or 636 if use_ssl = true
port = 389
# Set to true if ldap server supports TLS
use_ssl = false
start_tls = false
ssl_skip_verify = false

# Search user bind dn
bind_dn = "cn=admin,dc=example,dc=com"
# Search user bind password
bind_password = 'admin'

# User search base
search_base = "dc=example,dc=com"
# Search filter, for example "(cn=%s)" or "(sAMAccountName=%s)" or "(uid=%s)"
search_filter = "(uid=%s)"

# An array of base dns to search through
group_search_base_dns = ["ou=groups,dc=example,dc=com"]

# Specify names of the ldap attributes your ldap uses
[servers.attributes]
name = "givenName"
surname = "sn"
username = "cn"
member_of = "memberOf"
email =  "email"
```

### 2. Create a Kubernetes Secret for the LDAP Configuration

Store the `ldap.toml` configuration in a Kubernetes secret.

```sh
kubectl create secret generic grafana-ldap --from-file=ldap.toml
```

### 3. Create a ConfigMap for Grafana Configuration

Create a `grafana-configmap.yaml` file with Grafana configuration.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: grafana-config
data:
  grafana.ini: |
    [security]
    admin_user = admin
    admin_password = YOUR_ADMIN_PASSWORD

    [auth.ldap]
    enabled = true
    config_file = /etc/grafana/ldap.toml
```

Replace `YOUR_ADMIN_PASSWORD` with a secure password.

Apply the ConfigMap:

```sh
kubectl apply -f grafana-configmap.yaml
```

### 4. Create the Deployment for Grafana

Create a `grafana-deployment.yaml` file with the Grafana deployment configuration.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: grafana
  labels:
    app: grafana
spec:
  replicas: 1
  selector:
    matchLabels:
      app: grafana
  template:
    metadata:
      labels:
        app: grafana
    spec:
      containers:
      - name: grafana
        image: grafana/grafana:latest
        ports:
        - containerPort: 3000
        volumeMounts:
        - name: grafana-config
          mountPath: /etc/grafana/grafana.ini
          subPath: grafana.ini
        - name: grafana-ldap
          mountPath: /etc/grafana/ldap.toml
          subPath: ldap.toml
        env:
        - name: GF_SECURITY_ADMIN_USER
          valueFrom:
            secretKeyRef:
              name: grafana-config
              key: admin_user
        - name: GF_SECURITY_ADMIN_PASSWORD
          valueFrom:
            secretKeyRef:
              name: grafana-config
              key: admin_password
      volumes:
      - name: grafana-config
        configMap:
          name: grafana-config
      - name: grafana-ldap
        secret:
          secretName: grafana-ldap
```

Apply the Deployment:

```sh
kubectl apply -f grafana-deployment.yaml
```

### 5. Create a Service to Expose Grafana

Create a `grafana-service.yaml` file to expose Grafana.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: grafana
spec:
  type: LoadBalancer
  ports:
    - port: 80
      targetPort: 3000
      protocol: TCP
  selector:
    app: grafana
```

Apply the Service configuration:

```sh
kubectl apply -f grafana-service.yaml
```

### 6. Access Grafana

Once the service is created, you can access Grafana using the external IP provided by the LoadBalancer. For a NodePort service, use the node's IP address and the NodePort.

### 7. Verify LDAP Authentication

Log in to Grafana using an LDAP user to verify that LDAP authentication is working correctly.

### Summary

By following these steps, you will deploy Grafana in your Kubernetes cluster with LDAP authentication enabled. Adjust the configurations as needed based on your specific LDAP setup and Kubernetes environment.
