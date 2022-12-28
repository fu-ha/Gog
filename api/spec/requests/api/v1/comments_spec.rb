require 'rails_helper'

RSpec.describe "Api::V1::Comments", type: :request do
  describe "Comments" do
    
    before do
      @user = create(:user)
      @auth_tokens = login(@user)
      @post = create(:post)
      @comment = create(:comment)
    end
    
    it '全てのコメントの取得' do
      get '/api/v1/posts/1/comments', headers: @auth_tokens 
      expect(response.status).to eq(200)
    end
    
    
    it '特定のコメントの取得' do
      get "/api/v1/posts/1/comments/#{@comment.id}", params: { id: @comment.id }, headers: @auth_tokens
      expect(response.status).to eq(200)
    end
    # 失敗
    # it 'コメントの作成' do
    # 　post "/api/v1/posts/#{@post.id}/comments", params: { user_id: @user.id, post_id: @post.id, content: @comment.content }, headers: @auth_tokens
    # 　expect(response.status).to eq(200)
    # end
    
    it 'コメントの削除'  do
      delete "/api/v1/posts/#{@post.id}/comments/#{@comment.id}", params: { id: @comment.id, post_id: @post.id }, headers: @auth_tokens
      expect(response.status).to eq(200)
    end
    
  end
end
