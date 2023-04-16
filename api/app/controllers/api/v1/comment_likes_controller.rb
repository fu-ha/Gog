class Api::V1::CommentLikesController < ApplicationController
  #before_action :set_comment_like, only: [:destroy]
  
  def index 
    comment_likes = CommentLike.all.order(created_at: :desc)
    comment_likes_array = comment_likes.map do |comment_like|
      { 
        id: comment_like.id, 
        user_id: comment_like.user_id, 
        post_id: comment_like.post_id,
        comment_id: comment_like.id,
        created_at: comment_like.created_at
      }
    end
    render json: comment_likes_array
  end

  def create
    comment_like = CommentLike.new(comment_like_params)
    if comment_like.save
      render json: comment_like
    else
      render json: comment_like.errors
    end
  end
  
  def destroy
    # comment_like = CommentLike.find(params[:id])
    comment_like = CommentLike.find_by(comment_like_params)
    if comment_like.destroy
      render json: comment_like
    else
      render json: comment_like.errors
    end
  end
  
  private
  #def set_comment_like
  #  @user = User.find(params[:user_id])
  #  @comment = Comment.find(params[:comment_id])
  #end
  
  def comment_like_params
    params.permit(:user_id, :post_id, :comment_id).merge(user_id: current_api_v1_user.id)
  end
end