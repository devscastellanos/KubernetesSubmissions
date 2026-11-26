# Log output

Genera un UUID al iniciar y lo imprime cada 5 segundos con un timestamp.

## Ejecutar en Kubernetes

```bash
kubectl create deployment log-output-dep --image=devscastellanos/log-output:1.1
kubectl logs -f deployment/log-output-dep
```

## Construir la imagen

```bash
docker build -t devscastellanos/log-output:1.1 .
docker push devscastellanos/log-output:1.1
```
