require 'rails_helper'

RSpec.describe "Api::V1::Rooms", type: :request do
  describe "Rooms" do
    
    before do
      @user = create(:user)
      @auth_tokens = login(@user)
      @room = create(:room)
    end
    
    it "全てのルーム取得" do
      get "/api/v1/rooms", headers: @auth_tokens
      expect(response.status).to eq(200)
    end
    
    it "特定のルーム取得" do
      get "/api/v1/rooms/#{@room.id}", params: { id: @room.id },headers: @auth_tokens
      expect(response.status).to eq(200)
    end
  end
end
