# Ping-pong

Responde `pong N` en `GET /pingpong` e incrementa un contador en memoria.

## Ejecutar en Kubernetes

```bash
kubectl apply -f manifests/
kubectl apply -f ../log_output/manifests/   # Ingress compartido
# abrir http://localhost:8081/pingpong
```
