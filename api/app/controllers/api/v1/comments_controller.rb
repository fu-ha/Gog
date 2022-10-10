class Api::V1::CommentsController < ApplicationController
  
  def index
    comments = Comment.all.order(created_at: :desc)
    comment_array = comments.map do |comment|
      {
        id: comment.id, user_id: comment.user_id, 
        post_id: comment.post_id, content: comment.content,
        created_at: comment.created_at,
        user: User.find_by(id: comment.user_id),
        #post: Post.find_by(id: comment.post_id)
        post: Post.where(id: comment.post_id).all
      }
    end
    render json: comment_array
  end
  
  def show 
    #comment = Comment.find(params[:id])
    #post = Post.find_by(id: comment.post_id)
    #if post.id == comment.post_id
    
    post = Post.find(params[:id])
    comments = Comment.where(post_id: post.id).all.order(created_at: :desc)
    render json: comments
   
    #post = Post.find(params[:id])
    #comments = Comment.where(post_id: post.id).all.order(created_at: :desc)
    #comment_info = User.where().all
    #comment_info = {
      #comments: Comment.where(post_id: post.id).all.order(created_at: :desc),
      #comments: Comment.where(post_id: post.id).all,
      #user: User.where(id: comment.user_id).all
      #user: User.find_by(id: Comment.find_by(user_id: post.user_id))
    #}
    #render json: { comments: comments, comment_info: comment_info }
    
    #comment_info = {
     # user: User.find_by(id: comment.user_id),
      #select_comments: Comment.where(post_id: post.id).all.order(created_at: :desc),
    #}
    #render json: select_comments
    #render json: comment_info
      #comment_info = {
      #  id: comment.id,
      #  user_id: comment.user_id,
      #  post_id: comment.post_id,
      #  content: comment.content,
      #  created_at: comment.created_at,
      #  post: Post.find_by(id: comment.post_id)
      #}
      #render json: comment_info
    #else
    #  render json: comment_info.errors
    #end
    #post = Post.find_by(id: params[:id])
    #comment = Comment.where(post_id: post.id).all
    #render json: comment
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