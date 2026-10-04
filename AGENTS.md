# 「AIGC实验室」高中生AIGC科普网站 - 需求拆解文档

## 产品概述

- **产品类型**: 面向高中生的AIGC前沿发展科普网站（内容型展示网站）
- **场景类型**: <scene_type>prototype-app</scene_type>
- **目标用户**: 高中生（15-18岁），对AI生成内容好奇但无技术基础；同时兼容手机、平板、PC三端访问
- **核心价值**: 用高中生能看懂的大白话+趣味卡通风格，讲清楚AIGC（AI生成内容）是什么、怎么发展来的、能做什么、怎么上手玩
- **网站名称**: 「AIGC实验室」
- **Slogan**: “带你看懂AI是怎么‘生成万物’的”
- **界面语言**: 中文
- **主题偏好**: user_specified（用户明确要求：明亮科技蓝为主色 + 浅黄点缀 + 深色模式切换，风格活泼有科技感，加小动画与AI卡通元素，避免严肃沉闷）
- **导航模式**: 路径导航（多页面内容站）
- **导航布局**: Topbar（面向学生群体的消费级内容网站，M3 体系下移动端可配合底部导航）

> **风格事实来源说明**: 用户附带设计风格附件 `Material 3-1873407955056675`（文本文件，已在 supplied_design_style 段消费）。落地方式：遵循 M3 完整体系（tonal 色阶 / 大圆角胶囊 / surface 层级 / 五档按钮 / Roboto + Noto Sans SC 字体栈 / 禁直角禁纯黑白背景），但按 M3 “单种子色生成全套 tonal palette” 原则，将种子色由 Baseline 紫 `#6750A4` 替换为**明亮科技蓝**（如 `#1E6FE8` 系）生成主色 tonal 色阶，**浅黄**作为 tertiary 容器色点缀（贴纸、高亮标签、卡通元素底色），即满足用户“科技蓝+浅黄”诉求又不破坏 M3 结构。深色模式直接使用 M3 对应 dark token。
> **部署约束**: 用户要求代码可直接上传 GitHub 并支持 GitHub Pages 部署 —— 必须为纯前端静态站点，路由使用哈希路由（HashRouter）或相对路径配置，无后端依赖，无环境变量。

---

## 页面结构总览

| 页面名称 | 文件名 | 路由 | 页面类型 | 入口来源 |
|---------|-------|------|---------|---------|
| 首页 | `HomePage.tsx` | `/` | 一级 | 导航 |
| AI小历史 | `HistoryPage.tsx` | `/history` | 一级 | 导航 / 首页卡通图标入口 |
| 前沿新鲜事 | `NewsPage.tsx` | `/news` | 一级 | 导航 / 首页卡通图标入口 |
| 趣味小实验 | `LabsPage.tsx` | `/labs` | 一级 | 导航 / 首页卡通图标入口 |
| 资源百宝箱 | `ResourcesPage.tsx` | `/resources` | 一级 | 导航 / 首页卡通图标入口 |
| 搜索结果浮层 | `SearchOverlay.tsx`（全局组件） | — | 浮层 | Topbar 搜索框输入触发 |

> 页面数量说明：5 个页面各对应一个互不重叠的独立用户目标（了解历史 / 看前沿资讯 / 动手做实验 / 找学习资源 / 站点总入口），均为用户明确要求，不增不减。搜索不单独成页，以全站浮层（顶部下拉结果面板）承载，符合“操作逻辑简单”的诉求。

---

## 页面布局建议

- **布局模式**: 全站内容型布局 —— 首页为「Hero Banner + 4宫格入口 + 引导板块」的纵向分区结构；内页为「页头 + 内容流」单栏布局，卡片网格随断点自适应（手机1列 / 平板2列 / PC 3列）
- **视觉重心**: 内容卡片（时间轴节点卡、快讯卡、实验卡、资源卡）—— 卡片用 surface-container 底 + 圆角12，卡通图标与浅黄贴纸元素做点缀
- **结果承载区（搜索）**: Topbar 搜索框输入后下拉展开全局搜索结果浮层，按页面分组的匹配条目（标题+摘要片段+跳转按钮）；初始态为隐藏，无结果时展示“没找到～换个关键词试试？”空状态 + 热门推荐词

