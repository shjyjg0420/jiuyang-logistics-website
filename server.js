#!/usr/bin/env node

/**
 * 主服务器启动文件
 * 包含 REST API 和可选的 SSH 服务器
 */

require('dotenv').config();
const app = require('./app');
const { connectDB } = require('./config/database');
const { startSSHServer } = require('./config/ssh');

const PORT = process.env.PORT || 5000;
const ENABLE_SSH = process.env.ENABLE_SSH === 'true';
const NODE_ENV = process.env.NODE_ENV || 'development';

const startServer = async () => {
  try {
    // 连接数据库 (可选)
    // 如果 MONGODB_URI 未设置，SSH 服务仍将正常工作
    if (process.env.MONGODB_URI) {
      await connectDB();
    } else {
      console.log('⚠️  MongoDB URI 未设置，跳过数据库连接');
    }

    // 启动 REST API 服务器
    const server = app.listen(PORT, () => {
      console.log(`\n🚀 Jiuyang Logistics REST API Server`);
      console.log(`📍 地址: http://localhost:${PORT}`);
      console.log(`🌍 环境: ${NODE_ENV}`);
      console.log(`✅ 服务器已启动\n`);
    });

    // 可选: 启动 SSH 服务器
    if (ENABLE_SSH) {
      console.log('🔐 SSH 服务器已启用，正在启动...');
      startSSHServer();
    } else {
      console.log('ℹ️  SSH 服务器已禁用 (设置 ENABLE_SSH=true 以启用)');
    }

    // 优雅关闭
    process.on('SIGINT', () => {
      console.log('\n\n👋 正在关闭服务器...');
      server.close(() => {
        console.log('✅ 服务器已关闭');
        process.exit(0);
      });
      // 10 秒后强制退出
      setTimeout(() => {
        console.error('❌ 强制退出');
        process.exit(1);
      }, 10000);
    });

    process.on('SIGTERM', () => {
      console.log('\n\n👋 正在关闭服务器...');
      server.close(() => {
        console.log('✅ 服务器已关闭');
        process.exit(0);
      });
    });
  } catch (error) {
    console.error('❌ 服务器启动失败:', error);
    process.exit(1);
  }
};

startServer();
