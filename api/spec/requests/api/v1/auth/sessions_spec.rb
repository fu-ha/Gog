require 'rails_helper'

RSpec.describe "Api::V1::Auth::Sessions", type: :request do
  describe "POST api/v1/auth/guest_sign_in" do
    context "リクエスト送信時" do
      it "ゲストログインに成功" do
        post "/api/v1/auth/guest_sign_in"
        expect(response).to have_http_status(:ok)
        header = response.header
        expect(header["access-token"]).to be_present
        expect(header["client"]).to be_present
        expect(header["expiry"]).to be_present
        expect(header["uid"]).to be_present
        expect(header["token-type"]).to be_present
      end
    end
  end
end
