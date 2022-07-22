require 'rails_helper'

RSpec.describe Post, type: :model do
  let(:user) { create(:user) }
  let(:post) { create(:post) }
  
  it 'contentが存在する場合成功' do
    expect(post).to be_valid
  end

  it 'contentが存在する場合失敗' do
    post.content = ''
    expect(post).to_not be_valid
  end
end
