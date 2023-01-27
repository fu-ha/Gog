Rails.application.routes.draw do
  namespace :api do
    namespace :v1, format: 'json' do
    # namespace :v1 do
      devise_scope :api_v1_user do
      
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
          #get :search
          resources :relationships 
        end
        get 'search', to: 'users#search'
        resources :posts do
          resources :comments 
        end
        get 'fetch_comments', to: 'comments#reloadFetch'
        resources :post_likes 
        resources :comment_likes
        resources :rooms
        resources :messages
        get 'health_check', to: 'health_check#index'
      end
    end
  end
end