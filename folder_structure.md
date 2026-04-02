# 📁 Folder Structure – Interactive Story Portfolio (Next.js 15+)

Cấu trúc này được thiết kế cho một **Interactive Story Portfolio** — không phải website truyền thống, mà là một **application dạng experience** với **scene-based navigation**.

Áp dụng cho:

* Next.js 15+ (App Router)
* TypeScript (strict mode)
* Tailwind CSS
* Zustand (state management)
* Framer Motion (animation)

---

# 🧠 Core Philosophy

> ❗ Đây KHÔNG phải multi-page website
> ❗ Đây là một **interactive application (SPA-like)**

* Không có nhiều route như `/projects`, `/blog`
* Thay vào đó:

  * **Scene = đơn vị UI chính**
  * **State = điều hướng**
  * **Navigation = phi tuyến tính (non-linear)**

---

# 🗂️ Folder Structure

```
portfolio/
├── app/
│   ├── layout.tsx              # Root layout (fonts, providers, global UI)
│   ├── page.tsx                # Entry point → render <Experience />
│   ├── globals.css
│   ├── not-found.tsx
│   ├── error.tsx
│   └── loading.tsx

├── features/
│   ├── story/
│   │   ├── story.store.ts      # Zustand store (currentScene, transitions)
│   │   ├── story.types.ts      # Scene types
│   │   └── story.config.ts     # Scene definitions + flow
│   │
│   └── navigation/
│       ├── navigation.store.ts # Graph/map state (optional)
│       └── navigation.types.ts

├── scenes/
│   ├── intro/
│   │   └── IntroScene.tsx
│   ├── map/
│   │   └── StoryMapScene.tsx
│   ├── beginning/
│   ├── struggles/
│   ├── breakthrough/
│   ├── systems/
│   ├── projects/
│   ├── playground/
│   ├── proof/
│   └── vision/

├── components/
│   ├── ui/                    # Atomic UI (button, card...) – shadcn/ui
│   ├── scene/
│   │   ├── SceneContainer.tsx # Layout wrapper cho scene
│   │   └── SceneTransition.tsx# Animation wrapper (Framer Motion)
│   │
│   └── navigation/
│       ├── Node.tsx           # Node trong story map
│       ├── Edge.tsx           # Connection line
│       └── Graph.tsx          # Map layout

├── lib/
│   ├── animation.ts           # Shared animation configs
│   ├── utils.ts               # cn(), helpers
│   └── constants.ts           # Scene keys, config

├── types/
│   └── global.ts              # Global shared types

├── public/
│   ├── images/
│   └── icons/

├── styles/
│   └── typography.css

├── tests/                     # (optional)
├── .env.example
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── biome.json
└── package.json
```

---

# 🎬 Architecture Overview

## 1. Entry Flow

```
app/page.tsx
   ↓
<Experience />
   ↓
Render Scene dựa trên state
```

---

## 2. Scene Engine

* Scene được điều khiển bởi Zustand:

```ts
const currentScene = useStoryStore(state => state.currentScene)
```

* Render tương ứng:

```ts
switch (currentScene) {
  case "intro":
    return <IntroScene />
  case "map":
    return <StoryMapScene />
  case "projects":
    return <ProjectsScene />
}
```

---

## 3. Navigation Model

* Không dùng route (`/projects`)
* Thay bằng:

```ts
setScene("projects")
```

* Scene chuyển đổi bằng animation (Framer Motion)

---

# 🧩 Scene System

Mỗi scene:

* Là một module độc lập
* Có UI + animation riêng
* Có thể reusable hoặc extend

---

## 🎯 Danh sách Scene

| Scene        | Mục đích                     |
| ------------ | ---------------------------- |
| intro        | Hook + identity              |
| map          | Navigation chính             |
| beginning    | Context ban đầu              |
| struggles    | Pain / failure               |
| breakthrough | Turning point                |
| systems      | System thinking (QUAN TRỌNG) |
| projects     | Case study                   |
| playground   | Interactive demo             |
| proof        | Credibility                  |
| vision       | Closing                      |

---

# ⚙️ State Management (Zustand)

## story.store.ts

Quản lý:

* currentScene
* history (optional)
* transition state

---

## Ví dụ:

```ts
type Scene = "intro" | "map" | "projects"

type StoryState = {
  currentScene: Scene
  setScene: (scene: Scene) => void
}
```

---

# 🎨 Animation System

* Dùng Framer Motion
* Centralize animation trong:

```
lib/animation.ts
```

---

## SceneTransition.tsx

* Wrap tất cả scene
* Handle:

  * enter / exit
  * fade / slide / zoom

---

# 🧠 Best Practices

## 1. Server Components First

* Chỉ dùng `'use client'` khi:

  * animation
  * event handling
  * Zustand

---

## 2. Tách rõ responsibility

* `scenes/` → UI logic cấp cao
* `components/` → reusable UI
* `features/` → business logic + state

---

## 3. Không over-engineer routing

❌ Không tạo:

* `/projects`
* `/about`

✅ Tất cả nằm trong:

* Scene system

---

## 4. Performance

* Lazy load scene nếu cần
* Dynamic import với animation-heavy components

---

## 5. Maintainability

* Mỗi scene độc lập → dễ mở rộng
* Có thể thêm scene mới mà không ảnh hưởng hệ thống

---

# 🚀 Deployment

* Vercel (recommended)
* Hoặc Docker + CI/CD

---

# 💡 Summary

> ❗ Đây không phải portfolio thông thường
> ❗ Đây là một **interactive product**

* Scene-driven
* State-driven navigation
* Experience-first design

---

# 🔥 Future Extensions

* Keyboard navigation (← →)
* Analytics tracking theo scene
* AI-powered playground
* Multi-language support

