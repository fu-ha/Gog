Rails.application.routes.draw do
  namespace :api do
    namespace :v1, format: 'json' do
      #devise_scope :api_v1_user do
      
        mount_devise_token_auth_for 'User', at: 'auth', controllers: {
          registrations: 'api/v1/auth/registrations'
        }
      
        namespace :auth do
          devise_scope :api_v1_user do
            resources :sessions, only: [:index]
          end
        end
      
        devise_scope :api_v1_user do
          post "auth/guest_sign_in", to: "auth/sessions#guest_sign_in"
        end
        
        resources :users do
          get :login_user
          resources :relationships 
          get :following_user, to: "relationships#following_user", as: "following_user"
          get :follower_user, to: "relationships#follower_user", as: "follower_user"
        end
        resources :posts do
        end
        resources :comments 
        resources :post_likes do
          get :xliked
        end
        resources :comment_likes #, only: [:index, :create, :destroy] do
        #end
        resources :rooms, only: [:create, :show]
        resources :messages, only: [:create]
        resources :get_user, only: [:index]
      #end
    end
  end
end