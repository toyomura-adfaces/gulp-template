## テンプレートの使いかた

FLOCSSを使ったテンプレートになります。

個人的に使うことの多い、slickやmodalのテンプレートファイルを入れています。
使わないようであれば削除してください。

imagesファイルにpcとspフォルダがあります。
pictureタグで画像を出し分ける際は、ファイル名は同名にしてフォルダの格納場所を分けるようにしてください。
共通で使う画像はimagesフォルダの直下に格納して構いません。

※mixinと変数の使いかたはbase.scssファイルの冒頭でコメントで説明してあります。

## Sass ディレクトリの構成

scss
├──style.scss
├── foundation
│ ├── _base.scss
│ └── _reset.scss
├── Global
│ ├── _mixin.scss
│ ├── _variable.scss
├── layout
| ├── _container.scss
│ ├── _footer.scss
│ ├── _header.scss
└── object
├── component
│ ├── _component.scss
├── project
│ ├── _project.scss
└── utility
  └── _none.scss

  このようになっています。

  各ファイルの前にアンダーバーがついている理由は、
  アンダーバーが無い状態でファイルを保存するとstyle.cssとstyle.css.mapが生成されてしまいます。
  読込用のパーツにはstyle.cssとstyle.css.mapは必要が無いので、各ファイルの前にアンダーバーを付けて自動生成されることを防いでいます。
  この時、style.scssで読み込む際はアンダーバーを省いても読み込んでくれます。

## 各ファイルの注意事項

foundationには土台とcssのファイルを格納しています。
_reset.scssはリセットCSSを、_base.scssにはreset.css以外に予め定義しておきたいものを記述します。(common.cssのようなイメージ)
どちらのファイルも自分の使いやすいように中身を変えていただいて構いません。

Globalの中は、変数や関数に関するファイルを格納しています。
ファイルの追加やファイル名の変更は適宜していただいて構いません。

layoutの中身はheaderやfooterや汎用するcontainer(幅)に関するファイルを格納しています。
プロジェクトに応じてsidebar等のファイルを追加していただいても構いません。

componentの中は、共通して使えるボタンや見出しなど、サイト内で使いまわせるものを定義してください。
ファイル名を適宜変更して使ってください。
btn.scssやtitle.scss等

projectの中は使いまわすことの無いものを定義してください。
基本的には、ページ毎にファイルを作成するイメージでかまいません。
ファイル名を適宜変更して使ってください。
top.scssやabout.scss等

utilityの中は、ページの一部分だけレイアウトを変更した場面で、
局所的に使うようなものを定義してください。
margin.scssやalign.scss等

デフォルトでnone.scssというファイルを入れています。
PC、タブレット、スマホで表示非表示ができるような定義を入れています。