---

## 导航配置

- **导航布局**: Topbar（PC/平板）；移动端可使用 M3 底部 NavigationBar（激活项 = secondary-container 胶囊指示器 + 图标实心）
- **导航项**（仅一级页面）:

  | 导航文字 | 路由 | 图标 |
  |---------|------|------|
  | 首页 | `/` | Home |
  | AI小历史 | `/history` | History |
  | 前沿新鲜事 | `/news` | Newspaper |
  | 趣味小实验 | `/labs` | Science |
  | 资源百宝箱 | `/resources` | Inventory 2 |

- **Topbar 附加元素**: 网站名「AIGC实验室」（配AI卡通Logo）、全局搜索框、深色模式切换按钮（浅黄点缀的太阳/月亮图标）

---

## 数据来源声明

| 数据/操作 | 来源类型 | 实现要求 | mock 兜底 |
|---|---|---|---|
| AIGC发展时间轴内容 | demo-mock | `src/data/history.ts` 编写 8-10 个时间节点（从早期AI画图到多模态大模型），每节点含年份、标题、趣味小故事、通俗解释 | ✅ 本身就是站点内容 |
| 前沿快讯列表 | demo-mock | `src/data/news.ts` 编写 8-10 条近1年AIGC新成果（AI生成3D游戏场景 / AI帮科学家研发新药 / AI写代码做动画等），每条含标题、标签（学习工具/娱乐应用/科研突破）、大白话解释、生活关联说明、emoji/卡通示意图 | ✅ 本身就是站点内容 |
| 小实验教程列表 | demo-mock | `src/data/labs.ts` 编写 4 个无代码小实验（生成动漫头像 / 作文提纲+修改 / 短视频脚本 / 自选1个），每个含分步操作指引、每步说明、提示 | ✅ 本身就是站点内容 |
| 学习资源列表 | demo-mock | `src/data/resources.ts` 编写免费AI工具、科普短视频、高校AI专业介绍、高中生AI竞赛四类资源，每条含名称、简介、链接、标签 | ✅ 本身就是站点内容 |
| 全站内容搜索 | demo-mock | 汇总以上四类数据为统一索引（标题+摘要+正文关键词），前端模糊匹配过滤，结果分组展示并跳转对应页面 | 无（索引由站点内容构建） |
| 一键分享 | import-export | `navigator.share`（支持时唤起系统分享面板）+ 兜底 `navigator.clipboard` 复制链接 + toast 提示；分享内容为当前页面标题+URL | 复制失败 toast 提示 |
| 深色模式偏好 | local-persist | localStorage key=`__global_aigc_theme`，存 `light`/`dark`，初始化时读取并应用到 M3 dark token | 无 |

> 自检说明：本站为纯科普内容展示站，所有“AI生成/AI画图”均指**向学生介绍的科普内容**（实验教程仅提供外部工具操作指引），站内不存在需要调用 AI 插件的实时生成/识别功能，故无插件规划，全部内容数据以静态文件承载，符合 GitHub Pages 部署约束。

---

## 功能列表

> 说明：每个页面的功能点，供页面生成使用

- **页面/区块**: 全局（Layout）
  - **页面目标**: 提供全站统一的导航、搜索、主题切换与分享能力
  - **功能点**:
    - **Topbar 导航**: 5个一级页面导航项，激活项用 secondary-container 胶囊指示器；移动端折叠为底部 NavigationBar 或汉堡菜单
    - **全站内容搜索**: Topbar 搜索框（M3 Outlined/Filled 统一其一）输入关键词，下拉浮层实时展示按页面分组的匹配结果（标题+摘要片段），点击条目跳转对应页面并高亮，无结果展示空状态+热门推荐词
    - **深色模式切换**: 顶栏太阳/月亮按钮切换 light/dark，M3 token 整体切换，偏好持久化到 localStorage，刷新后保持
    - **一键分享**: 页面内分享按钮，唤起系统分享面板或复制链接+toast 反馈
    - **响应式适配**: 手机/平板/PC 三端断点自适应，触控目标 ≥48dp

