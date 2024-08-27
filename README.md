# digital-human-app

配信内でChatGPTが生成した画像を表示するためのWebサイト

コードのコメントは一部Copilotの生成を使用

開発環境
|MacOS|14.3.1|
|:--:|:--:|
|Node.js|v20.12.2|
|npm|10.5.0|

動作確認済み環境
|Windows|11Home|
|:--:|:--:|
|Node.js|v20.16.0|
|npm|10.8.1|


--

|日時|行ったこと|
|:--------:|:--------:|
|2024/08/09|Reactプロジェクトを作成|
|          |1枚の画像を表示するサイト作成(プロジェクト外のAPI使用)|


# 環境構築

## Windowsでの環境構築方法

最初に環境構築を行うときは1〜4すべてを行ってください。

環境構築を1度行うと、次に起動するときは1〜3を実行する必要はありません。4から実行してください。

### 1. Node.jsのインストール

今回はwingetを使用してインストールします。
PowerShellを開いて以下のコマンドを実行してください。
```Bash
$ winget search node.js
```

wingetを初めて使う際は使用にあたって同意を求められるので同意しといてください。

コマンドを打つと以下のように表示されると思います。
```
名前               ID                バージョン 一致         ソース
--------------------------------------------------------------------
Node.js Dev Reader 9WZDNCRDRNGS      Unknown                 msstore
Node.js            OpenJS.NodeJS     22.6.0                  winget
Nodist             Nodist.Nodist     0.10.3     Tag: node.js winget
Volta              Volta.Volta       1.1.1      Tag: node.js winget
Node.js (LTS)      OpenJS.NodeJS.LTS 20.16.0                 winget
```

今回はNode.js(LTS)を使用するので、Node.js(LTS)のID部分(上記の場合`OpenJS.NodeJS.LTS`)をコピーしてください。

このIDを使用してインストールします。

(万が一IDが変わってしまっている場合、違うパッケージをインストールしてしまうため、自分の環境で確認していただくためにこの過程を書いています。IDが同じであればそんなに気にする必要もないのですが、万が一のため…です。)


以下のコマンドにIDをペーストして実行、Node.jsをインストールしてください。

```Bash
$ winget install -e --id <インストールするパッケージのID>

# 例
# $ winget install -e --id OpenJS.NodeJS.LTS
```

このコマンドを実行するとNode.jsのインストールが始まります。途中で`.msi`ファイルの変更を許可するかどうかの警告が出ると思うので、`はい`を押して許可してください。

インストールが終わると、アプリケーションにNode.jsが追加されていると思います。

~~Node.jsがインストールされているかの確認をするために、`スタート`→`すべてのアプリ`→`Node.jsフォルダ`→`Node.js command prompt`を開いてください。
すると、Node.jsのコマンドプロンプトが表示されると思います。~~

~~このコマンドプロンプトで以下のコマンドを順に実行してください。コメントアウトしている数字(もしくは似たような数字)が出てきたらインストール成功です。~~

たぶん新しいPowerShell開いたら管理者権限のない普通のPowerShellでも以下のコマンドをそれぞれ実行することで数字が出ると思います。以下のコメントアウト部分のように数字が出たらインストール成功です。
```Bash
$ node -v
# v20.16.0
$ npm -v
# 10.8.1
```

Node.jsのバージョンが開発環境と少し違いますが、v20系である点は同じなのでたぶん動くと思います。
(他のバージョン、例えばv22系は動作確認していないので、動くかわからないです。)


### 2. リポジトリのクローン

まずこのリポジトリをクローンしてください。(ここは詳細を割愛します)

本来ならクローンするだけでいいのですが、今はまだ開発中のため、mainブランチが最新の状態ではありません。

しかし、クローンは基本的にmainブランチのみ行うため、最新の状態をローカルで検証するためには開発中のブランチ情報もGitHubから引っ張ってくる必要があります。

この作業を今からやっていきます。

現在はdevelopブランチで開発をしているので、developブランチが最新の状態になるようにしています。
そのため、developブランチをローカルにダウンロードします。

まず、ターミナル上で`digital-human-app`ディレクトリに移ってください。

