Rails.application.routes.draw do
  namespace :api do
    namespace :v1, format: 'json' do
      namespace :auth do
        resources :sessions, only: [:index]
      end
      
      devise_scope :api_v1_user do
       post "auth/guest_sign_in", to: "auth/sessions#guest_sign_in"
      end
      
      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations'
      }
      
      resources :users
      resources :posts
      resources :post_likes
      resources :comments
      resources :comment_likes
      resources :relationships
    end
  end
end