require 'rails_helper'

RSpec.describe "Api::V1::Relationships", type: :request do
  describe "Relationships" do
    
    before do
      @user = create(:user)
      @follow = create(:user)
      # @relationship = @user.follow(@follow)
      @auth_tokens = login(@user)
    end
    
    it "全てのフォロー関係を取得" do
      get "/api/v1/users/1/relationships", headers: @auth_tokens
      expect(response.status).to eq(200)
    end
    
    # it "フォロー作成" do
    #   post "/api/v1/users/#{@user.id}/relationships", params: { user_id: @user.id, follow_id: @follow.id }, headers: @auth_tokens
    #   expect(response.status).to eq(200)
    # end
    
    # it "フォロー削除" do
    #   delete "/api/v1/users/1/relaionships/#{@user.id}", params: { id: @user.id }, headers: @auth_tokens
    #   expect(response.status).to eq(200)
    # end
    
  end
end
