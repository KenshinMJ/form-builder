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
