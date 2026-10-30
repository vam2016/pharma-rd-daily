---
title: "临床试验统计方法精选｜2026-10-30"
date: "2026-10-30 10:03:00 +0800"
section: statistics
format: research_digest
permalink: /statistics/2026-10-30/
week: "2026-10-23 至 2026-10-30（北京时间，截至本次检索）"
summary: "本周精选两项实质性进展：retrieved dropout 的 estimand 对齐似然估计，以及针对临床-基因组数据库左截断的真实世界 PFS 加权估计；重点分析对随访策略、证据解释和研发决策的意义。"
topics: ["estimand", "missing-data", "survival"]
tags: ["estimand", "E9(R1)", "missing data", "retrieved dropout", "treatment policy", "rwPFS", "left truncation", "real-world evidence"]
---

## 本周判断

**检索窗口：2026-10-23 至 2026-10-30，截至北京时间本次检索时点。** 本期优先核对了方法学期刊原始页面、PubMed 和 FDA/EMA/ICH 公开资料。真正值得深入阅读的新增内容集中于两个问题：一是如何在停药后结局数据不完整时，将 **treatment-policy estimand** 与估计方法一致地联系起来；二是肿瘤临床-基因组真实世界数据库如何处理 **NGS 检测晚于治疗起始**所造成的选择偏倚与左截断。

