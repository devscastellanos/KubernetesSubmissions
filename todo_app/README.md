# Todo app

Servidor web Express. El puerto se configura con la variable de entorno `PORT` (por defecto 3000).

## Ejecutar en local

```bash
npm install
PORT=4000 npm start
```

## Ejecutar en Kubernetes

```bash
k3d cluster create --port 8082:30080@agent:0 -p 8081:80@loadbalancer --agents 2
kubectl apply -f manifests/
# abrir http://localhost:8081
```

El puerto se define con la variable `PORT` en `manifests/deployment.yaml`.

## Probar en el clúster

```bash
kubectl port-forward deployment/todo-app-dep 3003:3000
# abrir http://localhost:3003
```

## Imagen aleatoria

La app muestra una imagen de https://picsum.photos cacheada en un PersistentVolume (`todo-claim`).
La imagen se renueva cada 10 minutos (la vieja se sirve una vez más tras expirar).
`GET /shutdown` tumba el contenedor para probar que la imagen persiste.

Requiere:

```bash
docker exec k3d-k3s-default-agent-0 mkdir -p /tmp/kube-todo
docker exec k3d-k3s-default-agent-0 chmod 777 /tmp/kube-todo
kubectl apply -f ../volumes/
```
