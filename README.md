# 九阳国际物流 (Jiuyang Logistics) - 服务器

> Professional B2B freight forwarding website for Shanghai Jiuyang International Logistics - sea, air & express freight services from China to 180+ countries

[![Node.js](https://img.shields.io/badge/Node.js-v18+-green?logo=node.js)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express-v4.18+-blue?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-v7.0+-green?logo=mongodb)](https://www.mongodb.com/)
[![Docker](https://img.shields.io/badge/Docker-Supported-blue?logo=docker)](https://www.docker.com/)
[![SSH](https://img.shields.io/badge/SSH-Enabled-orange?logo=openssh)](https://www.openssh.com/)
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)

## 📋 快速导航

- [🚀 快速开始](#快速开始)
- [📦 系统要求](#系统要求)
- [🔐 SSH 服务器设置](#ssh-服务器设置)
- [🐳 Docker 部署](#docker-部署)
- [📡 API 文档](#api-文档)
- [🔧 配置指南](#配置指南)
- [🐛 故障排除](#故障排除)

## 🚀 快速开始

### 本地开发

```bash
# 1. 克隆仓库
git clone https://github.com/shjyjg0420/jiuyang-logistics-website.git
cd jiuyang-logistics-website

# 2. 安装依赖
npm install

# 3. 配置环境变量
cp .env.example .env

# 4. 生成 SSH 密钥 (可选)
chmod +x scripts/generate-ssh-keys.sh
./scripts/generate-ssh-keys.sh

# 5. 启动服务
npm run dev          # 仅 REST API
npm run dev:ssh      # REST API + SSH
npm run ssh-only     # 仅 SSH 服务器
```

访问: http://localhost:5000

## 📦 系统要求

- **Node.js**: v18.0.0+
- **npm**: v9.0.0+
- **MongoDB**: v5.0+ (可选，Docker 自带)
- **Docker & Docker Compose** (可选，用于容器化部署)

## 🔐 SSH 服务器设置

### 📖 完整文档

详见 [SSH_SETUP.md](./docs/SSH_SETUP.md)

### 快速设置

```bash
# 生成 SSH 密钥
chmod +x scripts/generate-ssh-keys.sh
./scripts/generate-ssh-keys.sh

# 配置 .env 文件
echo "ENABLE_SSH=true" >> .env
echo "SSH_PASSWORD=your_secure_password" >> .env

# 启动服务 (包含 SSH)
npm run dev:ssh
```

### 连接到 SSH 服务器

```bash
# 使用密码认证
ssh -p 2222 admin@localhost

# 使用公钥认证
ssh -i ./keys/server_key -p 2222 admin@localhost

# 远程连接
ssh -p 2222 admin@your-server-ip
```

## 🐳 Docker 部署

### 使用 Docker Compose (推荐)

```bash
# 启动所有服务
docker-compose up -d

# 查看日志
docker-compose logs -f app

# 停止服务
docker-compose down

# 清理所有数据
docker-compose down -v
```

### 访问地址

- **API 服务器**: http://localhost:5000
- **MongoDB 管理界面**: http://localhost:8081
- **SSH 服务**: localhost:2222

### 单独构建 Docker 镜像

```bash
# 构建镜像
docker build -t jiuyang-logistics-server:latest .

# 运行容器
docker run -d \
  -p 5000:5000 \
  -p 2222:2222 \
  -e MONGODB_URI=mongodb://mongo:27017/jiuyang-logistics \
  -e ENABLE_SSH=true \
  jiuyang-logistics-server:latest
```

## 📡 API 文档

### 健康检查

```http
GET /health
Content-Type: application/json
```

响应:
```json
{
  "status": "OK",
  "timestamp": "2024-09-11T09:00:00.000Z",
  "service": "Jiuyang Logistics Server",
  "uptime": 3600
}
```

### 认证 (Authentication)

```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/refresh-token
```

### 用户 (Users)

```http
GET    /api/users/profile      # 获取个人资料
PUT    /api/users/profile      # 更新个人资料
GET    /api/users              # 列出所有用户 (管理员)
DELETE /api/users/:id          # 删除用户
```

### 货运 (Shipments)

```http
POST   /api/shipments          # 创建货运单
GET    /api/shipments          # 列出货运单
GET    /api/shipments/:id      # 获取货运单详情
PUT    /api/shipments/:id      # 更新货运单
DELETE /api/shipments/:id      # 取消货运单
```

### 报价 (Quotes)

```http
POST   /api/quotes/request     # 申请运费报价
GET    /api/quotes             # 列出报价
GET    /api/quotes/:id         # 获取报价详情
POST   /api/quotes/:id/accept  # 接受报价
```

### 物流追踪 (Tracking)

```http
GET    /api/tracking/:trackingNumber           # 追踪货运
GET    /api/tracking/:trackingNumber/history   # 获取追踪历史
```

## 🔧 配置指南

### 环境变量

```env
# 服务器
NODE_ENV=development
PORT=5000

# 数据库
MONGODB_URI=mongodb://localhost:27017/jiuyang-logistics

# JWT
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d

# CORS
CORS_ORIGIN=http://localhost:3000,http://localhost:3001

# SSH 服务器
ENABLE_SSH=true
SSH_PORT=2222
SSH_HOST=0.0.0.0
SSH_PASSWORD=your_password
SSH_PRIVATE_KEY_PATH=./keys/server_key
SSH_PUBLIC_KEY_PATH=./keys/server_key.pub

# 邮件 (可选)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

### 生成 JWT_SECRET

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 📁 项目结构

```
jiuyang-logistics-website/
├── config/              # 配置文件
│   ├── database.js      # MongoDB 连接
│   ├── auth.js          # 认证和授权
│   └── ssh.js           # SSH 服务器
├── routes/              # API 路由
│   ├── auth.js
│   ├── users.js
│   ├── shipments.js
│   ├── quotes.js
│   └── tracking.js
├── models/              # 数据模型
│   ├── User.js
│   ├── Shipment.js
│   └── Quote.js
├── scripts/             # 辅助脚本
│   └── generate-ssh-keys.sh
├── docs/                # 文档
│   ├── SSH_SETUP.md
│   └── SERVER_SETUP.md
├── keys/                # SSH 密钥 (不提交)
├── logs/                # 日志文件 (不提交)
├── app.js               # Express 应用
├── server.js            # 主服务器
├── ssh-server.js        # SSH 独立服务器
├── docker-compose.yml   # Docker Compose 配置
├── Dockerfile           # Docker 镜像
├── .env.example         # 环境变量模板
└── package.json         # 项目依赖
```

## 🔑 NPM 脚本

```bash
# 开发
npm run dev              # 启动 REST API 开发服务
npm run dev:ssh          # 启动 REST API + SSH 服务
npm run ssh-only         # 仅启动 SSH 服务
npm run ssh-keygen       # 生成 SSH 密钥

# 生产
npm start                # 启动生产服务

# 测试和质量
npm test                 # 运行测试
npm run lint             # 代码检查

# Docker
npm run docker:build     # 构建 Docker 镜像
npm run docker:run       # 启动 Docker 容器
npm run docker:stop      # 停止 Docker 容器
npm run docker:logs      # 查看 Docker 日志
npm run docker:clean     # 清理 Docker 数据
```

## 🐛 故障排除

### SSH 连接失败

```bash
# 检查服务是否运行
lsof -i :2222

# 检查 SSH 密钥
ls -la keys/

# 检查密钥权限
chmod 600 keys/server_key

# 查看日志
tail -f logs/server.log
```

### 数据库连接失败

```bash
# 检查 MongoDB 状态
mongosh

# 验证连接字符串
echo $MONGODB_URI

# Docker 中检查
docker-compose logs mongo
```

### 端口被占用

```bash
# 查找占用端口的进程
lsof -i :5000
lsof -i :2222

# 杀死进程
kill -9 <PID>

# 或更改端口
PORT=3000 npm run dev
```

## 🚀 部署指南

### AWS EC2

```bash
# 1. SSH 连接
ssh -i your-key.pem ubuntu@your-instance-ip

# 2. 安装 Node.js 和 Docker
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs docker.io docker-compose

# 3. 克隆仓库
git clone https://github.com/shjyjg0420/jiuyang-logistics-website.git
cd jiuyang-logistics-website

# 4. 配置生产环境
cp .env.example .env
nano .env  # 编辑配置

# 5. 启动服务
sudo docker-compose -f docker-compose.yml up -d

# 6. 配置反向代理 (Nginx)
sudo nano /etc/nginx/sites-available/default
```

### 反向代理配置 (Nginx)

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # REST API
    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 📊 性能优化

- ✅ Gzip 压缩已启用
- ✅ 请求日志记录
- ✅ 错误处理中间件
- ✅ CORS 跨域支持
- ✅ 安全头部 (Helmet.js)

## 🔒 安全特性

- ✅ JWT 令牌认证
- ✅ 密码加密 (bcrypt)
- ✅ SSH 密钥管理
- ✅ 环境变量隔离
- ✅ 速率限制 (ready)
- ✅ SQL 注入防护

## 📝 License

MIT License - 详见 [LICENSE](LICENSE)

## 🤝 贡献

欢迎提交 Pull Requests 和 Issues！

## 📞 支持

- 📧 Email: support@jylogistics.com
- 🐛 Issues: https://github.com/shjyjg0420/jiuyang-logistics-website/issues
- 📚 Wiki: https://github.com/shjyjg0420/jiuyang-logistics-website/wiki

---

**Made with ❤️ for Shanghai Jiuyang International Logistics**