- **页面/区块**: 首页 `HomePage`
  - **页面目标**: 一屏抓住学生注意力，引导进入四大内容板块
  - **功能点**:
    - **动态Hero Banner**: 卡通AI生成内容动图（CSS/SVG 动画模拟“AI画笔生成图片”过程），配引导语“你刷到的AI视频、AI画图，背后的原理原来这么简单！”、网站名与slogan、悬浮小动画粒子/星星
    - **4宫格卡通入口**: AI小历史 / 前沿新鲜事 / 趣味小实验 / 资源百宝箱 四个大卡片，各配卡通图标（Material Symbols + 浅黄贴纸点缀）+ 一句话简介，hover/触摸有弹跳动效，点击跳转对应页面
    - **给高中生的话**: 底部 primary-container 底色引导板块，用亲切口吻介绍“AI不是魔法，你也可以玩转”，附“先去趣味小实验试试” Tonal 按钮引导

- **页面/区块**: AI小历史页 `HistoryPage`
  - **页面目标**: 用时间轴讲清AIGC发展历程，零术语门槛
  - **功能点**:
    - **纵向时间轴**: 8-10 个节点（早期AI画图 → 深度学习画图 → 文字生图爆发 → 大语言模型 → 多模态大模型），PC 端左右交错布局，移动端单侧布局，节点圆点带呼吸动画
    - **节点卡片**: 每个时间节点含年份胶囊标签、标题、趣味小故事（讲故事口吻）、通俗解释（用生活类比，避免晦涩术语）、卡通配图/emoji
    - **滚动渐入动画**: 节点随滚动进入视口渐入（IntersectionObserver），增强“读故事”的节奏感

- **页面/区块**: 前沿新鲜事页 `NewsPage`
  - **页面目标**: 用科技快讯形式让学生了解AIGC最新好玩成果
  - **功能点**:
    - **标签筛选**: 顶部 FilterChip 组（全部 / 学习工具 / 娱乐应用 / 科研突破），点击即时筛选卡片列表，激活chip高亮
    - **快讯卡片流**: 每条快讯含卡通示意图（emoji/插画风格占位）、标题、“这个突破是什么”大白话解释、“和我们的生活有什么关系”关联说明、标签、发布时间；卡片网格自适应三端
    - **单条分享**: 每条快讯卡片的分享图标，分享该条快讯标题+页面链接

- **页面/区块**: 趣味小实验页 `LabsPage`
  - **页面目标**: 让学生零代码、低门槛动手体验AIGC
  - **功能点**:
    - **实验列表**: 4 个无代码小实验卡片（用AI生成专属动漫头像 / 让AI帮你写作文提纲+修改文章 / 用AI生成专属短视频脚本 / 1个自选补充实验），各配卡通图标、难度与耗时标签
    - **分步操作指引**: 每个实验展开后显示分步指引（步骤序号胶囊 + 每步详细说明 + 小提示），可展开/收起（手风琴交互），强调“不用写代码”
    - **实验注意事项**: 每个实验附“安全提示”块（如“AI只是助手，作文还要自己写”“注意个人隐私”），用 error/浅黄色提示卡呈现

- **页面/区块**: 资源百宝箱页 `ResourcesPage`
  - **页面目标**: 汇总高中生友好的AIGC学习资源，标注免费与零基础属性
  - **功能点**:
    - **四类资源分组**: 免费AI工具导航 / 趣味科普短视频 / 高校AI专业入门介绍 / 高中生AI竞赛信息，四组卡片列表，各配分类标题与卡通图标
    - **资源标签体系**: 每条资源标注“学生免费”“无基础可学”胶囊标签（浅黄 tertiary 容器色），外加来源/适用说明
    - **外链跳转**: 资源条目点击新窗口打开链接（`target=_blank rel=noopener`），附外链图标提示

---

