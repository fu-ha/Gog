class Api::V1::CommentsController < ApplicationController
  # before_action :set_comment, only: [:show, :create]
  
  def index
    comments = Comment.all.order(created_at: :desc)
    comment_array = comments.map do |comment|
      {
        id: comment.id, user_id: comment.user_id, 
        post_id: comment.post_id, content: comment.content,
        created_at: comment.created_at,
        # user から image も取得。
        user: User.find_by(id: comment.user_id),
        comment_like: CommentLike.find_by(comment_id: comment.id),
        comment_liked: CommentLike.where(user_id: current_api_v1_user.id, comment_id: comment.id).exists?,
        comment_liked_count: CommentLike.where(comment_id: comment.id).count,
      }
    end
    render json: comment_array
    
    #comments = Comment.where(post_id: @post.id).all.order(created_at: :desc)
    #render json: comments
    
    #comments = Comment.where(post_id: @post.id).all.order(created_at: :desc)
    #comment_array = comments.map do |comment|
    #  {
    #    id: comment.id, user_id: comment.user_id, 
    #    post_id: comment.post_id, content: comment.content,
    #    created_at: comment.created_at,
    #    user: User.find_by(id: comment.user_id)
    #  }
    #end
    #render json: comment_array
  end
  
  def show 
    comment = Comment.find(params[:id])
    comment_data = {
      id: comment.id,
      user_id: comment.user_id,
      post_id: comment.post_id,
      content: comment.content,
      #created_at: comment.created_at,
      comment_like: CommentLike.find_by(comment_id: comment.id),
      comment_liked: CommentLike.where(user_id: current_api_v1_user.id, comment_id: comment.id).exists?,
      comment_liked_count: CommentLike.where(comment_id: comment.id).count,
    }
    render json: comment_data
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
  
  def reloadFetch
    comments = Comment.all.order(created_at: :desc)
    comment_array = comments.map do |comment|
      {
        id: comment.id, user_id: comment.user_id, 
        post_id: comment.post_id, content: comment.content,
        created_at: comment.created_at,
        user: User.find_by(id: comment.user_id),
      }
    end
    render json: comment_array
  end
  
  private
  # def set_comment
  #   @post = Post.find_by(id: params[:id])
  # end
  
  def comment_params
    params.permit(:content, :user_id, :post_id).merge(user_id: current_api_v1_user.id)
  end
end