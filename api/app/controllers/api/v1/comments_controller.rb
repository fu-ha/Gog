class Api::V1::CommentsController < ApplicationController
  before_action :comment_params
  
  def index
    comment = Comment.all
    render json: comment
  end
  
  def create
    comment = Comment.new(coment_params)
    if comment.save
      render json: comment
    else
      render json: comment.errors
    end
  end
  
  def update
    comment = Comment.find(params[:id])
    if comment.update(comment_params)
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
  def comment_params
    params.require(:comment).permit(:content)
  end
end