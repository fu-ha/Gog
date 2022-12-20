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
        #following: Relationship.find_by(user_id: user.id),
        #follower: Relationship.find_by(follow_id: user.id),
        relationship: { #両方同じかも？？
          following: Relationship.find_by(follow_id: user.id),
          follower: Relationship.find_by(user_id: user.id),
          #following: user.followings,
          #follower: user.followers
        },
        login_user: User.find_by(id: current_api_v1_user.id),
        # login_user: User.where(id: current_api_v1_user.id)[0],
        #login_user: User.find_by(id: current_user.id),
      }
    end
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
      # post: Post.find_by(user_id: user.id),
      posts: Post.where(user_id: user.id).all,
      posts_count: Post.where(user_id: user.id).count,
      relationship: {
        data: Relationship.find_by(user_id: user.id),
        following: Relationship.where(follow_id: user.id).count,
        follower: Relationship.where(user_id: user.id).count,
        #current_api_v1_userがフォローしているuserかどうか
        if_follow: Relationship.find_by(user_id: user.id, follow_id: current_api_v1_user.id)
        # if_follow: Relationship.where(user_id: user.id).all
        # following: user.followings.count,
        # follower: user.follower.count,
      },
      login_user: User.find_by(id: current_api_v1_user.id),
    }
    render json: user_info
    #render json: { user_info: user_info, login_user: login_user }
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
  
  def search
    #params[:name]に該当するユーザーを一覧表示
    user = User.where('name LIKE ?', "%#{user_params[:name]}%")
    render json: user
  end
  
  private
  
  def user_params
    params.permit(:name)
  end
end