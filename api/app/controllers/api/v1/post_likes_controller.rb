class Api::V1::PostLikesController < ApplicationController
  def index
    post_likes = PostLike.all.order(created_at: :desc)
    render json: post_likes
    #post_likes_array = post_likes.map do |post_like|
    #  { 
    #    id: post_like.id, 
    #    user_id: post_like.user_id, 
    #    post_id: post_like.post_id,
    #    created_at: post_like.created_at,
    #    #liked_icon: PostLike.where(user_id: post_like.user_id).exists?
    #  }
    #end
  end
  
  def show
    post_likes = PostLike.find_by(params[:id])
    post_likes_info = {
      id: post_likes.id,
      user_id: post_likes.user_id,
      post_id: post_likes.post_id,
      #liked_icon: PostLike.where(user_id: post_likes.user_id, post_liked: true).count
    }
    render json: post_likes_info
  end

  def create
    post_likes = PostLike.new(post_likes_params)
    if post_likes.save
      render json: { post_likes: post_likes, liked_icon: PostLike.where(user_id: post_likes.user_id).exists? }
    else
      render json: post_likes.errors
    end
  end
  
  def destroy
    post_likes = PostLike.find_by(post_id: params[:post_id])
    if post_likes.destroy
      render json: post_likes
    else
      render json: post_likes.errors
    end
  end
  
  private
  
  def post_likes_params
    params.permit(:user_id, :post_id, :post_liked).merge(user_id: current_api_v1_user.id)#, post_id: @post.id)
  end
end