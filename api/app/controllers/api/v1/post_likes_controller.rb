class Api::V1::PostLikesController < ApplicationController
  def index
    post_likes = PostLike.all.order(created_at: :desc)
    post_likes_array = post_likes.map do |post_like|
      { 
        id: post_like.id, 
        user_id: post_like.user_id, 
        post_id: post_like.post_id,
        created_at: post_like.created_at,
        #liked_icon: PostLike.where(user_id: post_like.user_id).exists?,
        post_liked: post_like.post_liked,
        #liked_count: PostLike.where(post_id: post_like.post_id, post_liked: true).count
      }
    end
    render json: post_likes_array
  end
  
  def show
    post_like = PostLike.find_by(id: params[:id])
    #if current_api_v1_user.id == post_like.user_id
      post_like_info = {
        id: post_like.id,
        user_id: post_like.user_id,
        post_id: post_like.post_id,
        #liked_icon: PostLike.where(user_id: post_likes.user_id, post_liked: true).count
        #post_liked: PostLike.where(user_id: post_like.user_id, post_liked: true).exists?
        #post_liked: PostLike.where(post_id: post_like.post_id).exists?
        post_liked: post_like.post_liked
      }
      render json: post_like_info
    #else
    #  render json: post_like_info.errors
    #end
  end

  def create
    post_like = PostLike.new(post_like_params)
    if post_like.save
      render json: post_like
    else
      render json: post_like.errors
    end
  end
  
  def destroy
    post_like = PostLike.find(params[:id])
    if post_like.destroy
      render json: post_like
    else
      render json: post_like.errors
    end
  end
  
  private
  
  def post_like_params
    params.permit(:user_id, :post_id, :post_liked).merge(user_id: current_api_v1_user.id)
  end
end