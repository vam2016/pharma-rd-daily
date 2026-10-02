# 临床研发统计观察

公开网站：https://vam2016.github.io/pharma-rd-daily/

面向临床研发统计师的研发证据、方法学进展和研究笔记。Jekyll + GitHub Pages 静态构建，无付费域名、服务器或运行时 API 密钥。

## 内容入口

| 栏目 | 来源文件 | 页面 | 发布模板 |
| --- | --- | --- | --- |
| 研发简报 | `_posts/YYYY-MM-DD-daily.md` | `/rd/`，文章保留 `/briefs/YYYY-MM-DD/` | `templates/daily.md` |
| 统计方法 | `_posts/statistics/YYYY-MM-DD-statistical-methods.md` | `/statistics/` | `templates/statistics.md` |
| 研究笔记 | `_posts/notes/YYYY-MM-DD-stable-slug.md` | `/notes/` | `templates/note.md` |

全部文章统一使用 `section` 与 `format` 元数据。布局、目录、公式、修订展示、搜索及 RSS 共用；栏目文案集中在 `_data/sections.yml`，类型名称在 `_data/formats.yml`。

ChatGPT 定时任务在发布前读取此文件和对应模板，仅创建或修订自己的内容文件。GitHub 提交触发 Pages 构建。任务名称：医药研发每日简报（每日 08:30）、临床试验统计方法精选（每周五 10:00），香港/北京时间。

## 发布与后续扩展

详细约定见 [发布接口](docs/publishing.md)，JSON 格式见 [内容 schema](schemas/content.schema.json)。未来的 ChatGPT 讨论和学习笔记可以直接通过 GitHub 工具提交 Markdown，也可用 `scripts/import_content.py` 将标准 JSON 导入为 Markdown，再提交到 GitHub。当前没有匿名网络写入端点。

## 阅读与订阅

`/feed.xml` 为全部内容；`/rd/feed.xml`、`/statistics/feed.xml`、`/notes/feed.xml` 分别订阅栏目。订阅说明在 `/subscribe/`。

公式采用 Kramdown 数学语法：行内为同一行 `$$...$$`，独立公式将两个 `$$` 分别置于独立行。MathJax 渲染 GitHub Pages 生成的数学节点或分隔符。源码链接用标准 Markdown；代码使用带语言标识的代码块。`<details markdown="1"><summary>展开推导</summary>...` 可折叠长内容。

修订必须保留日期、文件路径和 permalink，添加 `updated_at`、`update_note`，并追加正文修订记录。不得静默覆盖已有文章、修改历史 URL 或删除原来源。

## 维护

网站静态源码和内容均在 main。修改布局后检查 Pages 构建、现有日报 URL、栏目归档与订阅源；正文含公式时核查实际页面排版。模板、文档、schema 和脚本均排除于公开网页构建（仓库本身公开）。
