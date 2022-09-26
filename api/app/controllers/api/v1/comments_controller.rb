class Api::V1::CommentsController < ApplicationController
  #before_action :set_comment, only: [:create]
  
  def index
    comment = Comment.all
    render json: comment
  end
  
  def create
    comment = Comment.new(comment_params)
    if comment.save
      render json: comment
    else
      render json: comment.errors
    end
  end
  
  def destroy
    comment = Comment.find(params[:id])
    if comment.destroy
      render json: comment
    else
      render json: comment.errors
    end
  end
  
  private
  #def set_comment
  #  @post = Post.find(params[:id])
  #end
  
  def comment_params
    params.permit(:content, :user_id, :post_id).merge(user_id: current_api_v1_user.id)
  end
end