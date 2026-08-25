/**
 * ============================================
 *  Janet 个人品牌站 - 内容配置文件
 *  修改这个文件即可更新网站所有内容
 *  无需改动 HTML / CSS / JS
 * ============================================
 */

const SITE_CONFIG = {

  // ========== 个人基本信息 ==========
  profile: {
    name: "Janet",
    title: "AI应用开发者 / 商业插画师 / 自媒体创作者",
    tagline: "用技术赋能创意，用创意连接人心",
    intro: "软考高级项目管理师 · 高中信息教师资格 · 心理咨询基础证书 · 山东大学工程管理在读硕士",
    avatar: "avatar-ip.jpg", // 头像图片路径，留空则显示首字母
  },

  // ========== 三个方向 ==========
  directions: [
    {
      id: "ai-agent",
      icon: "🤖",
      name: "AI Agent 应用",
      subtitle: "AI动画 · 应用开发 · 自动化工作流",
      description: "用 AI Agent 重构企业与个人的工作方式——从动画生成到自动化流程，让技术真正落地。",
      color: "#FF6B9D",
      projects: [
        {
          name: "MBTI 性格测试小程序",
          status: "备案中 · 即将上线",
          desc: "基于微信小程序的 MBTI 性格测试工具，支持结果分享与裂变增长。用 TRAE 开发，全栈独立完成。",
          tags: ["微信小程序", "TRAE", "全栈开发", "裂变增长"],
          link: "",
          featured: true,
        },
        {
          name: "AI 短片制作流水线",
          status: "持续迭代中",
          desc: "从分镜脚本到成片的全自动化流程——TTS 配音、ffmpeg 剪辑、转场调色一条龙。",
          tags: ["Python", "ffmpeg", "edge-tts", "自动化"],
          link: "",
          featured: false,
        },
        {
          name: "AI 自动化工作流",
          status: "探索中",
          desc: "定时采集、内容生成、多平台分发——构建自媒体运营的自动化基础设施。",
          tags: ["自动化", "MCP", "工作流编排"],
          link: "",
          featured: false,
        },
      ],
    },
    {
      id: "illustration",
      icon: "🎨",
      name: "商业插画",
      subtitle: "直播创作 · 接单变现 · 风格探索",
      description: "从零开始学商业插画，通过直播展示创作过程，接单变现。在探索中找到自己的风格语言。",
      color: "#C9A9FF",
      works: [
        { title: "梧桐哥神 · 知了角色设计", desc: "五只知了的角色设定与场景插画", placeholder: true },
        { title: "女性成长系列", desc: "围绕女性独立与成长的插画系列", placeholder: true },
        { title: "商业接单案例", desc: "客户委托的商业插画作品", placeholder: true },
        { title: "直播创作精选", desc: "直播中即兴创作的精选作品", placeholder: true },
      ],
    },
    {
      id: "self-media",
      icon: "🎙️",
      name: "自媒体口播",
      subtitle: "女性成长 · 搞钱实战 · 思想分享",
      description: "分享女性新思想和创业搞钱过程中的真实感受。口播为主，多平台分发，真诚有料。",
      color: "#1A1A2E",
      platforms: [
        { name: "公众号", type: "图文", icon: "wechat", desc: "深度长文 · 女性成长与创业思考", account: "和学习私奔的橙小鱼", url: "" },
        { name: "知乎", type: "图文", icon: "zhihu", desc: "专业回答 · AI应用与职场经验", url: "https://www.zhihu.com/people/orangeQfish" },
        { name: "抖音", type: "视频", icon: "douyin", desc: "口播短视频 · 搞钱干货与思维认知", url: "https://www.douyin.com/user/MS4wLjABAAAANENF_ULM0JPEX1gzzw80rJcKbMgyPbZCjU0gkdnm1HJlQNpCKeGDCXom757pN7uM?from_tab_name=main" },
        { name: "小红书", type: "视频", icon: "xiaohongshu", desc: "生活方式 · 女性成长与好物分享", url: "https://www.xiaohongshu.com/user/profile/5bbf0cc28ec75a0001d376f2" },
        { name: "视频号", type: "视频", icon: "shipinhao", desc: "微信生态 · 深度口播与案例��解", account: "鱼弄农早日退休", url: "" },
        { name: "B站", type: "视频", icon: "bilibili", desc: "长视频 · AI教程与创业实录", url: "https://space.bilibili.com/702185433" },
      ],
      themes: [
        "女性独立与自我成长",
        "创业搞钱真实记录",
        "AI 工具实战分享",
        "心理学视角看世界",
      ],
    },
  ],

  // ========== 关于我 - 资质时间线 ==========
  timeline: [
    { year: "2022", title: "软考高级项目管理师", desc: "国家计算机技术与软件专业技术资格考试 · 高级" },
    { year: "2023", title: "高级中学信息教师资格证", desc: "教育部认定 · 高级中学信息技术学科" },
    { year: "2024", title: "心理咨询基础证书", desc: "心理学基础培训 · 助力内容创作的人文视角" },
    { year: "2026", title: "山东大学工程管理在读硕士", desc: "在职研究生 · 工程管理专业" },
  ],

  // ========== 技能标签 ==========
  skills: [
    { name: "项目管理", level: 90 },
    { name: "AI应用开发", level: 75 },
    { name: "TRAE / 低代码", level: 80 },
    { name: "内容创作", level: 85 },
    { name: "商业插画", level: 55 },
    { name: "心理学应用", level: 70 },
  ],

  // ========== 联系方式 ==========
  contact: {
    email: "",
    wechat: "",
    collaboration: "欢迎品牌合作、插画约稿、AI项目交流",
    socials: [
      { name: "公众号", icon: "wechat", url: "" },
      { name: "知乎", icon: "zhihu", url: "" },
      { name: "抖音", icon: "douyin", url: "" },
      { name: "小红书", icon: "xiaohongshu", url: "" },
      { name: "视频号", icon: "shipinhao", url: "" },
      { name: "B站", icon: "bilibili", url: "" },
    ],
  },

  // ========== IP 小助手 - 每个区块的俏皮话 ==========
  ipCompanion: {
    welcome: "你好呀！我是橙小鱼 Janet 的魔法小助手~ 欢迎来到她的创意世界！✨",
    welcomeBtn: "开始探索",
    messages: {
      hero: "欢迎来到 Janet 的创意世界！这里有技术、有画笔、也有搞钱秘籍~ 🪄",
      "ai-agent": "这里的 AI 项目都是 Janet 一手搭起来的！MBTI 小程序正在备案中，很快就能玩啦~ 🤖",
      illustration: "Janet 最近一直在画画呢！你也可以预约定制插画哦，每一笔都是独一无二的~ 🎨",
      "self-media": "Janet 在各个平台都在分享搞钱干货！去逛逛她的主页吧，说不定就能找到搞钱灵感~ 🎙️",
      about: "四张证书、三个方向、一个搞钱的灵魂——这就是 Janet！她自己都不相信能同时做这么多事~ 💪",
      contact: "想合作？想约稿？想聊聊 AI？随时找我！Janet 看到消息就会魔法闪现回复你~ 🌟",
      footer: "别忘了关注 Janet 的各个平台哦~ 下次见！挥挥魔法棒 👋✨",
    },
  },
  nav: [
    { label: "首页", target: "hero" },
    { label: "AI应用", target: "ai-agent" },
    { label: "商业插画", target: "illustration" },
    { label: "自媒体", target: "self-media" },
    { label: "关于我", target: "about" },
    { label: "联系", target: "contact" },
  ],
};
