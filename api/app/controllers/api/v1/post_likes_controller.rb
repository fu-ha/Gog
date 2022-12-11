class Api::V1::PostLikesController < ApplicationController
  #before_action :set_post_like, only: [:destroy]
  
  def index
    post_likes = PostLike.all.order(created_at: :desc)
    post_likes_array = post_likes.map do |post_like|
      { 
        id: post_like.id, 
        user_id: post_like.user_id, 
        post_id: post_like.post_id,
        created_at: post_like.created_at
      }
    end
    render json: post_likes_array
  end
  
  #def show
  #  post_like = PostLike.find(params[:id])
  #  post_like_info = {
  #    id: post_like.id,
  #    user_id: post_like.user_id,
  #    post_id: post_like.post_id,
  #    created_at: post_like.created_at
  #  }
  #  render json: post_like_info
  #end

  def create
    post_like = PostLike.new(post_like_params)
    if post_like.save
      render json: post_like
    else
      render json: post_like.errors
    end
  end
  
  def destroy
    #post_like = PostLike.find(params[:id])
    post_like = PostLike.find_by(post_like_params)
    if post_like.destroy
      render json: post_like
    else
      render json: post_like.errors
    end
  end
  
  private
  #def set_post_like
    #@user = User.find(params[:id])
   # @post = Post.find(params[:id])
  #end
  
  def post_like_params
    params.permit(:user_id, :post_id).merge(user_id: current_api_v1_user.id)
  end
end