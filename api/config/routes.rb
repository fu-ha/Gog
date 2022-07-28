Rails.application.routes.draw do
  devise_for :users
  
  namespace :api do
    namespace :v1, format: 'json' do
      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations'
      }
      
      namespace :auth do
        resources :sessions, only: [:index]
      end
      
      devise_scope :api_v1_user do
        post "auth/guest_sign_in", to: "auth/sessions#guest_sign_in"
      end
      
      resources :users
      resources :posts
      resources :post_likes
      resources :comments
      resources :comment_likes
      resources :relationships
      resources :rooms, only: [:create, :show]
      resources :messages, only: [:create]
    end
  end
end