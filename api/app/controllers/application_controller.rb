class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
        
  skip_before_action :verify_authenticity_token, if: :devise_controller?, raise: false 
  helper_method :current_user, :user_signed_in?
  
  #def configure_permitted_parameters	 
   # devise_parameter_sanitizer.permit(:sign_in, keys: [:name, :email, :password, :password_confirmation, :format, :session])
  #end
end
