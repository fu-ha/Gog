# Gogとは
![トップページ]（geem84.com_top.png）
# インフラ構成図
![インフラ構成図](./infra.drawio.png)

# ER図
![ER図](./er.drawio.png)

# 使用技術
* バックエンド  
  * Ruby 2.7.2
  * Ruby on Rails 6.0.3 （APIモード）
  * RSpec（テスト）
  * MySQL(DB)
* フロントエンド 
  * Next.js 12.1.6 （CSR）
  * TypeScript 
  * TailwindCSS
  * Jest（テスト）
* インフラ・開発環境  
  * Docker/Docker-compose
  * AWS（ECR,ECS,ALB,VPC,S3,Route53,RDS,ACM,SSM）
  * Terraform（インフラのコード管理）
  * CircleCI（CI/CD）

# 機能一覧
* 新規登録・ログイン/ゲストログイン
* プロフィール編集機能（プロフィール画像）
* 投稿機能（作成・削除）
  * タグ選択可
  * 指定したタグがある投稿のみ表示可
* コメント機能（作成・削除）
* いいね機能（作成・削除）
  * 投稿とコメントに対してのいいねがある
* ユーザー検索機能
  * ユーザーのプロフィールページへ遷移可
* フォロー機能（作成・削除）
  * ユーザーがフォローしたらDM用のルームを作成
* DM機能（作成・削除）
  * 作成されたルーム内でメッセージのやり取り可
