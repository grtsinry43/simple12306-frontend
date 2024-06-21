FROM node:lts-alpine
LABEL authors="grtsinry43"

# 设置工作目录
WORKDIR /app

# 将package.json和package-lock.json复制到工作目录
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 全局安装serve
RUN npm install -g serve

# 将项目源代码复制到工作目录
COPY . .

# 构建项目
RUN npm run build

# 暴露端口
EXPOSE 3000

# 运行项目
CMD [ "serve", "-s", "dist" ]
