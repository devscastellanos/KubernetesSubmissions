# Todo app

Servidor web Express. El puerto se configura con la variable de entorno `PORT` (por defecto 3000).

## Ejecutar en local

```bash
npm install
PORT=4000 npm start
```

## Ejecutar en Kubernetes

```bash
kubectl apply -f manifests/deployment.yaml
kubectl logs deployment/todo-app-dep
```

El puerto se define con la variable `PORT` en `manifests/deployment.yaml`.