## 数据共享配置

| 存储键名 | 数据说明 | 使用页面 |
|---------|---------|---------|
| `__global_aigc_theme` | 深色模式偏好，类型为 `string`（`'light'` \| `'dark'`） | 全局 Layout |

```ts
// 搜索索引条目类型（由各 data 文件构建，供全局搜索使用）
interface ISearchIndexItem {
  /** 唯一id */
  id: string;
  /** 来源页面路由，如 /history */
  page: string;
  /** 来源板块名，如 AI小历史 */
  pageLabel: string;
  /** 条目标题 */
  title: string;
  /** 摘要片段（用于搜索结果展示与匹配） */
  summary: string;
  /** 匹配用关键词（标签、别名） */
  keywords: string[];
}

// 前沿快讯类型
interface INewsItem {
  id: string;
  title: string;
  /** 标签分类 */
  category: 'study' | 'fun' | 'research';
  /** 这个突破是什么（大白话） */
  breakthrough: string;
  /** 和我们的生活有什么关系 */
  relevance: string;
  /** emoji/卡通示意图标识 */
  icon: string;
  /** 发布时间描述 */
  date: string;
}

// 学习资源类型
interface IResourceItem {
  id: string;
  /** 资源分类 */
  category: 'tool' | 'video' | 'major' | 'contest';
  name: string;
  description: string;
  url: string;
  /** 是否学生免费 */
  free: boolean;
  /** 是否无基础可学 */
  beginner: boolean;
}
```

---

## 附加实现约束（供下游执行参考）

- **静态部署**: 纯前端无后端；路由用 HashRouter（GitHub Pages 子路径部署最稳），资源引用用相对路径，可直接推送到 GitHub 仓库开启 Pages
- **动画**: 使用 CSS transition/animation + IntersectionObserver 实现（漂浮Banner、时间轴呼吸圆点、卡片弹跳、滚动渐入），动效曲线遵循 M3 emphasized easing `cubic-bezier(0.2,0,0,1)`；不引入重型动画库，保证移动端流畅
- **卡通元素**: AI卡通形象用 Material Symbols 图标 + CSS 组合或内联 SVG 实现，配浅黄贴纸/星星/气泡点缀，不依赖外部图片资源

-------

<scene_type>prototype-app</scene_type>

# UI 设计指南

## 1. 设计推导依据

- **参考意图**: Free Direction（附带的 Material 3 是系统性风格规范，非截图复刻）—— 消费其形状、层级、组件与动效语言；色彩按 M3 方法论以「明亮科技蓝」为种子色重建 tonal 色阶，浅黄作次级容器点缀。
- **核心情绪 / 应用类型**: 高中生一眼想点进去的「AI 实验室」——活泼、友好、零门槛的科普内容站（Content + 轻量 Landing 混合）。
- **独特记忆点**: 一只圆滚滚的蓝色 AI 机器人吉祥物贯穿全站（Banner 动图、时间轴节点、实验步骤指引），配合胶囊形状 + 蓝黄撞色的「实验室试管」视觉母题。

## 2. Art Direction

- **方向名**: 胶囊实验室 · Soft Pop
- **Design Style**: Material 3 + Soft Blocks 柔色块 —— M3 的移动优先、大圆角、tonal 色阶天然适合青少年消费级产品；柔色块和卡通插画补足趣味性。
- **DNA 参数**: 圆角 pill/极端（按钮胶囊 rounded-full、容器 rounded-xl~2xl）；阴影无~轻（层级靠 surface 色阶推进）；间距 spacious（gap-6 / p-8，触控目标 ≥48px）；字体方向清晰无衬线（Roboto + Noto Sans SC）；装饰手法为卡通 AI 吉祥物、浅黄色 badge、圆点虚线连接线。
- **应用类型**: Content —— 内容区宽松、阅读优先，首页按 Landing 叙事组织。

## 3. Color System

