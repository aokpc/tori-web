# ks-tori-web
TypeScript, React, Vite, three.js

## 説明

### 本文編集について
[`./client/src/contents.ts`](./client/src/contents.ts)を編集してください。注意事項も書いてあります

### キャッシュについて
このサイトの`index.html`以外のもの全ては[worker](./client/public/worker.js)によりキャッシュされます。
これによる表示の不具合を避けるため、`client/public`内の画像などを置き換える場合は、元のファイルとは別の名前を使用するか(例:`~.v2.png`->`~.v3.png`)、`worker.js`内の`CACHE_NAME`を更新してください。

### ディレクトリ構造
viteのドキュメントも参考にしてください

- .github/workflows
  push時に自動でビルド(deno task build)して結果を`gh-pages`ブランチにコミットしてページを更新します

- dev-server
  denoでサーバーを建てるときに使い、昔deno deployでホストしていた時にも使っていました

- client
  - dist
    viteによってビルドされたものが入ります。
  - public
    webサイトに中身がそのまま公開されます。画像`/image`、3dデータ`/3d`、`worker.js`など
  - src
    reactやら何やらがあります。
    - path
      ルーティングする時に回すやつを入れます。ファイル名=パス名が好ましいです

### deno task
- `deno task dev`
  viteの開発サーバーを建てる
- `deno task build`
  ビルドしてdistに突っ込む
- `deno task serve`
  dev-serverで起動する。LAN内で公開する時とか

### gh-pages
  基本的にgithubにpushすれば勝手にビルドして公開されます。