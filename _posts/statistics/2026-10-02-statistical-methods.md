---
title: "临床试验统计方法精选｜2026-10-02"
date: "2026-10-02 10:00:00 +0800"
section: statistics
format: research_digest
permalink: /statistics/2026-10-02/
topics: ["bayesian", "interim", "sample-size", "missing-data"]
updated_at: "2026-10-02T22:42:32+08:00"
update_note: "补充固定方法专题分类；未有新增精选的估计目标不计入本期专题。"
week: "2026-09-25 至 2026-10-02"
summary: "本周重点关注 Bayesian 联合结局剂量探索的先验校准、Bayesian group-sequential 与 predictive-probability SSR、MNAR 数据融合，以及一个 O'Brien-Fleming + conditional-power SSR 的真实设计案例。"
tags: [ "missing data", "MNAR", "group sequential", "interim analysis", "alpha spending", "Bayesian Phase I-II", "sample size", "SSR"]
---

## 本周判断

**检索窗口：2026-09-25 00:00 至 2026-10-02 本次检索时点（北京时间）。**

本周真正值得优先阅读、且可能影响临床试验设计或 SAP 决策的内容主要集中在四个方向：

1. **Bayesian Phase I / dose finding：** joint-outcome model-based dose-finding 中，不能把单一结局设计的 prior calibration 机械移植到联合结局模型；新论文直接讨论这种做法可能造成剂量推荐偏倚。
2. **Group-sequential + SSR：** 新的 BACON 设计把 Bayesian posterior stopping、O'Brien-Fleming 型边界、predictive probability 和 SSR 放在同一套预先校准的 operating-characteristic 框架中，尤其值得关注其对 Type I error 的处理。
3. **Missing data / MNAR：** shadow variable + external data 的 data-fusion 方法继续推动 MNAR 从“仅做敏感性分析”向“在额外识别条件下进行识别与估计”发展。
4. **真实方案中的 adaptive design：** RICSICAS 公开设计同时采用 O'Brien-Fleming alpha-spending、conditional power 和基于观察治疗效应的样本量增加规则，是一个很适合统计师审查 Protocol/SAP/DMC charter 是否闭环的实际案例。

