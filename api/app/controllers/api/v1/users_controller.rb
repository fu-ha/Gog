class Api::V1::UsersController < ApplicationController
  def index
    users = User.all.order(created_at: :desc)
    user_array = users.map do |user|
      {
        id: user.id, 
        name: user.name,
        image: user.image, 
        email: user.email,
        created_at: user.created_at,
        relationship: Relationship.find_by(followed_id: user.id)
      }
    end
    #login_user: User.find_by(id: current_api_v1_user.id)
    render json: user_array
  end
  
  def show
    #user = User.find_by(id: current_api_v1_user.id)
    user = User.find(params[:id])
    user_info = {
      id: user.id,
      name: user.name,
      email: user.email,
      #image_url: user.image_url,
      post: Post.find_by(user_id: user.id),
      posts_count: Post.where(user_id: user.id).count,
      relationship: Relationship.find_by(followed_id: user.id) 
    }
    render json: user_info
    #@user = User.all
    #@user = User.find(params[:id])
    #@users = @user.too_method
    #render json: @users
  end
  
  def destroy
    user = User.find(params[:id])
    if user.destroy
      render json: user    
    else
      render json: user.errors
    end
  end
  
  def login_user
    user = User.find_by(id: current_api_v1_user.id)
    render json: user
  end
end