# Log output

Dos contenedores en un mismo pod que comparten un volumen `emptyDir`:

- `writer/`: genera un UUID al iniciar y escribe `timestamp: uuid` en `files/log.txt` cada 5 segundos.
- `reader/`: expone el contenido del archivo en `GET /`.

## Ejecutar en Kubernetes

```bash
kubectl apply -f manifests/
# abrir http://localhost:8081
kubectl logs -f deployment/log-output-dep -c log-writer
```
