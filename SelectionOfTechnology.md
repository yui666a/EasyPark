最近は create-react-app の使用が非推奨になっている。
代わりに

* Next.js
* Remix
* Gatsby
* Expo

が一般的に推奨されている。
しかし、学習コストとインターンの時間的なメリデメから、create-react-app を使う。


### create-react-app のインストール

node のバージョンが v18以上 であることを確認する。
* v16 のサポートがもう直ぐ終了するため（https://forest.watch.impress.co.jp/docs/news/1417053.html）

```zsh
$ node -v
v18.12.1
```

`npx create-react-app {アプリ名} --template typescript` で TypeScript を使ったプロジェクトを作成する。

```zsh
$ npx create-react-app easy-park --template typescript
```

dependencies を devDependencies と2つに分ける。

```zsh
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "@types/node": "^16.18.39",
    "@types/react": "^18.2.19",
    "@types/react-dom": "^18.2.7",
    "@types/jest": "^27.5.2",
    "typescript": "^4.9.5"
  },
```

node_modules と package-lock.json を削除して、再インストールする

```zsh
$ rm -rf node_modules package-lock.json
$ npm install
```

MUI (material-ui) をインストールする

```zsh
$ npm install @mui/material @emotion/react @emotion/styled
```

date-fns をインストールする

```zsh
$ npm install date-fns
```

起動してみる  
http://localhost:3000/ にアクセスできたら成功

```zsh
$ cd easy-park
$ npm start
```

eslint, prettier をインストールする
https://qiita.com/shuuhei/items/64bc53312603b32e4a3b#eslint%E3%81%AE%E8%A8%AD%E5%AE%9A
```zsh
$ npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```



/src/App.tsx を編集してみる。  
`Learn React` を `Learn React with TypeScript` に変更してみよう
変更したら ファイルをセーブして、ブラウザを確認してみよう。


### 想定される使用環境

* スマホ
  * iOS
  * Android
* ブラウザ
  * Chrome
  * Safari
* Chrome の開発者ツールを使って、スマホの画面サイズにして確認する

### プロジェクトの構成

### 難易度

1. 低
   1. ブラウザを開きっぱなしにして、駐車場の料金を確認できる
2. 中
   1. ブラウザを閉じて、再度開いても駐車場の料金を確認できる
3. 高
   1. 使いやすさを考慮して、追加の機能を実装できる