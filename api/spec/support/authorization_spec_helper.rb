module AuthorizationSpecHelper
  def login(user)
    post '/api/v1/auth/sign_in',
      #ログインに必要なパラメーター
      params: { email: user.email, password: user.password },
      #渡したパタメーターの値の数値が文字列になったりしないため。
      as: :json
    
    #レスポンスヘッダーの中から「access-token, client, uid」を取り出し返す。
    response.headers.slice('access-token', 'client', 'uid')
  end
end

# RSpec.configure do |config|
#   config.include AuthorizationSpecHelper, type: :request
# end