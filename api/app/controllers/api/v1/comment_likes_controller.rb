class Api::V1::CommentLikesController < ApplicationController
  before_action :set_comment_like, only: [:destroy]

  def create
    comment_like = CommentLike.new(comment_like_params)
    if comment_like.save
      render json: comment_like
    else
      render json: { status: not_found }
    end
  end
  
  def destroy
    comment_like = @user.un_comment_like(@comment)
    if comment_like.destroy
      render json: comment_like
    else
      render json: { status: not_found }
    end
  end
  
  private
  def set_comment_like
    @user = User.find(params[:user_id])
    @comment = Comment.find(params[:comment_id])
  end
  
  def comment_like_params
    params.permit(:user_id, :comment_id)
  end
end