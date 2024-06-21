# simple12306-frontend

一个简单模拟售票系统的前端，根据后端接口开发

## （新增）在Docker中运行

### 构建镜像

```sh
docker build -t simple12306-frontend .
```

### 运行容器

```sh
docker run -p 5173:5173 --name simple12306-frontend simple12306-frontend
```

## 运行项目

### 安装依赖

```sh
npm install
```

### 运行开发服务器

```sh
npm run dev
```

### 构建项目

```sh
npm run build
```
