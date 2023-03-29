require 'rails_helper'

RSpec.describe "Api::V1::Relationships", type: :request do
  describe "Relationships" do
    
    before do
      @user = create(:user)
      @follow = create(:user)
      @auth_tokens = login(@user)
      @relationship = create(:relationship, user_id: @user.id, follow_id: @follow.id)
    end
    
    !let(:relationship) { create(:relationship, user: @user.id, follow_id: @follow.id) }
    
    it "全てのフォロー関係を取得" do
      get "/api/v1/users/#{@user.id}/relationships", headers: @auth_tokens
      expect(response.status).to eq(200)
    end
    
    it "フォロー作成" do
      post "/api/v1/users/#{@user.id}/relationships", params: { user_id: @user.id, follow_id: @follow.id }, headers: @auth_tokens
      expect(response.status).to eq(200)
    end
    
    it 'フォロー削除' do
      delete "/api/v1/users/#{@relationship.user_id}/relationships/#{@relationship.id}", params: { id: @relationship.id, user_id: @relationship.user_id, follow_id: @relationship.follow_id }, headers: @auth_tokens
      expect(response.status).to eq(200)
    end
    
  end
end
