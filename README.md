# 医药研发每日简报

由 ChatGPT 整理公开研发信息，GitHub Pages 发布按日期归档的静态简报。

## 自动发布

每次只需创建一个 `_posts/YYYY-MM-DD-daily.md` 文件。Jekyll 自动更新首页、历史归档和 RSS，不需要额外更新索引或运行 API。

参照 `templates/daily.md`。日期使用北京时间；同一天只保留一期，修订已有文件需先读取当前 SHA。

GitHub Pages 发布源：`main` 分支、仓库根目录。构建完成后访问 https://vam2016.github.io/pharma-rd-daily/ 。

网站没有数据库、追踪脚本或付费 API；所有发布内容和源代码均公开。


## 公式、来源与修订

Markdown 使用 kramdown 语法。行内公式同一行写 `$$RD=p_T-p_C$$`；独立公式将 `$$` 放在公式前后单独两行。网站将其渲染为数学公式。MathJax 从 jsDelivr 加载；若网络暂不可用，保留 TeX 原文并提示刷新，不丢失公式内容。

原始来源使用 `[标题](https://...)`，网页会在新标签页打开外部链接。禁止写入私人信息、脚本、ChatGPT 专属 UI 标记或 Liquid 模板指令。

修订已有日报时，保留原 `date` 和路径，添加 `updated_at: "YYYY-MM-DD HH:MM:SS +0800"` 与 `update_note: "修改说明"`，并在正文末尾追加修订记录。RSS 的文章 ID 保持稳定，updated 时间随修订更新。
