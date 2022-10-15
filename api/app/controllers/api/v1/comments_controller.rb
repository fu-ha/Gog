class Api::V1::CommentsController < ApplicationController
  before_action :set_comment, only: [:show, :create]
  
  def index
    comments = Comment.all.order(created_at: :desc)
    comment_array = comments.map do |comment|
      {
        id: comment.id, user_id: comment.user_id, 
        post_id: comment.post_id, content: comment.content,
        created_at: comment.created_at,
        user: User.find_by(id: comment.user_id),
        #post: Post.find_by(id: comment.post_id)
        #post: Post.find_by(id: comment.post_id)
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
    #comment = Comment.find(params[:id])
    #post = Post.find_by(id: comment.post_id)
    #if post.id == comment.post_id
    
    #post = Post.find(params[:id])
    #comments = Comment.where(post_id: post.id).all.order(created_at: :desc)
    #render json: comments
    
    comment = Comment.find(params[:id])
      #data = [
        user = User.find_by(id: comment.user_id)
        comments = Comment.where(post_id: @post.id).all.order(created_at: :desc)
        #posts: @post.id
      #]
    #render json: data
    render json: [ user: user, comments: comments ]
    
    #comment = Comment.find(params[:id])
    #user_data = User.where(id: comment.user_id),
    #comments = Comment.where(post_id: @post.id).all.order(created_at: :desc),
    #posts = @post.id
    #render json:  { user_data: user_data.as_json,
    #                comments: comments.as_json,
    #                posts: posts.as_json
    #              }
    
    #comment = Comment.find(params[:id])
    #user = User.where(id: comment.user_id)
    #comments = Comment.where(post_id: @post.id).all.order(created_at: :desc)
    #render json: { user_data: { id: user.id, name: user.name, email: user.email}, 
    #               comments: { id: comments.id, user_id: comments.user_id, post_id: comments.post_id, 
    #               content: comments.post_id, created_at: comments.created_at } 
    #}
    #render json: { user_data: @user_data.to_json, comments: @comments.to_json }
    
    #commentt = Comment.find(params[:id])
    #comment_array = commentt.map do |comment|
    #  {
    #    user: User.find(id: comment.id),
    #    comments: Comment.where(post_id: @post.id).all.order(created_at: :desc)
    #  }
    #end 
    #render json: comment_array
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
  def set_comment
    @post = Post.find_by(id: params[:id])
  end
  
  def comment_params
    params.permit(:content, :user_id, :post_id).merge(user_id: current_api_v1_user.id)
  end
end