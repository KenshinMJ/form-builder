# Architecture

## Technology Stack

- **Framework**: Next.js (App Router)
- **UI Library**: React-Bootstrap (Bootstrap 5)
- **Form Library**: React JSON Schema Form (RJSF)
- **Form Management**: Form.io Core
- **Backend as a Service**: AWS DynamoDB
- **Infrastructure as Code (IaC)**: Serverless Stack (SST)
- **Component Storybook**: Storybook
- **Styling**: Bootstrap 5
- **Language**: TypeScript

## Directory Structure

The project follows a feature-driven, domain-driven design approach, with a clear separation of concerns:

```
.
├── app/                      # Next.js App Router for routing (no direct logic)
│   ├── (dashboard)/
│   │   └── settings/
│   │       └── page.tsx
│   ├── management/
│   │   └── applicationTypes/
│   │       └── page.tsx
│   ├── api/                  # Server-side API logic
│   ├── layout.tsx
│   └── globals.css
|
├── components/
│   └── common/                # 自作の共通コンポーネント (Bootstrapコンポーネントのラッパーなど)
|
├── features/                 # 機能単位（ドメイン駆動っぽく分割）
│   ├── employee/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── api/               # クライアントからのAPI呼び出し
│   │   └── types.ts
│   └── inventory/
|
├── lib/                       # 汎用ユーティリティ・外部SDK初期化
│   ├── utils.ts               # ユーティリティ関数
│   ├── dynamodb.ts            # DynamoDB DocumentClientの初期化
│   └── application-repository.ts # DynamoDBアクセス層 (ApplicationType, ApplicationのCRUD)
|
├── forms/                     # Form.io関連の共通資産をここに集約
│   └── components/            # カスタムコンポーネント
|
├── hooks/                    # グローバルに使うカスタムフック
├── types/                    # グローバル型定義
│   └── application.ts        # ApplicationType, Applicationの型定義
├── .storybook/               # Storybook configuration
├── public/                   # 静的アセット
├── next.config.ts
├── tsconfig.json
└── sst.config.ts             # SSTの設定ファイル
```

## Key Architectural Principles

1.  **UI Library: React-Bootstrap**: Form.io が Bootstrap をベースとしているため、UI ライブラリも React-Bootstrap に統一し、デザインの一貫性と開発の効率化を図ります。既存の `shadcn/ui` 関連ファイルは削除または利用を停止します。

2.  **Form.io (`forms/`)**: Form.io関連の共通資産（カスタムコンポーネント）は `forms/` に集約します。

3.  **Storybook Co-location**: Storybookのstories (`.stories.tsx`) は、対応するコンポーネント (`.tsx`) の隣に配置し、デザインシステムとして機能させます。

4.  **Feature-driven `features/`**: `features/` ディレクトリはページ単位ではなくドメインで分割します。`app/` はルーティングに専念し、実際のUIロジックは `features/xxx` モジュール内に配置することで、ルーティング変更の影響を受けにくくします。

5.  **DynamoDBによるデータ永続化**: アプリケーションデータはAWS DynamoDBに保存されます。スケーラビリティと柔軟性を考慮し、プライマリキーとGlobal Secondary Index (GSI) を適切に設計することで、将来的な検索要件にも対応します。

6.  **SST (Serverless Stack) によるIaC**: インフラストラクチャの定義とデプロイにはSSTを使用します。これにより、Next.jsアプリケーションとAWSリソース（DynamoDBテーブル、Lambda関数など）の一元的な管理とデプロイが可能となり、開発効率と保守性が向上します。

## Development Guidelines

- **Code Consistency**: ESLintとPrettierの設定に従い、一貫性のあるコードスタイルを維持します。
- **Testing**: Vitestを用いた単体テストおよび結合テストを実施します。Storybookもコンポーネントのテストに活用します。
- **Environment Variables**: `.env.local` を使用してローカル開発環境の機密情報やAPIエンドポイントを管理し、本番環境では適切な環境変数を設定します。

## Deployment

このプロジェクトは、SSTとOpenNextを組み合わせてAWSにデプロイするように設計されています。`sst deploy` コマンドを使用することで、Next.jsアプリケーションがLambda関数としてデプロイされ、DynamoDBテーブルが自動的にプロビジョニングされます。
