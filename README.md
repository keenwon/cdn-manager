# cdn-manager

[![Build Status][travis-image]][travis-url]

CDN Management Tool

## 本地开发

```shell
# 安装依赖
yarn install

# 运行
npm run dev
```

## 生产部署

```shell
# 安装依赖
yarn install

# 安装pm2
yarn global add pm2

# 编译
npm run build

# 运行
pm2 start process.json
```

[travis-image]: https://img.shields.io/travis/keenwon/cdn-manager.svg?style=flat-square
[travis-url]: https://travis-ci.org/keenwon/cdn-manager