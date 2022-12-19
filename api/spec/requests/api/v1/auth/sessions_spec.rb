require 'rails_helper'

RSpec.describe "Api::V1::Auth::Sessions", type: :request do
  describe "Sessions" do
    
    it "ログインユーザーが存在するか" do
      user = create(:user)
      auth_tokens = login(user)
      get "/api/v1/auth/sessions", headers: auth_tokens
      expect(response.status).to eq(200)
    end
    
    it "ゲストログイン" do
      post "/api/v1/auth/guest_sign_in"
      expect(response.status).to eq(200)
      expect(response.header["access-token"]).to be_present
      expect(response.header["client"]).to be_present
      expect(response.header["expiry"]).to be_present
      expect(response.header["uid"]).to be_present
      expect(response.header["token-type"]).to be_present
    end
    
  end
end
