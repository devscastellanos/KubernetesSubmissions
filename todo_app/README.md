# Todo app

Servidor web Express. El puerto se configura con la variable de entorno `PORT` (por defecto 3000).

## Ejecutar en local

```bash
npm install
PORT=4000 npm start
```

## Ejecutar en Kubernetes

```bash
kubectl create deployment todo-app-dep --image=devscastellanos/todo-app:1.2
kubectl logs deployment/todo-app-dep
```
