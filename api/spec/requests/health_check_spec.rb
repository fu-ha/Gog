require 'rails_helper'

RSpec.describe "HealthChecks", type: :request do
  describe "GET /index" do
    
    it 'ヘルスチェックが成功' do
      get "/api/v1/health_check"
      expect(response.status).to eq(200)
    end
  end
end
