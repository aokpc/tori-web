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
  date: [number, number, number];
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
    title: "東京理科大学鳥科様の全機組み立てを見学しました",
    content: "東京理科大の葛飾キャンパスに赴き、全機組み立て及び部室を見学させていただきました。",
    image: "IMG_1.jpeg",
    date: [2025, 5, 31],
  },
  {
    title:"都立産技高専ЯTR様の作業場を見学しました",
    content: "ЯTR様の作業場を見学させて頂きました。フレームや桁の接合など構造面と空力設計に関しても大変詳しくご教授いただきました。",
    image: "IMG_2.jpeg",
    date: [2025, 6, 27],
  }
];