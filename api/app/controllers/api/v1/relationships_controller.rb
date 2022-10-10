class Api::V1::RelationshipsController < ApplicationController
  before_action :set_user
  
  def index
    relationship = Relationship.all
    render json: relationship
  end
  
  def show 
    data = {
      userId: @user.id,
      selfId: @user.selfId
    }
    render json: data
  end

  def create
    relationship = @user.follow(relationship_params)
    render json: relationship
  end

  def destroy
    relationship = @user.unfollow()
    render json: relationship
  end
  
  def following_user
    data = {
      following_user_count: @user.following_user.count,
      followed: Relationship.find_by(followed_id: @user.id),
    }
    render json: data 
    #following_user_count = @user.following_user.count
    #followed = Relationship.find_by(followed_id: @user.id)
    #render json: { following_user_count: following_user_count, followed: followed }
  end
  
  def follower_user
    data = {
      follower_user_count: @user.follower_user.count,
      follower: Relationship.find_by(follower_id: @user.id),
    }
    render json: data
    #follower_user_count = @user.follower_user.count
    #follower = Relationship.find_by(follower_id: @user.id)
    #render json: { follower_user_count: follower_user_count, follower: follower }
  end

  private
  
  def set_user
    @user = User.find(params[:id])
  end
  
  def relationship_params
    params.permit(:followed_id).merge(user_id: current_api_v1_user.id)
  end
  
end