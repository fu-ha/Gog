class Api::V1::CommentsController < ApplicationController
  def index
    comment = Comment.all
    render json: comment
  end
  
  def create
    comment = Comment.new(coment_params)
    if comment.save
      render json: comment
    else
      render json: { status: not_found }
    end
  end
  
  def update
    comment = Comment.find(params[:id])
    if comment.update(comment_params)
      render json: comment
    else 
      render json: { status: not_found }
    end
  end
  
  def destroy
    comment = Comment.find(params[:id])
    if comment.destroy
      render json: comment
    else
      render json: { status: not_found }
    end
  end
  
  private
  def comment_params
    params.require(:comment).permit(:content)
  end
end