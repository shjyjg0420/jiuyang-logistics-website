#!/usr/bin/env node

/**
 * 独立 SSH 服务器
 * 可以单独运行或与主应用一起运行
 */

require('dotenv').config();
const { startSSHServer } = require('./config/ssh');
const fs = require('fs');
const path = require('path');

const keysDir = path.join(__dirname, 'keys');

// 检查 SSH 密钥是否存在
if (!fs.existsSync(path.join(keysDir, 'server_key'))) {
  console.error(
    '\n❌ SSH 密钥未找到！请先执行以下命令生成密钥：\n'
  );
  console.error('  Linux/Mac:');
  console.error('    chmod +x scripts/generate-ssh-keys.sh');
  console.error('    ./scripts/generate-ssh-keys.sh\n');
  console.error('  Windows (Git Bash):');
  console.error('    bash scripts/generate-ssh-keys.sh\n');
  console.error('  或手动执行：');
  console.error(
    '    ssh-keygen -t rsa -f keys/server_key -N "" -C "jiuyang-logistics-server"\n'
  );
  process.exit(1);
}

// 启动 SSH 服务器
console.log(
  '\n🚀 正在启动 Jiuyang Logistics SSH 服务器...\n'
);

startSSHServer();

// 优雅关闭
process.on('SIGINT', () => {
  console.log(
    '\n\n👋 SSH 服务器正在关闭...'
  );
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log(
    '\n\n👋 SSH 服务器正在关闭...'
  );
  process.exit(0);
});