その後、以下のコマンドを実行してください。
```Bash
$ git clone -b develop https://github.com/satsuki2200/digital-human-app.git
```
ここでもしエラーが出たら内容に応じて対応していただきたいのですが、わからなければ私まで連絡ください。

出る可能性のあるエラーとして思いつくのは、httpsでのクローンがダメだからsshで実行するよう促す内容です。これが出た場合はお手数ですがssh設定をするか、GitHubDesktopからブランチをクローンしてください。わからなければ私に聞いてください。

エラー等でなければ、以下のコマンドを実行してください。
```Bash
$ git checkout develop
```
このコマンドでdevelopブランチに切り替えを行うので、これが成功すれば、developブランチのクローンも成功しています。

念の為developブランチに切り替えができているか以下のコマンドでも確認しておきます。今いるブランチの横にアスタリスク(*)がつきます。
コメントアウトのように、developの横にアスタリスクがあれば、developブランチにいます。
```Bash
$ git branch

# * develop
#   main
```


### 3. 必要なパッケージをインストールする

実はNode.jsをインストールした段階でnpmもインストールされているのですが、まだ何もない空っぽの状態です。

そのため、ローカルでwebサイトを動かすためには、必要なパッケージをインストールする必要があります。

インストールには以下のコマンドを実行することで必要なパッケージを自動でインストールできます。
以下のコマンドをターミナル上で実行してください。
```Bash
$ npm install
```

おそらく以下のような内容が出てくると思います。もし足りないパッケージ等あればインストールできていない可能性があるので、もう一度先ほどのコマンドを実行してください。
```
digital-human-app@0.0.0 C:\Users\nyast\Downloads\digital-human-app
+-- @eslint/js@9.8.0
+-- @types/react-dom@18.3.0
+-- @types/react@18.3.3
+-- @vitejs/plugin-react@4.3.1
+-- eslint-plugin-react-hooks@5.1.0-rc-fb9a90fa48-20240614
+-- eslint-plugin-react-refresh@0.4.9
+-- eslint-plugin-react@7.35.0
+-- eslint@9.8.0
+-- globals@15.9.0
+-- react-dom@18.3.1
+-- react@18.3.1
`-- vite@5.4.0
```


先ほどのコマンドでインストールが成功しているのですが、念の為以下のコマンドも実行してください。
```
$ npm ls
```

すると、先ほどインストールした時に出てきた内容と同じ内容が出てくると思います。足りないパッケージなどがなければ、インストールは成功です。


これで、必要なパッケージのインストールと環境構築は終わりです。
さっそく起動しましょう！

### 4. ローカルでWebサイトを立ち上げる
ターミナルで`digital-human-app`ディレクトリにいることを確認してください。

確認できたら、以下のコマンドを実行してください。
```Bash
$ npm run dev
```

コマンドを実行すると、ターミナルが以下のような表示になると思います。この表示が出たら、ブラウザでhttp://localhost:5173 にアクセスしましょう。
```Shell
  VITE v5.4.0  ready in 442 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help

```

以下のような画面が表示されると成功です！(画像は8/9時点のサイトです。)
<img width="1343" alt="スクリーンショット 2024-08-10 0 22 36" src="https://github.com/user-attachments/assets/f44854c4-4b93-4dd2-a933-e1a35920b017">


`npm run dev`を実行しているターミナルを閉じるまではhttp://localhost:5173 を開くことで起動できますが、ターミナルを終了すると開くことはできません。

ターミナル終了後、再度開く時は`npm run dev`を実行することで開くことができます。


# テスト配信時に行うこと

- 画像取得APIを配信用のURLに変更する

まず、`digital-human-app/src/App.jsx`をVSCodeなどのエディタで開いてください。

すると、`https://dog.ceo/api/breeds/image/random`と書かれた行があると思います。
その行をコメントアウト(JavaScriptはスラッシュ2つで行コメントができます)してください。

次に、先ほどコメントアウトした行の1つ下の行がコメントアウトされていると思うので、このコメントアウトを外してください。

これで変更完了です。
なお、この作業は`npm run dev`を実行中に行っても問題ないです。



---

とりま作成時のテンプレ残す↓(役立つかは知らん)

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
