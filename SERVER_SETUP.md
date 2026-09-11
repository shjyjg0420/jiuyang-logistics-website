# 九阳国际物流 (Jiuyang Logistics) - 服务器设置指南

## 📋 目录
- [快速开始](#快速开始)
- [系统要求](#系统要求)
- [安装步骤](#安装步骤)
- [环境配置](#环境配置)
- [使用 Docker 运行](#使用-docker-运行)
- [API 端点](#api-端点)
- [项目结构](#项目结构)
- [生产部署](#生产部署)

---

## 🚀 快速开始

### 本地开发环境

```bash
# 1. 克隆仓库
git clone https://github.com/shjyjg0420/jiuyang-logistics-website.git
cd jiuyang-logistics-website

# 2. 安装依赖
npm install

# 3. 复制环境配置文件
cp .env.example .env

# 4. 启动开发服务器
npm run dev
```

服务器将在 `http://localhost:5000` 运行

---

## 📦 系统要求

- **Node.js**: v18.0.0 或更高版本
- **npm**: v9.0.0 或更高版本
- **MongoDB**: v5.0 或更高版本
- **Docker** (可选): 最新版本
- **Docker Compose** (可选): v1.29 或更高版本

---

## 📥 安装步骤

### 1. 安装 Node.js 和 npm

#### Windows/macOS
访问 [nodejs.org](https://nodejs.org/) 下载 LTS 版本

#### Linux (Ubuntu/Debian)
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 2. 安装依赖包

```bash
npm install
```

### 3. 安装 MongoDB

#### 使用 Docker (推荐)
```bash
docker pull mongo:7.0
```

#### 或本地安装
- **Windows**: 访问 [mongodb.com/download](https://www.mongodb.com/try/download/community)
- **macOS**: `brew install mongodb-community`
- **Linux**: 参考 [官方文档](https://docs.mongodb.com/manual/installation/)

---

## ⚙️ 环境配置

### 1. 复制环境模板
```bash
cp .env.example .env
```

### 2. 编辑 `.env` 文件
```env
# 服务器配置
NODE_ENV=development
PORT=5000

# 数据库配置
MONGODB_URI=mongodb://localhost:27017/jiuyang-logistics

# JWT 配置
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# CORS 配置
CORS_ORIGIN=http://localhost:3000,http://localhost:3001

# 邮件配置
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# AWS S3 配置 (文档上传)
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_S3_BUCKET=jiuyang-logistics-uploads
```

### 3. 生成安全的 JWT_SECRET
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 🐳 使用 Docker 运行

### 单容器运行

```bash
# 构建镜像
docker build -t jiuyang-logistics-server .

# 运行容器
docker run -p 5000:5000 \
  --env MONGODB_URI=mongodb://localhost:27017/jiuyang-logistics \
  jiuyang-logistics-server
```

### 完整堆栈运行 (推荐)

```bash
# 启动所有服务 (应用 + MongoDB + Mongo Express)
docker-compose up -d

# 查看日志
docker-compose logs -f app

# 停止所有服务
docker-compose down

# 清理所有数据
docker-compose down -v
```

#### 访问服务

- **应用服务器**: http://localhost:5000
- **健康检查**: http://localhost:5000/health
- **Mongo Express 数据库管理**: http://localhost:8081

---

## 📡 API 端点

### 健康检查
```
GET /health
```

### 认证 (Authentication)
```
POST   /api/auth/register      - 用户注册
POST   /api/auth/login         - 用户登录
POST   /api/auth/logout        - 用户登出
POST   /api/auth/refresh-token - 刷新令牌
```

### 用户 (Users)
```
GET    /api/users/profile      - 获取用户个人资料
PUT    /api/users/profile      - 更新用户个人资料
GET    /api/users              - 列出所有用户 (仅管理员)
DELETE /api/users/:id          - 删除用户
```

### 货运 (Shipments)
```
POST   /api/shipments          - 创建货运单
GET    /api/shipments          - 列出货运单
GET    /api/shipments/:id      - 获取货运单详情
PUT    /api/shipments/:id      - 更新货运单
DELETE /api/shipments/:id      - 取消货运单
```

### 报价 (Quotes)
```
POST   /api/quotes/request     - 申请运费报价
GET    /api/quotes/:id         - 获取报价详情
GET    /api/quotes             - 列出报价
POST   /api/quotes/:id/accept  - 接受报价
```

### 物流追踪 (Tracking)
```
GET    /api/tracking/:trackingNumber        - 追踪货运
GET    /api/tracking/:trackingNumber/history - 获取追踪历史
```

---

## 📁 项目结构

```
jiuyang-logistics-website/
├── server.js              # 主服务器文件
├── package.json          # 依赖配置
├── Dockerfile            # Docker 镜像配置
├── docker-compose.yml    # Docker Compose 配置
├── .env.example          # 环境变量模板
├── .gitignore           # Git 忽略配置
���── .dockerignore        # Docker 忽略配置
├── SERVER_SETUP.md      # 本文件
├── config/
│   └── database.js      # 数据库连接配置
├── routes/
│   ├── auth.js          # 认证路由
│   ├── users.js         # 用户路由
│   ├── shipments.js     # 货运路由
│   ├── quotes.js        # 报价路由
│   └── tracking.js      # 追踪路由
└── models/              # 数据模型 (待创建)
    ├── User.js
    ├── Shipment.js
    ├── Quote.js
    └── Tracking.js
```

---

## 🔧 开发命令

```bash
# 开发模式 (自动重启)
npm run dev

# 生产模式
npm start

# 运行测试
npm test

# 代码检查
npm run lint

# 查看依赖版本
npm list
```

---

## 🚀 生产部署

### 使用 Docker 部署到云服务器

#### 1. 构建镜像
```bash
docker build -t jiuyang-logistics-server:1.0.0 .
```

#### 2. 推送到容器仓库 (如 Docker Hub)
```bash
# 登录 Docker Hub
docker login

# 标记镜像
docker tag jiuyang-logistics-server:1.0.0 your-username/jiuyang-logistics:1.0.0

# 推送镜像
docker push your-username/jiuyang-logistics:1.0.0
```

#### 3. 在生产环境运行
```bash
docker run -d \
  --name jiuyang-logistics \
  -p 80:5000 \
  --env NODE_ENV=production \
  --env MONGODB_URI=mongodb://prod-mongo:27017/jiuyang-logistics \
  --env JWT_SECRET=your-production-secret \
  --restart always \
  your-username/jiuyang-logistics:1.0.0
```

### 使用 PM2 进程管理器 (Node.js 原生)

```bash
# 全局安装 PM2
npm install -g pm2

# 启动应用
pm2 start server.js --name "jiuyang-logistics"

# 开机自启
pm2 startup
pm2 save

# 监控日志
pm2 logs jiuyang-logistics

# 查看进程状态
pm2 status
```

### Nginx 反向代理配置

```nginx
server {
    listen 80;
    server_name api.jylogistics.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

---

## 📊 监控和日志

### 查看应用日志
```bash
# Docker Compose
docker-compose logs -f app

# PM2
pm2 logs jiuyang-logistics
```

### 访问 MongoDB 管理界面
```
http://localhost:8081
```

### 性能监控
```bash
# 使用 PM2 monit
pm2 monit
```

---

## 🐛 故障排除

### 问题: 端口已被占用
```bash
# 查找占用 5000 端口的进程
lsof -i :5000

# 杀死进程
kill -9 <PID>

# 或更改 PORT 环境变量
PORT=3000 npm run dev
```

### 问题: 数据库连接失败
```bash
# 检查 MongoDB 是否运行
mongosh

# 检查环境变量
cat .env | grep MONGODB_URI

# 使用 Docker 健康检查
docker-compose ps
```

### 问题: CORS 错误
- 编辑 `.env` 文件中的 `CORS_ORIGIN`
- 确保前端 URL 在允许列表中

---

## 📝 环境检查清单

- [ ] Node.js v18+ 已安装
- [ ] npm v9+ 已安装
- [ ] MongoDB 已安装并运行
- [ ] `.env` 文件已创建并配置
- [ ] `npm install` 已执行
- [ ] 端口 5000 未被占用
- [ ] JWT_SECRET 已设置
- [ ] 数据库 URI 正确

---

## 🔗 相关资源

- [Express.js 文档](https://expressjs.com/)
- [MongoDB 文档](https://docs.mongodb.com/)
- [Docker 文档](https://docs.docker.com/)
- [Node.js 最佳实践](https://nodejs.org/en/docs/guides/nodejs-performance/)

---

## 📞 支持

如有问题，请在 GitHub 上提交 Issue 或联系开发团队。

**最后更新**: 2024年9月11日
