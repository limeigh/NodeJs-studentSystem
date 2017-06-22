# 后台管理系统

## 说明

这是一个后台学生信息管理系统，用来辅助学校对学生信息的管理的，例如：

## 技术栈

- Node 平台
- Express Web 开发框架
- MongoDB 数据库

## 项目初始化

```
npm init -y
npm install --save express ejs
```

## hello world

1. 访问首页能响应一个字符串：`hello world` 即可
2. 通过模板引擎实现能响应一个 `index.html`

## 设计路由

| 请求方法 |     请求路径     |       作用       | 查询字符串 |                               请求体                                |
|----------|------------------|------------------|------------|---------------------------------------------------------------------|
| GET      | /                | 渲染首页         |            |                                                                     |
| GET      | /students        | 渲染学生列表页   |            |                                                                     |
| GET      | /students/info   | 渲染学生列表页   | { id }     |                                                                     |
| GET      | /students/new    | 渲染添加学生页   |            |                                                                     |
| POST     | /students/new    | 处理添加学生请求 |            | { name, gender, age, phone, stu_number, province, city, major }     |
| GET      | /students/edit   | 渲染编辑学生页   | { id }     |                                                                     |
| POST     | /students/edit   | 处理编辑学生请求 |            | { id, name, gender, age, phone, stu_number, province, city, major } |
| GET      | /students/remove | 处理删除学生请求 | { id }     |                                                                     |

## 实现功能
