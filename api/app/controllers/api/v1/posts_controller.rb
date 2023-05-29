class Api::V1::PostsController < ApplicationController
  #before_action :authenticate_api_v1_user!
  
  def index 
    posts = Post.all.order(created_at: :desc)
    post_array = posts.map do |post|
      { 
        id: post.id, user_id: post.user.id,
        # user から image も取得。
        user: User.find_by(id: post.user_id),  
        content: post.content, image: post.image, created_at: post.created_at, tag: post.tag,
        post_liked_count: PostLike.where(post_id: post.id).count,
        post_like: PostLike.where(user_id: current_api_v1_user.id, post_id: post.id).all,
        comment: Comment.find_by(post_id: post.id),
        comment_count: Comment.where(post_id: post.id).count,
        comment_liked: CommentLike.where(user_id: current_api_v1_user.id, post_id: post.id).exists?,
        comment_liked_count: CommentLike.where(post_id: post.id).count
      }
    end
    render json: post_array
  end
  
  def show
    post = Post.find(params[:id])
    post_info = {
      id: post.id,
      user_id: post.user_id,
      user: post.user,
      content: post.content,
      #image: post.image_url, image: post.image.url
      image: post.image,
      created_at: post.created_at,
      tag: post.tag,
      post_liked_count: PostLike.where(post_id: post.id).count,
      #post_liked: PostLike.where(user_id: post.user_id, post_id: post.id).exists?
      post_liked: PostLike.where(user_id: current_api_v1_user.id, post_id: post.id).exists?,
      #liked_icon: post.liked
      #liked_count: PostLike.where(post_id: post.id, post_liked: true).count,
      post_like: PostLike.find_by(post_id: post.id),
      comment: Comment.find_by(post_id: post.id),
      comment_count: Comment.where(post_id: post.id).count,
      #comment_like: CommentLike.find_by(post_id: post.id),
      comment_liked: CommentLike.where(user_id: current_api_v1_user.id, post_id: post.id).exists?,
      comment_liked_count: CommentLike.where(post_id: post.id).count
    }
    render json: post_info
  end
  
  def create
    post = Post.new(post_params)
    if post.save
      render json: post
    else
      render json: post.errors
    end 
  end
  
  def destroy
    post = Post.find(params[:id])
    if post.destroy
      render json: post
    else
      render json: post.errors
    end 
  end
  
  
  private
  
  def post_params
    params.permit(:content, :image, :tag).merge(user_id: current_api_v1_user.id)
  end
end