// コンテンツ


// ./App.cssも忘れずに
export const links = [
  { url: "/", name: "トップ" },
  { url: "/notice", name: "お知らせ" },
  { url: "/member", name: "メンバー" },
  { url: "/activity", name: "活動報告" },
  { url: "/design", name: "機体設計" },
  { url: "https://x.com/kaisei_birdman", name: "X" },
  {
    url: "https://www.instagram.com/kaisei_birdman/",
    name: "Instagram",
  },
];

export const root_contents = `# 開成鳥人間の会公式HPへようこそ。
## 沿革
サンプルテキスト
- 2024年12月6日 結成
## チームについて
サンプルテキスト
### 我々の目標
サンプルテキスト
### その理由
サンプルテキスト
### チーム名の由来
サンプルテキスト
  `;

export const design_contents = `
## 設計の大まかな方針
サンプルテキスト
## 主翼/桁
サンプルテキスト
## 胴体
サンプルテキスト
## 安全対策
サンプルテキスト
## 自慢ポイント
サンプルテキスト
[ここ](#x=270&y=90&s=20)
`;

export interface NoticeContent {
  /**
   * [Y, M, D]
   */
  date: [number, number, number];
  title: string;
  important?: boolean;
  content?: string;
}

export const notice: NoticeContent[] = [
  {
    date: [1234, 5, 6],
    title: "お知らせサンプルタイトル",
    content: "お知らせサンプルテキスト\nお知らせサンプルテキスト",
  },
  {
    date: [789, 10, 11],
    important: true,
    title: "お知らせサンプルタイトル重要",
    content: "お知らせサンプルテキスト\nお知らせサンプルテキスト",
  },
];
