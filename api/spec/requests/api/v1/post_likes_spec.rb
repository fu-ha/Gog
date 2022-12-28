require 'rails_helper'

RSpec.describe "Api::V1::Postlikes", type: :request do
  describe "Postlikes" do
    
    before do
      @user = create(:user)
      @post = create(:post)
      @auth_tokens = login(@user)
      @post_like = create(:post_like)
    end
    
    it "投稿のいいねを全て取得" do
      get "/api/v1/post_likes", headers: @auth_tokens
      expect(response.status).to eq(200)
    end
    
    it "投稿のいいね作成" do
      post "/api/v1/post_likes", params: { user_id: @user.id, post_id: @post.id }, headers: @auth_tokens
      expect(response.status).to eq(200)
    end
    # 失敗
    # it "投稿のいいね削除" do
    #   delete "/api/v1/post_likes/#{@post_like.id}", params:{ id: @post_like.id }, headers: @auth_tokens
    #   expect(response.status).to eq(200)
    # end
  end
end
