# 统一内容发布接口 v1

发布目标固定为 `vam2016/pharma-rd-daily` 的 `main`。无服务器，不在网页中保存凭证。所有文章共用布局和渲染能力，GitHub 提交后由 Pages 构建。添加新来源只需遵循内容约定，无需重做网站。

## 路由与内容类型

| section | format | 文件路径 | 稳定文章 URL |
| --- | --- | --- | --- |
| rd | daily_brief | `_posts/YYYY-MM-DD-daily.md` | `/briefs/YYYY-MM-DD/` |
| statistics | research_digest | `_posts/statistics/YYYY-MM-DD-statistical-methods.md` | `/statistics/YYYY-MM-DD/` |
| notes | study_note 或 discussion | `_posts/notes/YYYY-MM-DD-slug.md` | `/notes/slug/` |

一天多个讨论/笔记用不同 slug。日报和方法精选每天各一个文档；新增内容不要写入布局、配置、RSS 或首页。

## 栏目边界与方法专题

`rd` 仅发布药物临床研究进展与针对具体研究的统计解读。独立统计方法学论文和方法综述归入 `statistics`，不为日报凑条目。

`statistics` 文章添加 `topics` 数组，只标记本期有实质性精选内容的方法专题；提到某专题“本周无新增”不构成分类依据。固定 ID 与名称见 `_data/topics.yml`：`estimand`、`missing-data`、`interim`、`bayesian`、`sample-size`、`causal`、`survival`、`other`。一篇简报可以覆盖多个专题；筛选结果按整篇简报显示。`tags` 为自由描述标签，不能替代新文章的专题分类。历史文章缺少 `topics` 时按专题别名兼容匹配。

专题链接形如 `/statistics/?topic=missing-data`。关键词与专题同时生效。栏目 URL、文章 URL 与 RSS 地址沿用原约定。

## 方式一：ChatGPT 直接提交 Markdown

1. 读取 README 与对应模板；整理公开内容，保留原始来源链接。用户明确选定的讨论内容可以作为笔记，不自动公开整个聊天。
2. 检查目标路径。新文章使用 GitHub `create_file`；修订时先读取旧内容和当前 SHA，再 `update_file`。冲突时重新读取，不强制覆盖。
3. front matter 必须有 `title`、带时区的 `date`、`section`、`format`、`summary`、`tags`；方法文章另有 `topics`。方法和笔记显式写稳定 `permalink`；笔记有固定 `slug`。日常日报按已有全局 permalink。
4. 发布后重新读取文件并确认提交 SHA。只有写入成功才报告发布；搜索、权限、写入失败应如实报告，不能声称已发布。

## 定时任务日期与发布状态

### 先确定发布日，再确定文件

每次运行先将本次实际运行时间转换为 Asia/Shanghai（UTC+08:00），固定发布日 D，再计算该日所在周的周一和周日。不要从新闻发布日期、上一次回复、已有文章或模板示例反推“今天”。不能可靠确认本次运行日期时，保留完整草稿并报告原因，暂停写入。

日报的文件日期、标题日期、front matter 的 date 日期与 permalink 日期必须均等于 D。date 使用实际本地发布时间，不写未来时间。北京时间 2026-10-03 08:30 的新日报应使用：

- 文件：_posts/2026-10-03-daily.md
- title：医药研发每日专业简报｜2026-10-03
- date：2026-10-03 08:30:00 +0800
- permalink：/briefs/2026-10-03/

正文可以报道 10 月 2 日的新闻，每条新闻保留来源的实际发布日期。检索窗口与发布日分别说明。每日任务不得因为当天文章不存在而选择最近一篇旧文章修订；补发旧日期文章或修订历史文章必须有用户明确指定的日期与操作。本周历史缺失只影响去重能力，不改变发布日。

### 写入前检查

先生成完整 Markdown 文件，再检查 front matter、日期一致性、栏目边界、公式和来源链接。只确认目标路径确实不存在时才 create_file；读不到文件、权限错误或网络错误不等同于不存在。存在时读取完整内容和最新 SHA，有实质新增或更正才 update_file；保留原日期、稳定 URL、既有来源与修订历史。不能用新稿静默替换整篇旧日报。

网站正文不包含工具执行记录、提交 SHA、发布失败说明、任务提示词或私人聊天引用。发布状态单独写在任务结果中。不得为满足固定条目数纳入独立方法学论文；临床研究中的统计解读围绕对应研究展开。

### 区分三种结果

- 草稿已生成：没有成功写入，不能报告已提交或网站已更新。
- 已提交，部署待确认：写入返回真实 commit SHA，重新读取目标文件并确认内容一致；Pages 尚未成功或网页尚未确认。
- 网站已更新：相应 Pages 构建成功，且实际文章页面已显示预期标题、日期和内容；可读取 RSS 时核对该文章条目。

发生安全检查拦截时，停止本次写入，原样报告工具错误，并在任务回复中保留完整 Markdown 草稿、目标路径和来源，供用户审阅。不得通过改写、拆分、编码、换路径或更换工具绕过拦截。提示词修订与日期修复不能保证消除平台安全检查；不能把某个内容问题直接说成拦截原因。

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
