require 'rails_helper'

RSpec.describe Entry, type: :model do
  before do
    @entry = FactoryBot.create(:entry)
  end
  
  it "user_id, room_idがある場合、有効" do
    expect(@entry).to be_valid
  end
  
  ## user_id ##  
  it "user_idがない場合、無効" do
    @entry.user_id = nil
    expect(@entry).not_to be_valid
  end

  it "user_idがある場合、有効" do
    user = User.find(@entry.user_id)
    expect(user).to be_valid
  end
  
  ## room_id ##
  it "room_idがない場合、無効" do
    @entry.room_id = nil
    expect(@entry).not_to be_valid
  end 
  
  it "room_idがある場合、有効" do
    room = Room.find(@entry.room_id)
    expect(room).to be_valid
  end
end
