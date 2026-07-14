Form.ioによるフォームビルダー等を検証する Next プロジェクト。

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## アプリの動作方法

run the development server:

```bash
bun dev:local
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

### DBの確認

http://localhost:8001 で確認可能

## Deploy

このプロジェクトは、Serverless Stack (SST) と OpenNext を組み合わせてAWSにデプロイするように設計されています。`sst deploy` コマンドを使用することで、Next.jsアプリケーションがLambda関数としてデプロイされ、DynamoDBテーブルが自動的にプロビジョニングされます。

## ディレクトリ構成

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
│   │   ├── dynamodb.ts            # DynamoDB DocumentClientの初期化
│   │   └── application-repository.ts # DynamoDBアクセス層 (ApplicationType, ApplicationのCRUD)
│   │
│   ├── forms/                    # RJSF関連の共通資産をここに集約
│   │   ├── widgets/                # カスタムWidget
│   │   ├── templates/              # カスタムTemplate（FieldTemplate等）
│   │   └── theme.ts                 # shadcn/ui向けのRJSFテーマ（withTheme用）
│   │
│   ├── hooks/                    # グローバルに使うカスタムフック
│   ├── types/                    # グローバル型定義
│   │   └── application.ts         # ApplicationType, Applicationの型定義
│   ├── styles/                   # Tailwind設定補助等
│   ├── .storybook/
│   │   ├── main.ts
│   │   └── preview.ts
│   │
│   ├── public/
│   ├── components.json               # shadcn/ui設定
│   ├── tailwind.config.ts
│   ├── next.config.ts
│   ├── tsconfig.json
│   ├── sst.config.ts             # SSTの設定ファイル
│   └── serverless.yml            # (旧) Serverless Framework設定ファイル (現在はSSTに移行)
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
