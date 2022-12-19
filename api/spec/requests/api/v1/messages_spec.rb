require 'rails_helper'

RSpec.describe "Api::V1::Messages", type: :request do
  describe "Messages" do
    
    before do
      @user = create(:user)
      @auth_tokens = login(@user)
      @room = create(:room)
      @message = create(:message)
    end
    
    it "全てのメッセージ取得" do
      get "/api/v1/messages", headers: @auth_tokens
      expect(response.status).to eq(200)
    end
    
    it "メッセージ作成" do
      post "/api/v1/messages", params: { content: @message.content }, headers: @auth_tokens
      expect(response.status).to eq(200)
    end
    
    it "メッセージ削除" do
      delete "/api/v1/messages/#{@message.id}", params: { id: @message.id, user_id: @user.id, room_id: @room.id }, headers: @auth_tokens
      expect(response.status).to eq(200)
    end
  end
end
