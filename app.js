/* ============================================
   Janet 品牌站 - 渲染逻辑 & 交互
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  const cfg = typeof SITE_CONFIG !== "undefined" ? SITE_CONFIG : {};

  // 品牌 logo SVG 映射（共享）
  const brandLogos = {
    wechat: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.69 3.46c-3.42 0-6.19 2.77-6.19 6.19 0 3.42 2.77 6.19 6.19 6.19.89 0 1.74-.19 2.5-.53l1.6.96-.6-1.47c1.11-.77 1.84-2.01 1.84-3.42 0-2.65-2.45-4.79-5.34-4.79zm-1.08 3.84c.35 0 .64.29.64.64s-.29.64-.64.64-.64-.29-.64-.64.29-.64.64-.64zm2.86 1.28c-.35 0-.64-.29-.64-.64s.29-.64.64-.64.64.29.64.64-.29.64-.64.64z"/></svg>`,
    zhihu: `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" rx="3"/><path d="M7 7h5v1.5H7V7zm0 3.5h8v1.5H7v-1.5zm0 3.5h7.5V15.5H7V14zm8-6c0 2.2-1.8 4-4 4H9.5v-2h1.5c1.1 0 2-.9 2-2s-.9-2-2-2V4c2.2 0 4 1.8 4 4z" fill="white"/></svg>`,
    douyin: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 2h-3.5v10.5a2.5 2.5 0 11-2.5-2.5c.17 0 .33.02.5.05V7c-.2-.02-.33-.05-.5-.05a5.5 5.5 0 105.5 5.5V7c1 .8 2 1.5 3.5 1.5V5c-1.2 0-2.3-.5-3-1.5v-1.5z"/></svg>`,
    xiaohongshu: `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M12 5c-3.3 0-6 2-7 5.5 0 0 1.5-1 3-1 0 0-2 1.5-2 4s2.5 3.5 4 3.5c2 0 3.5-1.5 3.5-3.5 0-2-1.5-3.5-4-3.5.5.5.5 1.5.5 2s0 1-.5 1.5c.5-.5 1-1 1-2s-.5-2.5-2-3c1.5 0 3 .5 3 2s-1.5 3-2.5 3-2.5-.5-2.5-2 1-2.5 2.5-2.5c-1 0-2 .5-2 2s1 2 2 2 2-1 2-2.5-1.5-3-3.5-3z" fill="white"/></svg>`,
    shipinhao: `<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><polygon points="10,7 10,17 17,12" fill="currentColor"/></svg>`,
    bilibili: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.8 3.2c-.2 0-.5.1-.7.2l-2.5 1.8H9.4L6.9 3.4c-.2-.1-.5-.2-.7-.2-.3 0-.6.1-.8.4-.3.3-.4.7-.4 1.1v12.8c0 1.7 1.4 3 3 3h8c1.7 0 3-1.3 3-3V4.7c0-.4-.1-.8-.4-1.1-.2-.3-.5-.4-.8-.4zM9 10l6 3.5-6 3.5V10z"/></svg>`,
  };

  /* ====== 导航栏渲染 ====== */
  function renderNav() {
    const navLinks = document.getElementById("navLinks");
    if (!navLinks || !cfg.nav) return;
    navLinks.innerHTML = cfg.nav
      .map(
        (item) =>
          `<li><a href="#${item.target}" data-target="${item.target}">${item.label}</a></li>`
      )
      .join("");
  }

  /* ====== Hero 渲染 ====== */
  function renderHero() {
    const p = cfg.profile || {};
    const avatar = document.getElementById("heroAvatar");
    const name = document.getElementById("heroName");
    const title = document.getElementById("heroTitle");
    const tagline = document.getElementById("heroTagline");
    const intro = document.getElementById("heroIntro");
    const dirs = document.getElementById("heroDirections");

    if (avatar) {
      if (p.avatar) {
        avatar.style.backgroundImage = `url(${p.avatar})`;
        avatar.style.backgroundSize = "cover";
        avatar.textContent = "";
      } else {
        avatar.textContent = (p.name || "J").charAt(0).toUpperCase();
      }
    }
    if (name) name.textContent = p.name || "";
    if (title) title.textContent = p.title || "";
    if (tagline) tagline.textContent = p.tagline || "";
    if (intro) intro.textContent = p.intro || "";

    if (dirs && cfg.directions) {
      dirs.innerHTML = cfg.directions
        .map(
          (d) =>
            `<div class="hero-direction-card" data-target="${d.id}">
              <span class="icon">${d.icon}</span>
              <span class="label">${d.name}</span>
            </div>`
        )
        .join("");

      // 点击方向卡片滚动到对应区域
      dirs.querySelectorAll(".hero-direction-card").forEach((card) => {
        card.addEventListener("click", () => {
          const target = card.getAttribute("data-target");
          const el = document.getElementById(target);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        });
      });
    }
  }

  /* ====== 方向区块渲染 ====== */
  function renderDirections() {
    const container = document.getElementById("directionsContainer");
    if (!container || !cfg.directions) return;

    const bgClasses = ["", "alt-bg", "dark-bg"]; // 交替背景

    container.innerHTML = cfg.directions
      .map((dir, idx) => {
        const bgClass = bgClasses[idx % 3];
        let content = "";

        // 区块头部
        content += `
          <section class="direction-section ${bgClass}" id="${dir.id}">
            <div class="container">
              <div class="section-header fade-up">
                <span class="section-label">${dir.icon} ${dir.name.toUpperCase()}</span>
                <h2 class="section-title">${dir.name}</h2>
                <p class="direction-intro">${dir.description || ""}</p>
              </div>
        `;

        // 根据类型渲染不同内容
        if (dir.id === "ai-agent" && dir.projects) {
          content += `<div class="projects-grid">`;
          dir.projects.forEach((proj) => {
            content += `
              <div class="project-card fade-up ${proj.featured ? "featured" : ""}" style="--card-color: ${dir.color}">
                <span class="project-status">${proj.status || ""}</span>
                <h3 class="project-name">${proj.name}</h3>
                <p class="project-desc">${proj.desc}</p>
                <div class="project-tags">
                  ${(proj.tags || [])
                    .map((t) => `<span class="project-tag">${t}</span>`)
                    .join("")}
                </div>
              </div>
            `;
          });
          content += `</div>`;
        } else if (dir.id === "illustration" && dir.works) {
          content += `<div class="gallery-grid">`;
          dir.works.forEach((work) => {
            content += `
              <div class="gallery-item fade-up" style="background: linear-gradient(135deg, ${dir.color}33, ${dir.color}11)">
                <span class="gallery-placeholder-icon">${dir.icon}</span>
                <div class="gallery-item-content">
                  <h4 class="gallery-item-title">${work.title}</h4>
                  <p class="gallery-item-desc">${work.desc}</p>
                </div>
              </div>
            `;
          });
          content += `</div>`;
        } else if (dir.id === "self-media") {
          if (dir.platforms) {
            content += `<div class="platforms-grid">`;
            dir.platforms.forEach((plat) => {
              const tag = plat.url ? "a" : "div";
              const attrs = plat.url ? `href="${plat.url}" target="_blank" rel="noopener"` : "";
              const subtitle = plat.account ? `<span class="platform-account">@${plat.account}</span>` : "";
              content += `
                <${tag} class="platform-card fade-up" ${attrs}>
                  <div class="platform-icon">${brandLogos[plat.icon] || plat.icon}</div>
                  <div class="platform-info">
                    <h4>${plat.name}</h4>
                    <span class="platform-type">${plat.type}</span>
                    ${subtitle}
                    <p class="platform-desc">${plat.desc}</p>
                  </div>
                </${tag}>
              `;
            });
            content += `</div>`;
          }
          if (dir.themes) {
            content += `
              <div class="themes-bar fade-up">
                ${dir.themes
                  .map((t) => `<span class="theme-tag">${t}</span>`)
                  .join("")}
              </div>
            `;
          }
        }

        content += `</div></section>`;
        return content;
      })
      .join("");
  }

  /* ====== 关于我渲染 ====== */
  function renderAbout() {
    // 时间线
    const timeline = document.getElementById("aboutTimeline");
    if (timeline && cfg.timeline) {
      timeline.innerHTML = cfg.timeline
        .map(
          (item) => `
          <div class="timeline-item fade-up">
            <div class="timeline-year">${item.year}</div>
            <div class="timeline-title">${item.title}</div>
            <div class="timeline-desc">${item.desc}</div>
          </div>
        `
        )
        .join("");
    }

    // 技能
    const skillsList = document.getElementById("skillsList");
    if (skillsList && cfg.skills) {
      skillsList.innerHTML = cfg.skills
        .map(
          (s) => `
          <div class="skill-item">
            <div class="skill-header">
              <span class="skill-name">${s.name}</span>
              <span class="skill-level">${s.level}%</span>
            </div>
            <div class="skill-bar">
              <div class="skill-fill" data-level="${s.level}"></div>
            </div>
          </div>
        `
        )
        .join("");
    }
  }

  /* ====== 联系方式渲染 ====== */
  function renderContact() {
    const contactText = document.getElementById("contactText");
    const socialGrid = document.getElementById("socialGrid");
    const c = cfg.contact || {};

    if (contactText) contactText.textContent = c.collaboration || "";

    if (socialGrid && c.socials) {
      socialGrid.innerHTML = c.socials
        .map(
          (s) =>
            `<a class="social-link" ${s.url ? `href="${s.url}" target="_blank" rel="noopener"` : ""}>
              <span class="icon">${brandLogos[s.icon] || s.icon}</span>
              <span>${s.name}</span>
            </a>`
        )
        .join("");
    }
  }

  /* ====== 导航交互 ====== */
  function initNav() {
    const navbar = document.getElementById("navbar");
    const navToggle = document.getElementById("navToggle");
    const navLinks = document.getElementById("navLinks");

    // 滚动变色
    window.addEventListener("scroll", () => {
      if (window.scrollY > 60) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
      updateActiveNav();
    });

    // 移动端菜单
    if (navToggle) {
      navToggle.addEventListener("click", () => {
        navToggle.classList.toggle("open");
        navLinks.classList.toggle("open");
      });
    }

    // 导航点击 - 平滑滚动
    document.querySelectorAll('[data-target]').forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = link.getAttribute("data-target");
        const el = document.getElementById(target);
        if (el) {
          const offset = 70;
          const top = el.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: "smooth" });
        }
        // 关闭移动菜单
        if (navToggle) navToggle.classList.remove("open");
        if (navLinks) navLinks.classList.remove("open");
      });
    });
  }

  /* ====== 滚动动画 ====== */
  function initScrollAnimations() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");

            // 技能条动画
            if (entry.target.classList.contains("skill-fill")) {
              const level = entry.target.getAttribute("data-level");
              entry.target.style.width = level + "%";
            }
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    // 观察所有 fade-up 元素
    document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));

    // 技能条单独观察
    document.querySelectorAll(".skill-fill").forEach((el) => observer.observe(el));
  }

  /* ====== IP 小助手 - 橙小鱼（视频动画版） ====== */
  function initIPCompanion() {
    const ipCfg = cfg.ipCompanion || {};
    const welcomeText = ipCfg.welcome || "你好呀！我是橙小鱼~ 欢迎来到 Janet 的创意世界！✨";
    const welcomeBtnText = ipCfg.welcomeBtn || "开始探索";
    const messages = ipCfg.messages || {};

    const overlay = document.getElementById("ipWelcomeOverlay");
    const welcomeTextEl = document.getElementById("ipWelcomeText");
    const welcomeBtn = document.getElementById("ipWelcomeBtn");
    const companion = document.getElementById("ipCompanion");
    const speechBubble = document.getElementById("ipSpeechBubble");
    const bubbleText = document.getElementById("ipBubbleText");
    const innerEl = document.getElementById("ipCompanionInner");
    const greetVideo = document.getElementById("ipGreetVideo");
    const leaveVideo = document.getElementById("ipLeaveVideo");
    const nodImg = document.getElementById("ipNodImg");

    if (!overlay || !companion || !greetVideo || !leaveVideo) return;

    // ---- 视频预加载 ----
    greetVideo.load();
    leaveVideo.load();

    // ---- 状态机 ----
    // hidden → greeting → visible → leaving → nodding → (greeting...)
    //                              ↑ manual ──────┘
    let state = "hidden";
    let pendingHide = false;
    let autoHideTimer = null;
    let mouseLeaveTimer = null;
    let isManuallyClicked = false;
    let mouseNearRight = false;
    let lastAutoPeekTime = 0;
    const AUTO_PEEK_COOLDOWN = 10000;
    const PEEK_DISTANCE = 400;
    const HIDE_DISTANCE = 500;
    const HIDE_DELAY = 3500;

    function canAutoPeek() {
      return Date.now() - lastAutoPeekTime > AUTO_PEEK_COOLDOWN;
    }

    function setActiveVideo(video) {
      greetVideo.classList.remove("active");
      leaveVideo.classList.remove("active");
      if (video) video.classList.add("active");
    }

    // 安全兜底：视频播放超时保护
    let leavePlayTimeout = null;
    let greetPlayTimeout = null;

    function playGreet() {
      if (state === "greeting") return;
      state = "greeting";
      pendingHide = false;
      // 重置内联位置，让 peek CSS 类接管
      companion.style.right = "";
      companion.classList.remove("leaving", "nod");
      setActiveVideo(greetVideo);
      greetVideo.currentTime = 0;
      const playPromise = greetVideo.play();
      if (playPromise) playPromise.catch(() => {});
      companion.classList.add("peek");
      // 兜底：若浏览器拦截自动播放，6秒后强制切到 visible
      clearTimeout(greetPlayTimeout);
      greetPlayTimeout = setTimeout(() => {
        if (state === "greeting") onGreetEnded();
      }, 6000);
    }

    function onGreetEnded() {
      if (state !== "greeting") return;
      clearTimeout(greetPlayTimeout);
      state = "visible";
      if (pendingHide) {
        pendingHide = false;
        playLeave();
      }
    }

    function playLeave() {
      if (state === "leaving" || state === "hidden" || state === "nodding") return;
      if (state === "greeting") {
        pendingHide = true;
        return;
      }
      state = "leaving";
      // 重置内联位置，让 leaving CSS 类接管（5s linear）
      companion.style.right = "";
      companion.classList.remove("peek", "nod");
      companion.classList.add("leaving");
      setActiveVideo(leaveVideo);
      leaveVideo.currentTime = 0;
      const playPromise = leaveVideo.play();
      if (playPromise) playPromise.catch(() => {});
      // 兜底超时：6.5秒后不管视频是否播完都切 nodding
      clearTimeout(leavePlayTimeout);
      leavePlayTimeout = setTimeout(() => {
        if (state === "leaving") onLeaveEnded();
      }, 6500);
    }

    function onLeaveEnded() {
      if (state !== "leaving") return;
      clearTimeout(leavePlayTimeout);
      state = "nodding";
      // 直接用内联样式钉住位置，绕过 CSS 过渡 → 100% 可靠
      companion.classList.remove("leaving", "peek");
      companion.style.right = "-130px";
      companion.classList.add("nod");
      speechBubble.classList.remove("visible");
      isManuallyClicked = false;
      pendingHide = false;
      mouseNearRight = false;
    }

    // 绑定视频结束事件
    greetVideo.addEventListener("ended", onGreetEnded);
    leaveVideo.addEventListener("ended", onLeaveEnded);

    function peek(text, stayMs) {
      lastAutoPeekTime = Date.now();
      clearTimeout(autoHideTimer);
      clearTimeout(mouseLeaveTimer);

      if (state === "hidden" || state === "leaving" || state === "nodding") {
        playGreet();
      }

      if (text) showBubble(text);

      const duration = stayMs || (text ? Math.min(text.length * 65 + 1800, 5500) : 4000);
      if (!isManuallyClicked) {
        autoHideTimer = setTimeout(() => hide(), duration);
      }
    }

    function hide() {
      if (state === "hidden" || state === "leaving" || state === "nodding") return;
      clearTimeout(autoHideTimer);
      clearTimeout(mouseLeaveTimer);
      speechBubble.classList.remove("visible");
      if (isManuallyClicked) isManuallyClicked = false;
      playLeave();
    }

    // --- 打字机效果 ---
    function typeWriter(el, text, speed = 55, onDone) {
      el.textContent = "";
      let i = 0;
      function tick() {
        if (i < text.length) {
          el.textContent += text.charAt(i);
          i++;
          setTimeout(tick, speed);
        } else if (onDone) {
          onDone();
        }
      }
      tick();
    }

    // --- 显示欢迎弹窗 ---
    function showWelcome() {
      overlay.classList.add("active");
      welcomeTextEl.textContent = "";
      welcomeBtn.style.display = "none";

      setTimeout(() => {
        typeWriter(welcomeTextEl, welcomeText, 50, () => {
          welcomeBtn.textContent = welcomeBtnText;
          welcomeBtn.style.display = "inline-block";
        });
      }, 400);
    }

    // --- 关闭欢迎弹窗，启动视频角色 ---
    function closeWelcome() {
      overlay.style.opacity = "0";
      overlay.style.pointerEvents = "none";
      setTimeout(() => {
        overlay.style.display = "none";
      }, 600);

      // 小助手登场：先显示容器（在边缘隐身），然后探头播放打招呼视频
      setTimeout(() => {
        companion.classList.add("visible");
        setTimeout(() => {
          peek(messages.hero || "嗨~ 我是橙小鱼！欢迎来到 Janet 的创意世界！🪄", 5500);
        }, 500);
      }, 400);
    }

    // --- 显示对话气泡 ---
    let bubbleTimeout = null;
    let bubbleHideTimeout = null;

    function showBubble(text) {
      if (!text) return;
      speechBubble.classList.remove("visible");
      clearTimeout(bubbleTimeout);
      clearTimeout(bubbleHideTimeout);

      bubbleTimeout = setTimeout(() => {
        bubbleText.textContent = text;
        speechBubble.classList.add("visible");
        bubbleHideTimeout = setTimeout(() => {
          speechBubble.classList.remove("visible");
        }, 6000);
      }, 250);
    }

    // --- 鼠标接近检测：靠近右边缘时探头播放打招呼视频 ---
    document.addEventListener("mousemove", (e) => {
      const W = window.innerWidth;
      const distFromRight = W - e.clientX;

      if (distFromRight < PEEK_DISTANCE) {
        if (!mouseNearRight) {
          mouseNearRight = true;
          clearTimeout(mouseLeaveTimer);
          clearTimeout(autoHideTimer);
          if (state === "hidden" || state === "leaving" || state === "nodding") {
            const greetings = ["呀！被发现啦~ 👀", "嗨！我在这里哦~ 🪄", "你找到我啦！✨"];
            const greet = greetings[Math.floor(Math.random() * greetings.length)];
            peek(greet, 4500);
          }
        }
      } else if (distFromRight > HIDE_DISTANCE) {
        if (mouseNearRight) {
          mouseNearRight = false;
          clearTimeout(mouseLeaveTimer);
          if (!isManuallyClicked) {
            mouseLeaveTimer = setTimeout(() => hide(), HIDE_DELAY);
          }
        }
      }
    });

    // --- 点击角色：手动切换对话（保持可见更久） ---
    if (innerEl) {
      let clickIndex = 0;
      const clickMessages = Object.values(messages).filter((m) => m);
      innerEl.addEventListener("click", (e) => {
        e.stopPropagation();
        isManuallyClicked = true;
        clearTimeout(autoHideTimer);
        clearTimeout(mouseLeaveTimer);
        if (state === "hidden" || state === "leaving") {
          playGreet();
        }
        if (clickMessages.length > 0) {
          showBubble(clickMessages[clickIndex % clickMessages.length]);
          clickIndex++;
        }
        autoHideTimer = setTimeout(() => {
          isManuallyClicked = false;
          hide();
        }, 8000);
      });
    }

    // --- 滚动监听：不同区块探头打招呼（有冷却） ---
    const sectionMap = [
      { id: "hero", msg: messages.hero },
      { id: "ai-agent", msg: messages["ai-agent"] },
      { id: "illustration", msg: messages.illustration },
      { id: "self-media", msg: messages["self-media"] },
      { id: "about", msg: messages.about },
      { id: "contact", msg: messages.contact },
    ];

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const secId = entry.target.getAttribute("id");
            const sec = sectionMap.find((s) => s.id === secId);
            if (sec && sec.msg && canAutoPeek() && !mouseNearRight) {
              peek(sec.msg);
            }
          }
        });
      },
      { threshold: 0.4, rootMargin: "-60px 0px -35% 0px" }
    );

    sectionMap.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) sectionObserver.observe(el);
    });

    // --- 绑定事件 ---
    if (welcomeBtn) {
      welcomeBtn.addEventListener("click", closeWelcome);
    }
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeWelcome();
    });

    // --- 启动：页面加载后 1.5 秒弹出欢迎 ---
    setTimeout(showWelcome, 1500);
  }

  /* ====== 当前激活导航 ====== */
  function updateActiveNav() {
    const sections = document.querySelectorAll("section[id]");
    const navItems = document.querySelectorAll(".nav-links a");
    let current = "";

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 100 && rect.bottom >= 100) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active");
      const target = item.getAttribute("data-target");
      if (target === current) {
        item.classList.add("active");
      }
    });
  }

  /* ====== 暗色模式 ====== */
  function initThemeToggle() {
    const toggle = document.getElementById("themeToggle");
    const icon = document.getElementById("themeIcon");
    const savedTheme = localStorage.getItem("janet-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.body.classList.add("dark-theme");
      if (icon) icon.textContent = "☀️";
    }

    if (toggle) {
      toggle.addEventListener("click", () => {
        const isDark = document.body.classList.toggle("dark-theme");
        localStorage.setItem("janet-theme", isDark ? "dark" : "light");
        if (icon) icon.textContent = isDark ? "☀️" : "🌙";
      });
    }
  }

  /* ====== 返回顶部 ====== */
  function initBackToTop() {
    const btn = document.getElementById("backToTop");
    if (!btn) return;

    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        btn.classList.add("visible");
      } else {
        btn.classList.remove("visible");
      }
    });

    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ====== 滚动进度条 ====== */
  function initScrollProgress() {
    const bar = document.getElementById("scrollProgress");
    if (!bar) return;

    window.addEventListener("scroll", () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = progress + "%";
    });
  }

  /* ====== 图片懒加载 ====== */
  function initLazyImages() {
    const images = document.querySelectorAll("img[data-src]");
    if (!images.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.getAttribute("data-src");
            if (src) {
              img.src = src;
              img.removeAttribute("data-src");
            }
            observer.unobserve(img);
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    images.forEach((img) => observer.observe(img));
  }

  /* ====== 移动端触摸优化 ====== */
  function initTouchOptimizations() {
    if (!("ontouchstart" in window)) return;

    // 禁用移动端双击缩放
    let lastTouchEnd = 0;
    document.addEventListener(
      "touchend",
      (e) => {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
          e.preventDefault();
        }
        lastTouchEnd = now;
      },
      { passive: false }
    );

    // 点击方向卡片滚动优化
    document.querySelectorAll(".hero-direction-card").forEach((card) => {
      card.addEventListener("touchend", (e) => {
        e.preventDefault();
        const target = card.getAttribute("data-target");
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      });
    });
  }

  /* ====== 初始化 ====== */
  renderNav();
  renderHero();
  renderDirections();
  renderAbout();
  renderContact();
  initNav();
  initScrollAnimations();
  initIPCompanion();
  initThemeToggle();
  initBackToTop();
  initScrollProgress();
  initLazyImages();
  initTouchOptimizations();
});
