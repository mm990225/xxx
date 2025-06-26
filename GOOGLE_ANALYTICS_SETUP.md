# Google Analytics 设置说明

## 获取测量ID后的配置步骤：

1. 在项目根目录创建 `.env.local` 文件
2. 添加以下内容：
```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-您的实际测量ID
```

## 示例：
```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-ABC123DEF456
```

## 注意事项：
- `.env.local` 文件不会被提交到Git（已在.gitignore中）
- 测量ID必须以 `G-` 开头
- 部署到Vercel时需要在环境变量中配置此值

## 验证集成：
1. 部署网站后访问 https://www.polyalpha.fun
2. 在Google Analytics中查看实时报告
3. 应该能看到当前访问用户数 