require 'rails_helper'

RSpec.describe "Api::V1::Users", type: :request do
  describe "Users" do
  ## ログイン状態じゃないとcurrent_api_v1_userがnilで取得できない ##
    
    before do
      @user = create(:user)
      @auth_tokens = login(@user)
    end
    
    context 'GET /api/v1/users' do
      it 'ユーザー一覧の取得' do
        get '/api/v1/users', headers: @auth_tokens 
        expect(response.status).to eq(200)
        # expect(response).to have_http_status(200)
      end
    end
    
    context 'GET /api/v1/users/1' do
      it '特定ユーザー情報の取得' do
        get "/api/v1/users/#{@user.id}", params: { id: @user.id }, headers: @auth_tokens
        expect(response.status).to eq(200)
      end
    end
    
  end
end