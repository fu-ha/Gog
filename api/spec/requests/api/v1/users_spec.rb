require 'rails_helper'

RSpec.describe "V1::Users", type: :request do
  describe "User" do
    context 'GET /api/v1/users' do
      before do
        create_list(:user, 10)
      end
      it 'ユーザー一覧の取得' do
        get "/api/v1/users"
        json = JSON.parse(response.body)
        expect(response.status).to eq(200)
      end
    end
    context 'GET /api/v1/users/1' do
      before do
        @user = create(:user)
      end
      it '特定ユーザー情報の取得' do
        get "/api/v1/users/#{@user.id}"
        json = JSON.parse(response.body)
        expect(response.status).to eq(200)
        expect(json['name']).to eq(@user.name)
        expect(json['email']).to eq(@user.email)
      end
    end
  end
end