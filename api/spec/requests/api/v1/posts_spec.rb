require 'rails_helper'

RSpec.describe "Api::V1::Posts", type: :request do
  describe "Post" do
    before do
      create_list(:post, 10)
    end
    it '全ての投稿の取得' do
      get '/api/v1/posts'
      expect(response.status).to eq(200)
    end
    before do
      @post = create(:post)
    end
    it '特定の投稿の取得' do
      get "/api/v1/posts/#{@post.id}"
      json = JSON.parse(response.body)
      expect(response.status).to eq(200)
      expect(json['content']).to eq(@post.content)
    end
  end
end