本周不为了凑足五个专题而加入旧文献。**Bayesian Phase I–II、group-sequential/α 消耗、样本量/SSR** 未发现足够可靠且在本窗口首次公开的高价值新增研究或监管指导文件。FDA 的 [ICH E20 adaptive designs 页面](https://www.fda.gov/regulatory-information/search-fda-guidance-documents/e20-adaptive-designs-clinical-trials)仍标为 2025 年 draft；[EMA E20 页面](https://www.ema.europa.eu/en/scientific-guidelines/ich-e20-adaptive-designs-clinical-trials)仍列 Step 2b，本期不将其误写为新发布指南。

## 方法精选

### 1. Estimation of Treatment Effect in Clinical Trials of Continuous Endpoints With Retrieved Dropouts

**发布日期 / 来源类型 / 阅读范围：** 2026-10-25（期刊首次在线发表）；《Pharmaceutical Statistics》同行评议方法学论文。**本期核对了期刊摘要、PubMed 摘要、作者公开预印本的摘要及代码仓库说明；未核验期刊全文中的全部推导和模拟表格。** 论文早在 2026 年 4 月已有公开预印本，因此本周的新增节点是**期刊正式发表**，不是首次提出这一方法。

**核心新意。** 在停药（treatment discontinuation）作为 intercurrent event 的试验中，采用 treatment-policy (TP) strategy 意味着要估计“不论是否停药”的治疗效果。传统分析往往把重点放在缺失结局的填补，而作者提出将三类人群——持续完成治疗和随访者（completers）、停药但重新获取终点者（retrieved dropouts, RD）、失访者（lost to follow-up）——纳入**统一的参数化似然框架**，并显式给出 TP 与 hypothetical 两类 estimand 下的治疗效应。

**主要统计方法。** 对连续型终点，结合 ANCOVA 结构与描述停药机制的 probit model，使用最大似然估计处理不同停药/观察状态的数据。与单纯从 completer 或 RD 人群进行外推的插补方法相比，这一框架试图在一个联合模型中保留停药机制、可观察结局与目标治疗效应之间的联系。作者开展了与其他方法的数值比较，包括 retrieved-dropout 信息有限的情形。**具体完整似然、识别条件、标准误构造和各模拟情景的数值结果，本期未从期刊全文核验，不作定量优劣断言。**

**适用场景与局限。** 对停药较常见、主要终点为连续变量、且能在部分停药受试者中继续获得结果的随机对照研究尤其有价值，例如慢性疾病、体重管理或精神神经疾病研究。该方法不是“不需要假设的 MNAR 解决方案”：结果仍依赖 ANCOVA/probit 联合模型的正确性，以及从 RD、completers 和失访者数据推断未观测结局的可识别性与外推条件。RD 极少、停药原因与未观测结局有复杂关联、或模型明显错设时，不能默认优于 reference-based MI、off-treatment MI 或 MMRM。

**为何值得读。** 这篇文章把 E9(R1) 的概念落实为一个统计设计问题：**同一个数据集，针对 TP 与 hypothetical 的临床问题，应如何构造不同的治疗效应参数？** 它也提醒我们，停药并不等于结局缺失；真正需要建模的是停药之后未能观察到的结果及其机制。

**对研发/设计的启示。** 对采用 TP estimand 的研发项目，**停药后继续收集终点**不只是减少 missing rate，而是为目标 estimand 提供直接证据。设计时应关注预计停药比例、停药后数据的可获取率、不同停药原因的异质性，以及模型对这些信息的依赖程度。是否增加停药后随访资源，应与目标临床问题和分析方法一起决策，而非只在研究末期选择一种插补算法。

**来源：** [期刊原始论文（DOI）](https://doi.org/10.1002/pst.70143)；[PubMed](https://pubmed.ncbi.nlm.nih.gov/42927880/)；[作者公开预印本](https://arxiv.org/abs/2604.03863)；[作者复现代码](https://github.com/myeongjong/RDancova)。

### 2. An Inverse-Selection-Probability Weighted Approach for Real-World Progression-Free Survival With Left-Truncated Clinico-Genomic Data

**发布日期 / 来源类型 / 阅读范围：** 2026-10-28；《Pharmaceutical Statistics》开放获取方法学论文。**已阅读可访问的期刊 HTML 全文，包括方法、模拟、真实数据应用和讨论。**

**核心新意。** 在按 NGS 结果定义肿瘤亚群的 clinico-genomic 数据库中，患者往往在治疗开始后才完成测序。若患者在测序前死亡或失访，则根本无法进入数据库；直接以治疗起始为时间零点进行常规 KM 估计，可能高估生存。传统 delayed-entry risk-set adjustment (RSA) 虽能处理左截断，但对于 **rwPFS**，它还会排除“在测序前已经进展、但在测序时仍存活且有随访记录”的患者。新方法采用 **inverse-selection-probability weighting (ISPW)**，试图在修正选择偏倚的同时保留这些已观察到的早期进展事件。

**主要统计方法。** 令 $$E$$ 为治疗起始至测序的时间，$$L$$ 为治疗起始至死亡或失访的最早时间。样本被观察到的条件为 $$E\le L$$；对已观察到的患者，论文使用的选择概率权重为：

$$
w_i=\{P(E\le L_i)\}^{-1}
$$

其中 $$w_i$$ 是第 $$i$$ 位患者的权重，$$L_i$$ 是其死亡或失访前的最后可观察时间。利用估计的选择概率构建加权 KM 曲线；标准误/置信区间采用重新估计权重的 bootstrap，并讨论了适应权重的 Cox score / log-rank 型比较。目标仍是从**治疗起始日**计算的边际 rwPFS 生存函数，而不是把 time zero 改为测序日。

**适用场景与关键假设。** 适用于以治疗起始为临床索引日期、NGS 检测发生时间不一、且数据库仍可观察到部分“测序前进展”的真实世界肿瘤队列。核心假设非常强：论文要求测序时间与事件时间独立，并要求测序时间与死亡/失访前最后可观察时间独立；还需要适当的独立删失和可估计的正选择概率。真实世界中测序时间常受疾病严重程度、治疗线数、医疗可及性和进展状况影响，**独立截断假设可能不成立**。作者也明确承认这是关键局限。此方法校正的是选择机制，**并不自动解决不同治疗组间的 confounding 或使观察性比较成为随机化因果效应。**

**论文结果。** 在一项转移性乳腺癌真实世界队列应用中，ISPW 分析纳入 **484** 例已观察患者，而传统 RSA 纳入 **91** 例；估计中位 rwPFS 分别为 **4.92 月（95% CI 4.36–5.97）**和 **5.54 月（95% CI 4.36–6.79）**。两种校正方法的点估计总体相近，但 ISPW 的区间更窄；未经校正的方法呈现较慢的生存曲线下降。这些结果属于该数据库及其假设下的示例，不能直接推广为所有 NGS 队列的固定偏倚幅度。

**为何值得读。** 这篇论文揭示了一个容易混淆的地方：**PFS 事件已发生，并不意味着患者不可能在后续测序后进入 clinico-genomic 数据库。** rwPFS 的事件定义、数据库入选机制与 delayed-entry 方法必须放在一起考虑，不能机械照搬 OS 的左截断处理。

**对研发/设计的启示。** 当真实世界证据用于靶点/生物标志物亚群的预后估计、单臂试验外部参照、或后续研究的 PFS 假设时，应首先梳理“治疗起始—进展—测序—死亡/失访”的时间顺序。数据库可用人数不等于无选择偏倚的样本量。是否存在足够多的测序前进展病例、测序时机是否受病情驱动、加权后有效样本量与权重极值如何，都可能改变对外部证据可靠性及后续研发方案的判断。

**来源：** [期刊开放获取全文（DOI）](https://doi.org/10.1002/pst.70145)。

## 对研发 / 设计的启示

本周两项研究指向同一个更上游的决策原则：**统计估计的可靠性取决于研究在什么时间、为什么能观察到哪些患者的哪些结局。** 在随机试验中，停药后的 retrieved-dropout 数据直接关系到 treatment-policy estimand；在肿瘤真实世界数据中，NGS 的检测时间与入选机制决定 rwPFS 是否存在选择偏倚。

后续研发评估时，值得优先回答三个问题：第一，目标临床问题所需的结局是否在 ICE 之后仍被主动收集；第二，纳入数据的机制是否依赖结局或预后，且其独立性假设是否可信；第三，新方法带来的效率提升，是否建立在可以验证或通过敏感性分析挑战的假设上。

对于 **group-sequential、Bayesian Phase I–II、样本量/SSR**，本周没有确认足够重要的新增，不用旧研究补位。继续关注 ICH E20 正式状态变化，以及能够同时报告 Type I error、power、决策正确率、资源消耗和模型错设稳健性的设计方法。
