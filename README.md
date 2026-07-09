This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# ディレクトリ構成

Next.js（App Router前提）+ shadcn/ui + Storybook + RJSFの構成であれば、以下のような形がおすすめです。

## 全体構成

```
.
├── src/
│   ├── app/                      # App Router（ルーティング専用、ロジックは持たせない）
│   │   ├── (marketing)/
│   │   ├── (dashboard)/
│   │   │   └── settings/
│   │   │       └── page.tsx
│   │   ├── api/                  # サーバのAPIロジック
│   │   ├── layout.tsx
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── ui/                   # shadcn/uiの生成物（自動生成・基本触らない）
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   └── ...
│   │   └── common/                # 自作の共通コンポーネント（uiをラップしたもの等）
│   │       ├── PageHeader.tsx
│   │       └── PageHeader.stories.tsx
│   │
│   ├── features/                 # 機能単位（ドメイン駆動っぽく分割）
│   │   ├── user-profile/
│   │   │   ├── components/
│   │   │   │   ├── ProfileForm.tsx
│   │   │   │   └── ProfileForm.stories.tsx
│   │   │   ├── hooks/
│   │   │   ├── schemas/           # RJSFのJSON Schema定義
│   │   │   │   └── profileSchema.ts
│   │   │   ├── api/               # クライアントからのAPI呼び出し
│   │   │   └── types.ts
│   │   └── inventory/
│   │       └── ...
│   │
│   ├── lib/                      # 汎用ユーティリティ・外部SDK初期化
│   │   ├── utils.ts               # shadcn/uiのcn()等
│   │   └── api-client.ts
│   │
│   ├── forms/                    # RJSF関連の共通資産をここに集約
│   │   ├── widgets/                # カスタムWidget
│   │   ├── templates/              # カスタムTemplate（FieldTemplate等）
│   │   ├── theme.ts                 # shadcn/ui向けのRJSFテーマ（withTheme用）
│   │   └── theme.stories.tsx
│   │
│   ├── hooks/                    # グローバルに使うカスタムフック
│   ├── types/                    # グローバル型定義
│   └── styles/                   # Tailwind設定補助等
│
├── .storybook/
│   ├── main.ts
│   └── preview.ts
│
├── public/
├── components.json               # shadcn/ui設定
├── tailwind.config.ts
├── next.config.ts
└── tsconfig.json
```

## ポイント

**1. `components/ui` は聖域にする**
shadcn/uiはコピー&ペースト方式なので、`npx shadcn add button` などで生成されたファイルは直接編集せず、拡張したい場合は `components/common` にラップコンポーネントを作る方が、後々のアップデート（差分適用）で困りにくいです。

**2. RJSFは `forms/` に集約**
RJSFはWidget/Template/Themeのカスタマイズが肝になるので、shadcn/ui用のテーマ（`withTheme(shadcnTheme)`のようなもの）を一箇所にまとめておくと、各featureのフォームから使い回せます。スキーマ自体（JSON Schema定義）は各featureに置くのがおすすめです。

```
forms/
├── widgets/
│   ├── TextWidget.tsx      # shadcn/uiのInputを使うWidget
│   ├── SelectWidget.tsx
│   └── CheckboxWidget.tsx
├── templates/
│   ├── FieldTemplate.tsx
│   ├── ObjectFieldTemplate.tsx
│   └── ArrayFieldTemplate.tsx
└── theme.ts
```

**3. Storybookはコンポーネントに隣接配置**
`Component.tsx` の横に `Component.stories.tsx` を置く形が、featureベースの構成と相性が良いです。`components/ui` 配下のshadcn生成物にもstoriesを追加すると、デザインシステムのカタログとして機能します。

**4. `features/` はドメインで切る（ページ単位ではなく）**
`app/` はあくまでルーティングの入り口とし、実際のUIロジックは `features/xxx` に置いて `page.tsx` から呼び出す形にすると、ルーティング変更の影響を受けにくくなります。

---

もし現在すでにプロジェクトの雛形がある、あるいはApp RouterではなくPages Routerを使う予定であれば教えてください。その前提に合わせて調整します。