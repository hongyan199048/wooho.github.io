# 🚀 GitHub Pages 部署指南

## 📋 快速部署步骤

### 1. 创建GitHub仓库
- 访问 [GitHub](https://github.com)
- 点击 "New repository"
- 仓库名：`yourusername.github.io` 或任意名称
- 选择 "Public"
- 点击 "Create repository"

### 2. 上传项目文件
```bash
# 在您的个人网站文件夹中执行
cd "个人网站"

# 初始化Git仓库
git init

# 添加所有文件
git add .

# 提交更改
git commit -m "初始提交：个人网站"

# 添加远程仓库（替换yourusername为您的GitHub用户名）
git remote add origin https://github.com/yourusername/yourusername.github.io.git

# 推送到GitHub
git branch -M main
git push -u origin main
```

### 3. 启用GitHub Pages
1. 进入您的GitHub仓库
2. 点击 "Settings" 标签
3. 左侧菜单选择 "Pages"
4. Source选择 "Deploy from a branch"
5. Branch选择 "main"
6. 点击 "Save"

### 4. 绑定自定义域名 wooho.com

#### 方法一：创建CNAME文件
在仓库根目录创建名为 `CNAME` 的文件（无扩展名），内容为：
```
wooho.cc
```

#### 方法二：通过GitHub设置
1. 在Pages设置页面
2. 找到 "Custom domain" 部分
3. 输入 `wooho.cc`
4. 勾选 "Enforce HTTPS"
5. 点击 "Save"

### 5. 配置DNS解析
在您的域名提供商（如阿里云、腾讯云等）的DNS管理页面添加以下记录：

#### 推荐：CNAME记录
```
类型: CNAME
主机记录: @ 或 www
记录值: yourusername.github.io
TTL: 3600
```

#### 备选：A记录
```
类型: A
主机记录: @
记录值: 185.199.108.153
记录值: 185.199.109.153
记录值: 185.199.110.153
记录值: 185.199.111.153
TTL: 3600
```

## ⏱️ 生效时间
- GitHub Pages部署：1-5分钟
- DNS解析生效：10分钟-24小时（取决于TTL设置）

## 🔍 验证部署
1. 访问 `https://yourusername.github.io` 查看是否正常
2. 访问 `https://wooho.cc` 查看自定义域名是否生效
3. 检查HTTPS证书是否自动配置

## 📱 移动端测试
- 使用手机浏览器访问网站
- 测试响应式设计是否正常
- 检查触摸交互是否流畅

## 🚨 常见问题

### 问题1：域名无法访问
**解决方案：**
- 检查DNS记录是否正确配置
- 确认CNAME文件是否在仓库根目录
- 等待DNS解析生效（最多24小时）

### 问题2：HTTPS证书问题
**解决方案：**
- 在GitHub Pages设置中勾选 "Enforce HTTPS"
- 删除浏览器缓存和Cookie
- 等待证书自动配置完成

### 问题3：网站样式丢失
**解决方案：**
- 检查CSS文件路径是否正确
- 确认所有文件都已上传到GitHub
- 清除浏览器缓存

## 🔄 更新网站
每次修改后，执行以下命令更新网站：
```bash
git add .
git commit -m "更新网站内容"
git push origin main
```

## 📊 性能优化建议
1. **图片优化** - 使用WebP格式，压缩图片大小
2. **代码压缩** - 生产环境使用压缩后的文件
3. **缓存策略** - 设置适当的HTTP缓存头
4. **CDN加速** - GitHub Pages已提供全球CDN

## 🌟 高级功能
- **自动部署** - 每次推送代码后自动更新网站
- **版本控制** - 可以回滚到任意历史版本
- **分支部署** - 可以为不同分支创建不同的预览环境
- **自定义404页面** - 创建404.html文件自定义错误页面

## 📞 技术支持
如果遇到问题，可以：
1. 查看GitHub Pages官方文档
2. 在GitHub社区寻求帮助
3. 检查GitHub状态页面

---

**🎉 恭喜！您的个人网站现在应该可以通过 wooho.com 访问了！**
