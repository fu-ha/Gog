class Api::V1::PostLikesController < ApplicationController
  before_action :set_post_like, only: [:destroy]

  def create
    post_like = PostLike.new(post_like_params)
    if post_like.save
      render json: post_like
    else
      render json: { status: not_found }
    end
  end
  
  def destroy
    post_like = @user.un_post_like(@post)
    if post_like.destroy
      render json: post_like
    else
      render json: { status: not_found }
    end
  end
  
  private
  def set_post_like
    @user = User.find(params[:user_id])
    @post = Post.find(params[:post_id])
  end
  
  def post_like_params
    params.permit(:user_id, :post_id)
  end
end