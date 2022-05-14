Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
       namespace :auth do
        resources :sessions, only: [:index]
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