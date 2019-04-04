# YTM Exporter

Yahoo! タグマネージャーからデータをエクスポートするための[ユーザースクリプト]です

更新や移管の際に発生するタグの突き合わせ作業や、エクセルにエビデンスを作成する際の入力先ベースとして役立ちます

[ユーザースクリプト]: https://www.google.co.jp/search?q=%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%97%E3%83%88

## 機能

- サービスタグをエクスポート

## インストール

1. Chrome に [Tampermonkey] をインストール
2. [YTM Exporter] をクリックしてインストール

[Tampermonkey]: https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo
[YTM Exporter]: https://github.com/matzkoh/userscripts/raw/master/packages/ytm-exporter/dist/index.user.js

## 使用方法

### サービスタグ一覧をエクセル CSV 形式でダウンロード

1. サービスタグ管理の画面を開く
2. エクスポートするタグにチェックをつけて選択する
3. 拡張のアイコンをクリックする
4. YTM Exporter の下にある `タグをエクスポート` をクリックする
5. 進捗バーが 100% になると CSV ファイルに保存されます

![](screenshots/menu.png)

#### エクスポートされるエクセルについて

| 列名       | 例                                             | 説明                                                         |
| ---------- | ---------------------------------------------- | ------------------------------------------------------------ |
| id         | 7029086                                        | タグ毎に一意な数値                                           |
| status     | ACTIVE                                         | タグのステータス (英語)                                      |
| name       | 媒体 CV タグ                                   | サービスタグ名                                               |
| vendorName | Yahoo! JAPAN                                   | サービス提供元                                               |
| createdAt  | 2019-01-25T00:40:59.000-06:00                  | 作成日                                                       |
| modifiedAt | 2019-03-06T19:51:42.000-06:00                  | 最終更新日                                                   |
| tag        | `<script> ... </script>`                       | スマートカスタムタグの設定内容<br>(カタログタグの場合は空欄) |
| catalog    | `{"label":"***","amount":"0","spaceId":"***"}` | カタログタグの設定内容<br>(スマートカスタムタグの場合は空欄) |
