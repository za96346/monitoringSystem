## 監控系統

# 後端
> Node Typescript Express
> mysql

# 前端
> React Typescript

# 開發版
> Esp32

# docker build
```sh
docker build -t  localhost:5000/monitor_frontend:monitor_frontend_latest -f ./dockerfile .
docker push localhost:5000/monitor_frontend:monitor_frontend_latest

docker build -t  localhost:5000/monitor_backend:monitor_backend_latest -f ./dockerfile .
docker push localhost:5000/monitor_backend:monitor_backend_latest
```