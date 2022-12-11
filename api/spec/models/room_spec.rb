require 'rails_helper'

RSpec.describe Room, type: :model do
  it "ルーム作成" do
    @room = FactoryBot.create(:room)
    expect(@room).to be_valid
  end
end
