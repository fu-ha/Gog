require 'rails_helper'

RSpec.describe "Api::V1::CommentLikes", type: :request do
  describe "CommentLikes" do
    
    before do
      @user = create(:user)
      @post = create(:post)
      @comment = create(:comment)
      @auth_tokens = login(@user)
      # user_id, post_id, comment_idの指定なし => Failure/Error: if comment_like.destroy NoMethodError: undefined method `destroy' for nil:NilClass
      @comment_like = create(:comment_like, user_id: @user.id, post_id: @post.id, comment_id: @comment.id)
    end
    
    it "コメントのいいねを全て取得" do
      get "/api/v1/comment_likes", headers: @auth_tokens
      expect(response.status).to eq(200)
    end
    
    it "コメントのいいね作成" do
      post "/api/v1/comment_likes", params: { user_id: @user.id, post_id: @post.id, comment_id: @comment.id }, headers: @auth_tokens
      expect(response.status).to eq(200)
    end
    
    it 'コメントのいいね削除' do
      delete "/api/v1/comment_likes/#{@comment_like.id}", params: { id: @comment_like.id }, headers: @auth_tokens
      expect(response.status).to eq(200)
    end
  end
end
