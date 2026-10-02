# 统一内容发布接口 v1

发布目标固定为 `vam2016/pharma-rd-daily` 的 `main`。无服务器，不在网页中保存凭证。所有文章共用布局和渲染能力，GitHub 提交后由 Pages 构建。添加新来源只需遵循内容约定，无需重做网站。

## 路由与内容类型

| section | format | 文件路径 | 稳定文章 URL |
| --- | --- | --- | --- |
| rd | daily_brief | `_posts/YYYY-MM-DD-daily.md` | `/briefs/YYYY-MM-DD/` |
| statistics | research_digest | `_posts/statistics/YYYY-MM-DD-statistical-methods.md` | `/statistics/YYYY-MM-DD/` |
| notes | study_note 或 discussion | `_posts/notes/YYYY-MM-DD-slug.md` | `/notes/slug/` |

一天多个讨论/笔记用不同 slug。日报和方法精选每天各一个文档；新增内容不要写入布局、配置、RSS 或首页。

## 方式一：ChatGPT 直接提交 Markdown

1. 读取 README 与对应模板；整理公开内容，保留原始来源链接。用户明确选定的讨论内容可以作为笔记，不自动公开整个聊天。
2. 检查目标路径。新文章使用 GitHub `create_file`；修订时先读取旧内容和当前 SHA，再 `update_file`。冲突时重新读取，不强制覆盖。
3. front matter 必须有 `title`、带时区的 `date`、`section`、`format`、`summary`、`tags`。方法和笔记显式写稳定 `permalink`；笔记有固定 `slug`。日常日报按已有全局 permalink。
4. 发布后重新读取文件并确认提交 SHA。只有写入成功才报告发布；搜索、权限、写入失败应如实报告，不能声称已发布。

## 方式二：标准 JSON 导入

schema 为 `schemas/content.schema.json`。例子只用于格式说明，不是发布内容：

```json
{
  "schema_version": 1,
  "section": "notes",
  "format": "discussion",
  "slug": "estimand-discussion",
  "title": "讨论标题",
  "date": "2026-10-02T15:00:00+08:00",
  "summary": "讨论的问题与收获",
  "tags": ["estimand"],
  "body": "## 问题\n\n正文与 [来源](https://example.com/)。"
}
```

从仓库目录运行：`python3 scripts/import_content.py --input /path/to/content.json --root .`。脚本校验并生成唯一的 Markdown 文件，不进行网络提交。可使用 `--dry-run` 核对目标路径；同 slug 的笔记不能以另一发布日期重复创建。随后通过 GitHub 提交文件。

修订已有文件时使用 `--revise`，提供 `updated_at` 与非空 `update_note`，保持原 `date`、`slug` 和路径。脚本保留既有修订历史，并追加新的说明。body 为完整的新正文，不含修订记录；脚本会保留并追加修订记录。来源变更应解释原因。

## 正文能力

标准 Markdown 链接、表格、语言代码块、details/summary、Kramdown 公式均支持。行内 `$$...$$`，独立公式用两个单独行的 `$$`；不要用单美元或代码块包围公式。来源链接使用可访问的 HTTP(S) 链接，不将 ChatGPT 内部引用标记作为来源。

## 公共内容与版本

网站及仓库均公开。只发布用户选定且可公开的讨论/笔记，去除个人信息、私人聊天链接、凭证和未授权资料。导入器会拒绝可执行脚本与 Liquid 模板语法，检查非法路径，但不能替代内容审核。

新文章进入栏目归档和统一时间线。修订保留 RSS 文章标识，只改变 updated 时间；RSS 阅读器对已读文章修订的提示方式各异。草稿留在本地或 `_drafts`，不创建公开的占位文章。
