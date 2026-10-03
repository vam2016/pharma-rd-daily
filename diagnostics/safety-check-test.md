---
title: "医药研发每日专业简报｜2026-10-02"
date: "2026-10-02 08:30:00 +0800"
week: "2026-09-28 至 2026-10-04"
summary: "诊断用近似正式日报内容。"
tags: ["临床试验", "药物研发", "监管动态", "统计方法"]
highlights:
  - "Phase III interim analysis"
  - "Extension durability"
  - "FDA data standard"
---

## 今日速览

- 过去24小时核心监管进展：阳性Phase III interim结果进入监管申报。
- 长期扩展研究需要区分durability与randomized comparative effect。
- 安全数据库数据标准切换可能改变观察到的报告结构。

## 第一部分：5条核心内容

### 1. Phase III interim：PFS HR=0.50

**发布日期：2026-10-01｜内容类型：Phase III interim analysis｜证据等级：公司正式披露**

研究随机纳入 **279例**患者，试验组 **n=140**，对照组 **n=139**。在预设interim analysis累计122个PFS事件时：

- median PFS：**14.5 vs 8.5个月**
- **HR=0.50（95%CI 0.34–0.73）**
- **p=0.00015**
- ORR：**65.0% vs 40.3%**
- OS interim：**HR=0.72（95%CI 0.42–1.23）**

> PFS success ≠ OS benefit established.

**来源：** [FDA](https://www.fda.gov/) | [ClinicalTrials.gov](https://clinicaltrials.gov/)

---

### 2. Extension durability：条件应答者分析

**发布日期：2026-10-01｜内容类型：Phase II extension｜证据等级：公司会议数据**

原随机研究主要分析未达到常规双侧0.05水平。长期extension中，Week 52达到预设response的患者中，停药后部分患者仍维持应答。

$$
P(R_{later}=1\mid R_{earlier}=1)
\neq
P(R_{later}=1\mid randomization)
$$

**统计学解读。** 这是conditional responder estimand，不应解释为整个人群的长期assignment effect。

**来源：** [Nektar](https://www.nektar.com/)

---

### 3. Open-label extension：低事件数与假精度

**发布日期：2026-10-01｜内容类型：Phase IIa OLE｜证据等级：公司topline**

49例进入OLE，37例完成48周；观察到1次临床事件。若只报告年化事件率，容易产生过度精确的视觉印象。

$$
\text{event count}=1
$$

在没有同期随机对照时：

$$
\text{OLE event rate}\neq\text{randomized treatment effect}
$$

**来源：** [Agomab](https://www.agomab.com/)

---

### 4. FDA数据标准切换

**发布日期：2026-10-01｜内容类型：监管数据标准｜证据等级：FDA正式要求**

新的结构化安全报告标准会影响字段映射、case versioning、duplicate management与missingness结构。分析长期趋势时需要检查迁移前后的数据生成过程。

**来源：** [FDA](https://www.fda.gov/)

---

### 5. Adaptive design：组合规则需要整体校准

**发布日期：2026-09-30｜内容类型：统计方法学｜证据等级：同行评议论文**

Posterior stopping rule与predictive sample-size re-estimation共用interim information时，不能分别验证后简单相加。

$$
A_{valid}+B_{valid}\not\Rightarrow(A+B)_{valid}
$$

至少需要模拟Type I error、power、expected sample size和early-stop probability。

**来源：** [Wiley Online Library](https://onlinelibrary.wiley.com/)

## 第二部分：深度案例解读

### A. Interim analysis

**统计学解读。** 公开材料若未披露alpha-spending function，则不能自行断言采用O'Brien–Fleming、Lan–DeMets或其他边界。

**临床价值解读。** PFS改善具有临床意义，但OS未成熟时不能升级为已证明survival benefit。

### B. Extension study

**统计学解读。** Crossover与extension以后，原始随机化不再直接保护新的长期比较。

**临床价值解读。** Durability仍然重要，但支持的claim不同于随机对照阶段。

## 第三部分：今日最值得保存的方法学结论

1. **PFS success ≠ OS benefit established**
2. **Responder durability是条件estimand**
3. **OLE不能自动继承原RCT的因果保护**
4. **Adaptive rules必须整体校准**

## 今日核查清单

- protocol / SAP
- multiplicity
- interim information fraction
- estimand
- missing-data strategy
