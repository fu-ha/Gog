require 'rails_helper'

RSpec.describe Message, type: :model do
  before do
    @message = FactoryBot.create(:message)
  end 
  
  it "user_id, room_id, content(全て)ある場合、有効" do
    expect(@message).to be_valid
  end
  
  ## user_id ##  
  it "user_idがない場合、無効" do
    @message.user_id = nil
    expect(@message).not_to be_valid
  end

  it "user_idがある場合、有効" do
    user = User.find(@message.user_id)
    expect(user).to be_valid
  end
  
  ## room_id ##
  it "room_idがない場合、無効" do
    @message.room_id = nil
    expect(@message).not_to be_valid
  end

  it "room_idがある場合、有効" do
    room = Room.find(@message.room_id)
    expect(room).to be_valid
  end
  
  ## content ##
  it "contentがない場合、無効" do
    @message.content = nil
    expect(@message).not_to be_valid
  end

  it "contentが140文字以上ある場合、無効" do
    @message.content = "a" * 150
    expect(@message).not_to be_valid
  end
end
