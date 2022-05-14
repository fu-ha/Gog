require 'rails_helper'

RSpec.describe Comment, type: :model do
  let(:user) { create(:user) }
  let(:post) { create(:post) }
  let(:comment) { create(:comment) }
  
  it 'contentが存在する場合成功' do
    expect(comment).to be_valid
  end

  it 'contentが存在する場合失敗' do
    comment.content = ''
    expect(comment).to_not be_valid
  end
end