**色彩关系**: 明亮科技蓝种子色生成 tonal 色阶（primary → primary-container → surface 族带淡蓝倾向）+ 浅黄次级容器作点缀底，构成「蓝色实验 + 黄色惊喜」的实验室撞色。
**配色设计理由**: primary 承担主 CTA、当前页指示与品牌识别；surface 族页面底保证阅读舒适；浅黄 accent 只用于 hover/选中浅底、标签 badge 与吉祥物点缀，权重远低于蓝，避免蓝黄打架。
**主色推导**: 用户指定明亮科技蓝，取 hsl(215 90% 50%) 为种子，按 M3 tonal 逻辑向浅（primary-container）与深（on-primary-container）衍生；浅黄为用户指定的点缀色，落在 48° 色相的高明度低权重档。
**使用比例**: 60% 中性（surface 族）/ 30% 辅助（浅黄 container + 淡蓝 container）/ 10% primary；严禁主按钮、tab 激活、icon、边框、链接同时用 primary。

| 角色 | CSS 变量 | Tailwind Class | HSL 值 | 设计说明 |
|---|---|---|---|---|
| bg | `--background` | `bg-background` | hsl(220 45% 98%) | 淡蓝白页面底，非纯白 |
| card | `--card` | `bg-card` | hsl(218 38% 94%) | surface-container，卡片/弹层/结果面板 |
| text | `--foreground` | `text-foreground` | hsl(218 40% 14%) | 标题与正文，深墨蓝 |
| textMuted | `--muted-foreground` | `text-muted-foreground` | hsl(218 14% 42%) | 说明、占位符、元信息 |
| primary | `--primary` | `bg-primary` / `text-primary` | hsl(215 90% 50%) | 主 CTA、导航激活胶囊、品牌锚点 |
| primaryForeground | `--primary-foreground` | `text-primary-foreground` | hsl(0 0% 100%) | primary 上的文字图标 |
| accent | `--accent` | `bg-accent` | hsl(48 92% 90%) | 浅黄：hover/选中浅底、badge、吉祥物点缀 |
| accentForeground | `--accent-foreground` | `text-accent-foreground` | hsl(44 80% 20%) | accent 上的深黄褐文字 |
| border | `--border` | `border-border` | hsl(218 16% 78%) | 输入框描边、卡片边界 |

**语义色提示**: 成功 hsl(150 60% 34%)（bg hsl(150 60% 92%) / border hsl(150 40% 70%) / text 同主值）；警告 hsl(38 85% 38%)（bg hsl(44 90% 90%) / border hsl(40 70% 70%) / text 同主值）；错误 hsl(4 70% 45%)（bg hsl(4 80% 95%) / border hsl(4 50% 72%) / text 同主值）。三者饱和度与 primary(90%) 相差 ±15% 内偏保守，色温均与蓝底协调。暗色模式：bg hsl(220 25% 8%) / card hsl(219 22% 13%) / primary hsl(214 90% 70%) / accent hsl(46 70% 30%)，一一对应 M3 dark token。

## 4. 字体与节奏

- **font-display**: Roboto + Noto Sans SC（Bold 700）—— 趣味感由色彩、胶囊形状与插画承担，标题保持清晰可信；logo「AIGC实验室」可做胶囊色块字。
- **font-body**: Roboto + Noto Sans SC —— 长文科普阅读舒适，字重 400/500 分层。
- **字号**: H1 text-4xl ~ text-5xl；H2 text-2xl ~ text-3xl；body text-base；muted text-sm；badge 用 label 风格 text-sm 500。
- **圆角**: 极端 —— 按钮/导航胶囊 rounded-full，卡片 rounded-xl(12-16px)，Hero 容器 rounded-3xl(28px)，严禁直角控件。

## 5. 全局布局契约

