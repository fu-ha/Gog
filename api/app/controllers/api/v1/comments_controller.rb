class Api::V1::CommentsController < ApplicationController
  #before_action :set_comment, only: [:create]
  
  def index
    comments = Comment.all.order(created_at: :desc)
    comment_array = comments.map do |comment|
      {
        id: comment.id, user_id: comment.user_id, 
        post_id: comment.post_id, content: comment.content,
        created_at: comment.created_at,
        user: User.find_by(id: comment.user_id),
        #post: Post.find_by(id: comment.post_id)
      }
    end
    render json: comment_array
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