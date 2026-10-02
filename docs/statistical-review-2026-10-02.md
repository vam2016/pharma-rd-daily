# 统计与阅读体验审阅

审阅开始：2026-10-02；修订：2026-10-03。范围为当时已发布的两篇文章、栏目边界、模板、提示词、归档与阅读页面。不是临床研究的独立同行评审或算法复现。

## 已落实的修正

| 问题 | 处理 |
| --- | --- |
| 新闻稿、会议披露被标成“证据等级” | 改为来源类型和阅读范围，避免暗示经过正式分级 |
| REZILIENT3 重点呈现疗效，安全性不足 | 补充 ≥3 级不良事件；解释 HR 与中位数差的含义，补具体公告链接 |
| REZOLVE-AA 条件应答容易外推为随机治疗效应 | 区分分母、mITT、条件概率与因果比较；标记 SALT≤10 分母待核验 |
| STENOVA 未完成治疗与结局失访混淆 | 明确两者不同，保留事件数、人时和选择偏倚问题 |
| FDA 数据迁移的概念被写成相加等式 | 改为文字说明；区分实施日期与新闻发布日期 |
| 先验校准被隐含要求普遍“无偏好” | 改为匹配预定知识和决策目标 |
| 模拟校准与普遍错误率保证混淆 | 补充情景范围、Monte Carlo 误差和估计/区间性质 |
| 方法进展反复落到 Protocol/SAP | 改为研发与设计问题导向，仅保留必要实施细节 |
| 文章重复、英文长标题和目录粗糙 | 中文问题标题、稳定锚点、二三级目录、术语速查；精简日报重复章节 |
| 零内容专题挤占主要筛选区 | 已有专题优先；待收录专题可展开，URL 筛选仍兼容 |
| 提示词只强调产出，发布状态表述含糊 | 分离共同规则/任务范围/模板/启动提示词；区分提交与部署 |

## 来源核对与限制

- REZILIENT3：核对 [公司提交的结果公告](https://www.sec.gov/Archives/edgar/data/1789972/000119312526389844/cgem-ex99_1.htm) 与 [10月1日申报公告](https://www.globenewswire.com/de/news-release/2026/10/01/3373489/0/en/new-drug-application-submission-initiated-for-zipalertinib-plus-chemotherapy-in-first-line-egfr-exon-20-insertion-mutation-nsclc-for-review-under-fda-real-time-oncology-review-prog.html)。这些是公司材料，不是 FDA 审评结论。
- REZOLVE-AA：核对 [2025年36周结果](https://www.sec.gov/Archives/edgar/data/906709/000119312525320009/d24251dex991.htm) 和 [2026年延长期公告](https://www.sec.gov/Archives/edgar/data/906709/000121390026105453/ea030730601ex99-1.htm)。未取得个体数据，不自行补算确证性治疗效应。
- STENOVA：核对 [公司原始公告](https://ir.agomab.com/news-releases/news-release-details/agomab-reports-positive-topline-data-stenova-open-label)。精确人时、完整结局收集和区间仍需完整报告。
- FDA：核对 [AEMS 时间表](https://www.fda.gov/drugs/fda-adverse-event-monitoring-system-aems/fda-adverse-event-monitoring-system-aems-electronic-submissions) 与 [E20 页面](https://www.fda.gov/regulatory-information/search-fda-guidance-documents/e20-adaptive-designs-clinical-trials)。E20 页面仍为草案，工作计划不代表正式发布。
- RICSICAS：核对 [公开全文](https://www.frontiersin.org/journals/neurology/articles/10.3389/fneur.2026.1915534/full) 中期中时点、样本量、显著性阈值和重估描述。公开信息不足以确认完整错误率控制；没有断言其实际错误率已经膨胀。
- Statistics in Medicine 三篇：原稿保留 DOI 和阅读范围；本轮 Wiley/PubMed 访问未取得原始全文，不能给出全面复现结论。BACON 具体概率公式暂撤下，保留方向与待核验问题。后续取得全文后，可在原网址继续修订。

## 提示词维护

`prompts/editorial.md` 为共同规则；`daily.md` 与 `statistics.md` 定义不同研究范围；`task-*.txt` 为定时任务读取仓库规则的入口。该结构把角色、操作步骤、输出约定与示例分开，参考 [OpenAI 提示词文档](https://developers.openai.com/api/docs/guides/prompt-engineering)。仓库文件发布与 ChatGPT 任务设置保存是独立操作，需要分别确认。

## 后续扩展

本轮仓库提示词已经整理；ChatGPT 任务页面未能正常加载，浏览器连接也未能返回任务编辑界面，因此没有确认云端定时任务保存了新提示词。原任务读取 README 和模板时可以获取仓库新规范，但不能据此保证旧任务提示词中的冲突要求已经删除。

保留 `notes` 栏目、Markdown 直传及 JSON 导入接口。每篇简报可覆盖多个方法专题，目前按整篇筛选，文章目录定位具体条目；需要跨期按单篇论文索引时，再增加独立条目元数据，避免当前界面暗示已具备论文级检索。