- **Reference Layout Use**: 按需求结构推导，M3 提供形状与导航模式（胶囊激活指示器）。
- **Page / Section Order**: 首页（Hero 动图 Banner → 4 卡通图标入口 → 给高中生的话）/ AI 小历史（垂直时间轴）/ 前沿新鲜事（标签筛选 + 快讯卡片流）/ 趣味小实验（分步指引卡片）/ 资源百宝箱（分类资源列表），与路由 1:1 对齐。
- **Standard Content Zone**: `max-w-5xl mx-auto`（内容站阅读优先）。
- **Shell / Frame Alignment**: 同宽 —— 顶部胶囊导航、内容区、页脚共享同一 max-w 与左右 padding 节奏。
- **Padding & Rhythm**: `px-4 md:px-6 lg:px-8 py-8 md:py-12`，4dp 网格，区块间 gap-8。
- **Full-bleed Zones**: 首页 Hero Banner 背景可全宽，内部引导语与 CTA 仍受内容区约束。
- **Local Narrowing**: 实验步骤正文、给高中生的话收窄至 `max-w-2xl` 保证行长。
- **Overflow Strategy**: 标签筛选条、资源表格用 `overflow-x-auto`，移动端导航收进汉堡菜单。
- **Flexibility Boundary**: 允许移动端 padding、卡片列数微调；不允许切换 max-w、圆角体系、主色与阴影语言。

## 6. 视觉与动效

- **装饰**: AI 机器人吉祥物、浅黄圆角 badge、圆点虚线时间轴连接线。
- **阴影/边界**: 无~轻 —— 层级靠 surface 色阶（bg → card → card-high），仅 FAB/分享按钮带轻阴影。
- **动效**: 丰富但轻快 —— Banner 吉祥物漂浮循环、入口卡片 hover 上浮 + badge 变色、时间轴节点滚动入场、动效统一 `cubic-bezier(0.2,0,0,1)`，均 ≤300ms，尊重 prefers-reduced-motion。

## 7. 组件原则

- 按钮五档：Filled 蓝胶囊（主 CTA）/ Tonal 浅黄（次级）/ Outlined / Text；全部 rounded-full、高 ≥48px。
- 导航激活项 = 浅黄胶囊指示器 + 图标实心；深浅色切换按钮固定在导航右侧，搜索用统一 Filled 输入风格（surface-container 底 + 底边线）。
- 快讯卡片：card 底 rounded-xl 无边框 + 浅黄标签 chip（rounded-lg 描边）；空状态画吉祥物举放大镜插画，不回退默认样式。

## 8. Image Direction

- **Image Role**: 首页 Hero 动图主视觉 + 各页面卡通插画（时间轴节点、快讯示意图、实验步骤指引图）。
- **Image Art Direction**: 扁平矢量卡通插画风，主角为圆润蓝色 AI 机器人（发光眼睛、浅黄色细节），在明亮的淡蓝实验室场景中「生成」图像/视频/3D 场景；构图居中偏左留出叠字区，光线明亮均匀、柔和渐变，材质为干净几何色块 + 少量高光点，情绪好奇、欢快、无门槛感。
- **Image Prompt Keywords**: flat vector cartoon illustration, cute round blue robot mascot, glowing light-yellow accents, bright tech-blue lab scene, generating pictures and videos from holographic screen, soft gradients, geometric shapes, playful sci-fi, high school friendly, clean composition with negative space, cheerful and curious mood
- **Image Avoidance**: 避免写实机器人、深色赛博朋克霓虹、商务图库感的素材人物、无主题抽象渐变背景、廉价 3D 渲染质感。

## 9. Anti-patterns

- **Split personality**: 五个页面切换 max-w、圆角或主色；全站共享同一胶囊 + surface 色阶系统。
- **Phantom tokens**: 编造不存在的 M3 变量；只使用已定义 token 或在主题中补齐。
- **Default SaaS drift**: 回到默认蓝紫渐变与直角卡片；用蓝黄撞色 + 吉祥物 + 胶囊形状塑造实验室个性。
- **Invisible interaction**: 吉祥物动效做了、focus-visible 丢了；搜索框、筛选 chip、分享按钮都要有键盘可见状态。
- **Mono-hue tyranny**: 蓝色铺满按钮、icon、边框、链接、时间轴；按 60-30-10 收回，浅黄只做点缀与状态底。
- **Status color drift**: 成功/警告色饱和度远超 primary 显得刺眼；语义色与主色饱和度对齐 ±15%。