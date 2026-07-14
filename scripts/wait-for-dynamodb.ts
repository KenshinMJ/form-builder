// scripts/wait-for-dynamodb.ts
const ENDPOINT = "http://localhost:8000";
const MAX_RETRIES = 50;
const INTERVAL_MS = 300;

async function waitForDynamoDB() {
  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      const res = await fetch(ENDPOINT);
      // dynamodb-localは未対応メソッドでも200/400系を返すのでレスポンスが返ればOK
      if (res) {
        console.log("dynamodb-local is ready.");
        return;
      }
    } catch {
      // 起動待ち中はfetchが失敗するので無視してリトライ
    }
    await new Promise((r) => setTimeout(r, INTERVAL_MS));
  }
  throw new Error("dynamodb-local did not become ready in time.");
}

waitForDynamoDB().catch((err) => {
  console.error(err);
  process.exit(1);
});
