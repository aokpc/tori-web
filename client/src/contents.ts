export interface NoticeContent {
  /**
   * [Y, M, D]
   */
  date: [number, number, number];
  title: string;
  important?: boolean;
  content?: string;
}

export interface ActivityContent {
  title: string;
  content: string;
  /**
   * 画像ファイルのパス /client/public/image/activity/xxx のxxxの部分
   */
  image?: string;
}

// コンテンツ

/**
 * ヘッダーのサイトのリンク\
 * ./App.tsx[ルーティング]も忘れずに書き換える\
 * `/` で始まるURLは内部リンク[絶対パス]、`https://` で始まるURLは外部リンクとして扱われます\
 */
export const links = [
  { url: "/", name: "トップ" },
  { url: "/notice", name: "お知らせ" },
  { url: "/contact", name: "お問い合わせ" },
  { url: "/activity", name: "活動報告" },
  { url: "/design", name: "機体設計" },
  { url: "https://x.com/kaisei_birdman", name: "X" },
  { url: "https://www.instagram.com/kaisei_birdman/", name: "Instagram" },
];

/**
 * トップページのコンテンツ\
 * markdown形式で記述
 */
export const root_contents = `## 沿革
2024年12月6日 結成
2025年 3月30日 2025年度大会落選
4月20日 同好会として登記
5月30日 新歓開催
5月31日 東京理科大学にて鳥科様の全機組立を見学
6月23日 公式HP開設
## チームについて
### 我々の目標
私たちの最大の目標は、万全の状態でプラットホームに立ち、事故を起こさずに湖岸に帰ってくることです。何百メートル飛べる機体、美しく飛ぶ機体を作りたいという意気もありますが、それよりもパイロットの安全性を第一にしたいのです。
### その理由
過去高校生として鳥人間コンテストに出場した団体は多くなく、それも殆どが高専や工業高校の生徒です。100m以上の記録を残したチームとなるとかなり限られます。私たちが開成の名前を背負って鳥人間コンテストの48年に渡る歴史に新たな1ページを刻むことができれば幸いです。
### チーム名の由来
KITEという名は、Kaisei Innovative Technology Engineeringの略です。空気の力を受けて飛ぶ凧のように、美しい滑空機を作ることを目指します。
  `;

/**
 * 機体設計のコンテンツ\
 * markdown形式で記述\
 * リンクは`#x=1&y=1&s=10`のように、回転角度[度数法]とスケールを指定して、機体の3d設計図の視点を指定できます。
 */
export const design_contents = `
## 設計思想
私たちは今回が初めての参戦ということもあり、製造のしやすさやコストパフォーマンスを重視した設計を行いました。
## 主翼
コストを抑えるため、[リブ](#x=0.206&y=84.43&s=8.4)にはバルサ材を、[主桁](#x=0.206&y=84.43&s=8.4)には塩化ビニルパイプを使用する構成としましたが、結果として強度に課題があることが明らかになりました。
## 胴体
構造としては、[底部](#x=57.5&y=1.35&s=116)にポリカーボネート板、[上部](#x=16.82&y=132.5&s=61.83)にはバルサ材を用い、ボルトと接着剤で固定する方法を採用しました。理想としては丸みを帯びた流線型を目指していましたが、製作の容易さを優先し、角ばった形状としました。
## 安全対策
安全面では、[下部](#x=57.5&y=1.35&s=116)に足を出せるハッチ、上部には脱出用のハッチを設け、万が一の場合にも脱出しやすい構造を意識しました。
## 感想
最終的に、強度不足という課題は見つかりましたが、それによって改良すべき点が明確になったことは、大きな収穫だったと捉えています。今回の経験を踏まえ、来年以降さらに改善を重ねていきたいと考えています。
`;

/**
 * お知らせのコンテンツ
 * content[任意]はmarkdown形式で記述
 * dateは[年, 月, 日]の形式で指定
 */
export const notice: NoticeContent[] = [
  /*
    {
      date: [1234, 5, 6],
      title: "お知らせサンプルタイトル",
      content: "お知らせサンプルテキスト\nお知らせサンプルテキスト",
    },
    {
      date: [1234, 5, 6],
      title: "お知らせサンプルタイトルのみ"
    },
    {
      date: [789, 10, 11],
      important: true,
      title: "お知らせサンプルタイトル重要",
      content: "お知らせサンプルテキスト\nお知らせサンプルテキスト",
    },
  */
  {
    date: [2025, 6, 23],
    title: "公式HPを開設しました"
  },
];

/**
 * 活動報告のコンテンツ\
 * contentはmarkdown形式で記述\
 * imageは`/client/public/image/activity/xxx`のxxxの部分を指定\
 * 画像は任意で、指定しない場合は表示されません\
 * 画像は`/client/public/image/activity/`に配置してください
 */
export const activity: ActivityContent[] = [
  {
    title: "新歓を開催しました",
    content: "",
  },
  {
    title: "東京理科大学鳥科様の全機組み立てを見学しました",
    content: "東京理科大の葛飾キャンパスに赴き、全機組み立て及び部室を見学させていただきました。",
    image: "IMG_1.jpeg"
  },
];