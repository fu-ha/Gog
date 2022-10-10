class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  #↓ error: undefined method `helper_method' for ApplicationController
  #include ActionController::Helpers
  #include ActionController::RequestForgeryProtection
  
  skip_before_action :verify_authenticity_token, raise: false#, if: :devise_controller?
  helper_method :current_user, :user_signed_in?

end