本周**未检索到足够新的 estimand/E9(R1) 方法学或监管文件**，因此不为覆盖栏目而加入旧论文。监管方面，截至本次检索，[FDA 的 ICH E20 页面](https://www.fda.gov/regulatory-information/search-fda-guidance-documents/e20-adaptive-designs-clinical-trials)仍为 2025 年 draft guidance，[EMA 页面](https://www.ema.europa.eu/en/ich-e20-adaptive-designs-clinical-trials-scientific-guideline)仍显示 Step 2b；[ICH 2026 Work Plan](https://admin.ich.org/sites/default/files/inline-files/ICHAssociation_WorkPlan_2026_Approved_2025_1118.pdf)预计 E20 在 2026 年 10 月达到 Step 4，因此应继续重点跟踪，但本期尚不把它作为“新增指南”计入精选。

## 方法精选

### 1. Calibration of Priors for Bayesian Model-Based Dose-Finding Trial Designs With Joint Outcomes

**发布日期 / 来源类型 / 阅读范围：** 2026-10-01；Statistics in Medicine 方法学研究论文；本期基于**摘要与公开会议材料**阅读，未把未核验的期刊全文细节作为结论。

**核心新意。** Bayesian model-based dose-finding 在同时建模 toxicity、efficacy 或其他联合结局时，prior 不再只是单个参数的“弱信息”设定问题。作者指出，把为 single-outcome design 开发的 prior calibration 方法直接用于 joint-outcome design，可能产生非预期的剂量推荐偏倚，限制 dose exploration，也可能使所谓“dose-agnostic prior”并不真正对各剂量保持中性。论文提出基于 divergence minimisation 的解析式 prior calibration 方法，并报告其相较传统 grid search 具有更好的校准准确性和计算效率。

**主要统计方法。** 论文面向 Bayesian model-based dose-finding，包括 CRM 类设计的扩展。核心思想不是单独检查每个模型参数的 prior mean / variance，而是让 prior 在**决策层面**体现预先设定的无偏好或 dose-agnostic 目标，再通过 divergence minimisation 调整 joint model 的 prior。公开摘要未披露足以复现全部推导的具体 divergence 形式、完整 joint outcome likelihood 和所有 calibration constraints，因此这些细节本期不作推断。

**适用场景与局限。** 最适用于同时使用两个或更多结局进行剂量推荐的 Bayesian Phase I 或 Phase I–II 设计，例如 toxicity + efficacy、toxicity + tolerability，或更复杂的 joint utility design。其价值依赖于具体 joint model 与 dose recommendation rule；不能因为 prior marginally 看起来“vague”，就默认最终 dose-selection mechanism 也没有方向性。由于本期未核验期刊全文，具体模型覆盖范围和有限样本性质需要在正式应用前阅读全文确认。

**为何值得读。** 这篇论文直接击中了现代 Bayesian dose-finding 中一个容易被低估的问题：**prior calibration 应围绕 trial decision calibration，而不只是围绕单个参数的先验强弱。** 对 EffTox、joint toxicity–efficacy model、OBD selection 等设计尤其有启发。

**对设计或 SAP 的影响。** Protocol / SAP / simulation report 不应只列出 prior distribution；还应说明 prior 如何校准、在 prior predictive 或无数据信息状态下是否偏向某些剂量，以及这种先验结构如何影响 escalation、de-escalation、dose exclusion 和 final dose selection。建议把“prior neutrality / prior-induced dose recommendation”作为正式 operating-characteristic 检查项，而不是只报告 power 或 PCS。

**来源：** [Statistics in Medicine DOI](https://doi.org/10.1002/sim.70746)

### 2. A Bayesian Adaptive Design for Assessing Treatment Effect Consistency in Bridging Studies

**发布日期 / 来源类型 / 阅读范围：** 2026-09-30；Statistics in Medicine 方法学研究论文；**全文阅读**。

**核心新意。** 作者提出 BACON（Bayesian Adaptive design for assessing CONsistency），把 bridging study 中的 treatment-effect consistency 问题放入 Bayesian group-sequential framework。设计既允许因“已足够一致”提前成功，也允许因“明显不一致”提前失败；若继续，可在期中依据 Bayesian predictive probability 进行 sample size / event count recalculation。最值得注意的是：作者没有把 posterior probability threshold 或 SSR 当作任意附加规则，而是通过 simulation **联合校准 stopping boundary 与 SSR threshold，使 empirical Type I error 保持在预设水平。**

**主要统计方法。** 对 time-to-event endpoint，令 $$\theta_B$$ 与 $$\theta_O$$ 分别表示 bridging study 与 original study 的 log hazard ratio，$$\pi$$ 为预设 treatment-effect preservation fraction。其一致性判断的核心可表示为 $$P(\theta_B<\pi\theta_O\mid D_B,D_O)>C_1(n)$$。期中一致性边界采用 O'Brien-Fleming 型 posterior-probability boundary，不一致边界采用随 information fraction 变化的 power-family cutoff，并通过 simulation calibration 控制 empirical Type I error。

SSR 使用 final success 的 Bayesian predictive probability。若当前计划事件数下成功概率不足，则寻找最小的 $$N^*$$ 使 $$PP(N^*)\ge C_3$$，并受预设 $$N_{max}$$ 限制。关键点是 $$C_3$$ 也不是任意选定：作者在给定最大样本量后，通过 simulation 选择既维持 Type I error、又在预设 attenuated-but-still-consistent scenario 下获得最大 power gain 的阈值。

**适用场景与局限。** 主要场景是已完成 original study 后，为新地区或新人群开展 time-to-event bridging study。方法依赖 large-sample log-rank approximation；事件数较少时必须额外验证 operating characteristics。推导以 proportional hazards 为起点；在 non-proportional hazards 下，log HR 更接近 weighted-average effect，临床解释和期中决策都可能改变。作者明确指出 delayed effect、diminishing effect 或 crossing hazards 可能影响 early stopping 与 SSR 行为，并建议考虑 RMST 或 milestone survival 等替代 treatment-effect summary。其模拟 operating characteristics 还条件于已观察到的 original-study estimate，因此跨原研究重复抽样的不确定性解释需要注意。

**为何值得读。** 这篇论文同时连接了 **Bayesian decision rule、group sequential monitoring、information fraction、SSR、Type I error calibration 和 time-to-event estimand**。对实际 adaptive design 最有价值的不是某个边界公式，而是它展示了一个正确的设计顺序：先定义 success criterion，再把所有 adaptive rule 放进同一个 simulation-based operating-characteristic framework，而不是“先做一次 IA，再临时决定是否加样本量”。

**对设计或 SAP 的影响。** 如果试验计划在 IA 后依据 conditional/predictive probability 调整样本量，Protocol / SAP 至少应预先明确：IA timing、success/futility boundaries、SSR triggering region、最大样本量、final decision rule、Type I error preservation mechanism，以及这些元素的联合 simulation evidence。作者还特别提醒：SSR 不应成为 Bayesian/adaptive design 的默认附加项，只有在 attenuated-but-plausibly-successful scenario 下的收益能够抵消额外入组和复杂度时才值得采用。

**来源：** [Statistics in Medicine 全文](https://onlinelibrary.wiley.com/doi/10.1002/sim.70749)

### 3. A Nonparametric Data-Fusion Approach for Identification and Estimation of Nonignorable Missing Data With Shadow Variable

**发布日期 / 来源类型 / 阅读范围：** 2026-09-27；Statistics in Medicine 方法学研究论文；本期基于**公开摘要与可访问页面**阅读，未核验完整正文中的全部识别定理与证明。

**核心新意。** 论文关注 MNAR 最根本的问题——**non-identifiability**。与常见 delta-adjustment、pattern-mixture sensitivity analysis 直接指定不可由数据识别的 sensitivity parameter 不同，作者尝试引入 external data 与 shadow variable，为 MNAR 分布提供额外识别信息。更进一步的是，shadow variable 本身也允许 MNAR，而不是要求辅助变量必须完全观测。

**主要统计方法。** 在 pattern-mixture framework 下，shadow variable 与目标 MNAR 变量有关，但在给定目标变量和其他协变量后，与目标变量的 missingness 条件独立。方法借助 external data，重点估计 observed-data density 与 odds-of-missing function，并提供两种 multiple-imputation-based estimation strategy。公开摘要显示框架可覆盖 outcome MNAR、covariate MNAR 与不同变量类型。

**适用场景与局限。** 适用于有额外辅助变量、validation source 或 external dataset，并且能够提出可信 shadow-variable 结构的 MNAR 场景。最重要的限制不是计算，而是识别假设本身：shadow-variable conditional independence、外部数据与目标数据之间可迁移的信息，以及完整 nonparametric identification 所需条件必须有实质性依据。由于本期未核验正文中的完整 theorem 与 regularity conditions，不能把该方法简单视为“MNAR 已由数据解决”。

**为何值得读。** 它把 missing-data 讨论从“MAR 还是 MNAR、选哪种 imputation”推进到更根本的问题：**哪些额外数据和结构性假设能够让原本不可识别的 MNAR 部分变得可识别？** 这对临床试验设计阶段的数据采集比对锁库后的补救更有启发。

**对设计或 SAP 的影响。** 如果关键 endpoint 存在明显 MNAR 风险，设计阶段应考虑哪些辅助变量、外部资料或 validation data 能够对 missingness mechanism 提供信息，而不是等到 SAP 阶段才机械加入 delta tipping-point。即使最终仍采用监管更熟悉的 reference-based MI 或 delta-adjustment，本篇也提示：需要把 sensitivity parameter 的临床含义、外部证据来源和可识别性边界写清楚。

**来源：** [Statistics in Medicine DOI](https://doi.org/10.1002/sim.70747)

### 4. RICSICAS rationale and design：一个 O'Brien-Fleming + conditional-power SSR 的公开设计案例

**发布日期 / 来源类型 / 阅读范围：** 2026-09-30；Frontiers in Neurology trial rationale/design article；**全文阅读**。

**核心新意。** 这不是新的统计理论论文，但对实际 trial statistician 很有价值，因为它公开了一个同时包含 O'Brien-Fleming alpha-spending、unblinded interim efficacy review、conditional power 和 sample-size increase 的真实试验设计。它最值得读之处在于可以直接检验：一个看起来“组件都合理”的 adaptive design，是否在 Protocol/SAP 层面把触发条件、信息时间、样本量调整和最终推断真正闭环。

**主要统计方法。** 文章计划在约 50% required primary events 时进行 efficacy IA，使用 O'Brien-Fleming alpha-spending，给出 nominal thresholds：interim $$p<0.003$$、final $$p<0.049$$。IA 同时计算 conditional power；若 conditional power <50%，DSMB 可基于 observed event rate **和 observed treatment effect** 建议增加样本量，最高至 600，并称继续使用 O'Brien-Fleming boundary、无需进一步 alpha adjustment。

**适用场景与局限。** 该论文可以作为 event-driven superiority trial 的案例阅读，但公开文本存在几个需要进一步澄清的地方：

- 一处写“60% participants 完成随访”后做 interim analysis，另一处又定义为约 50% required primary events；两种触发标准并不等价。
- 摘要写总样本量 450；sample-size section 写 445，同时又写 225 per group（实际合计 450）。
- 主分析部分又出现一般性的 two-sided $$p<0.05$$，需要与 final O'Brien-Fleming nominal threshold $$p<0.049$$ 明确区分。
- 最关键的是，SSR 明确使用 observed treatment effect。对于这种 unblinded effect-dependent adaptation，公开文章没有给出足够的 conditional-error、combination-test、recalibrated boundary 或 simulation derivation 来验证“无需进一步 alpha adjustment”这一陈述。因此，仅凭本文公开信息**无法确认**该 SSR 规则与最终检验组合后是否严格维持整体 Type I error；这需要完整 protocol/SAP/DMC charter 或额外方法学说明。

**为何值得读。** 它是一个非常具体的提醒：**O'Brien-Fleming alpha-spending 本身只解决预先定义的 sequential testing；一旦同时加入基于未盲 treatment effect 的 SSR，不能自动假设原边界仍然完成了全部 Type I error 控制。** 每一个 adaptive component 都必须放回完整的 inferential procedure 中验证。

**对设计或 SAP 的影响。** 对类似试验，建议在定稿前逐项核对：IA 是按 calendar/follow-up 还是 information/event fraction 触发；实际信息比例偏离计划时如何重算 nominal boundary；conditional power 用 current trend、design alternative 还是其他假设；SSR 是否使用 blinded nuisance parameters 或 unblinded effect；若使用 unblinded effect，final test 如何保证 Type I error；最大样本量和不可行区如何定义；DMC recommendation 是否是确定性规则；最终 SAP 的显著性阈值是否与 group-sequential design 完全一致。

**来源：** [Frontiers in Neurology 全文](https://www.frontiersin.org/journals/neurology/articles/10.3389/fneur.2026.1915534/full)

## 可带回 Protocol / SAP 的问题

- **Bayesian Phase I–II：** prior 是否只在参数层面“看起来弱信息”，还是在 dose-selection probability 层面也真正无偏好？是否做过 prior predictive / prior-only dose recommendation calibration？
- **Interim + SSR：** 所有 stopping rule、sample-size adaptation 和 final decision rule 是否在同一套 simulation 中验证过 Type I error、power、expected sample size 与最大样本量分布？
- **Group sequential：** IA 的触发标准到底是 calendar/follow-up fraction、enrolled fraction、event fraction 还是 statistical information fraction？实际信息比例偏离计划时边界如何处理？
- **Unblinded SSR：** 如果 SSR 使用 observed treatment effect，是否明确采用 conditional error、combination test、recalibrated critical value，或其他经过证明/模拟验证的 Type I error preservation 方法？“沿用原 O'Brien-Fleming boundary”本身并不是充分说明。
- **MNAR：** 敏感性参数的来源是什么？哪些辅助变量或 external/validation data 能提供识别信息？关键 shadow-variable / transportability / missingness 假设是否有临床和数据层面的依据？
- **Estimand：** 本周没有新的 E9(R1) 文件，但 adaptive decision rule 仍应与 estimand 对齐。例如在 non-proportional hazards 下，如果 log HR 的临床解释发生变化，期中 success criterion 和 SSR 所针对的 treatment-effect summary 是否仍然回答原来的临床问题？
- **监管跟踪：** ICH E20 Step 4 在 2026 年 10 月被列为预期里程碑。后续一旦正式发布，应优先核对其对 adaptive design 的预设、Type I error、simulation、DMC/operational bias、Bayesian methods 与 SSR 的最终表述。


## 修订记录

- 2026-10-02T22:42:32+08:00：添加固定方法专题分类，仅标记本期实质性精选所覆盖的专题；正文方法解读及原始来源不变。
