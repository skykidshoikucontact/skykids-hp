# SKY KIDS - 託児所サイト

Next.js 15 + TypeScript で構築した託児所のホームページと管理画面です。

## 機能

### 公開サイト
- トップページ（ヒーロー、園紹介、お知らせ、スタッフ紹介など）
- お知らせ一覧ページ
- スタッフ紹介ページ

### 管理画面
- ログイン認証（ユーザー名 + パスワード）
- お知らせの CRUD（作成・読取・更新・削除）
- スタッフ情報の CRUD + 写真アップロード
- GitHub Contents API を使ったデータ永続化

## 技術スタック

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- bcryptjs（パスワードハッシュ）
- jsonwebtoken（JWT認証）
- GitHub Contents API（データ永続化）

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.example` を `.env.local` にコピーして編集：

```bash
cp .env.example .env.local
```

### 3. パスワードハッシュの生成

```bash
node scripts/generate-hash.js your-admin-password
```

生成されたハッシュを `.env.local` の `ADMIN_PASS_HASH` に設定します。

### 4. GitHub Personal Access Token の取得

GitHub で Personal Access Token（repo 権限）を作成し、`.env.local` に設定します。

### 5. 開発サーバーの起動

```bash
npm run dev
```

http://localhost:3000 でサイトを確認できます。

## 環境変数

| 変数名 | 説明 |
|--------|------|
| `ADMIN_USER` | 管理者ユーザー名 |
| `ADMIN_PASS_HASH` | bcrypt でハッシュ化されたパスワード |
| `SESSION_SECRET` | JWT 署名用のシークレットキー |
| `GITHUB_TOKEN` | GitHub Personal Access Token（repo 権限） |
| `GITHUB_OWNER` | GitHub ユーザー名またはオーガニゼーション名 |
| `GITHUB_REPO` | リポジトリ名 |
| `GITHUB_BRANCH` | ブランチ名（デフォルト: main） |
| `USE_GITHUB_RAW` | GitHub Raw URL 経由でデータを取得するかどうか |

## ディレクトリ構成

```
src/
├── app/
│   ├── admin/           # 管理画面
│   │   ├── login/       # ログインページ
│   │   ├── news/        # お知らせ管理
│   │   └── staff/       # スタッフ管理
│   ├── api/             # API ルート
│   │   ├── login/       # ログイン API
│   │   ├── logout/      # ログアウト API
│   │   ├── news/        # お知らせ CRUD API
│   │   └── staff/       # スタッフ CRUD API
│   ├── news/            # お知らせ一覧（公開）
│   ├── staff/           # スタッフ紹介（公開）
│   └── page.tsx         # トップページ
├── components/          # コンポーネント
├── data/                # JSON データファイル
├── lib/                 # ユーティリティ
└── types/               # TypeScript 型定義
```

## Vercel へのデプロイ

1. Vercel にリポジトリを接続
2. 環境変数を設定
3. デプロイ

GitHub Contents API での更新が反映されるには、Vercel の On-Demand Revalidation か ISR を設定する必要があります。

## ライセンス

Private
