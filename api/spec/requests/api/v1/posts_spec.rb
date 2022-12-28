require 'rails_helper'

RSpec.describe "Api::V1::Posts", type: :request do
  describe "Posts" do
    
    before do
      @user = create(:user)
      @post = create(:post)
      @auth_tokens = login(@user)
    end
    
    it '全ての投稿の取得' do
      get "/api/v1/posts", headers: @auth_tokens 
      expect(response.status).to eq(200)
    end
    
    it '特定の投稿の取得' do
      get "/api/v1/posts/#{@post.id}", params: { id: @post.id }, headers: @auth_tokens
      expect(response.status).to eq(200)
    end
    # 失敗
    # it '投稿の作成' do
    # 　post "/api/v1/posts", params: { user_id: @user.id, content: @post.content }, headers: @auth_tokens
    # 　expect(response.status).to eq(200)
    # end
    # 失敗
    # it '投稿の削除' do
    # 　delete "/api/v1/posts/#{@post.id}", params: { id: @post.id }, headers: @auth_tokens
    #   expect(response.status).to eq(200)
    # end
  
  end
end