class Api::V1::PostsController < ApplicationController
  def index 
    posts = Post.all.order(created_at: :desc)
    post_array = posts.map do |post|
      { 
        id: post.id, user: User.find_by(id: post.user_id), user_id: post.user.id, 
        content: post.content, image: post.image, created_at: post.created_at,
        liked_count: PostLike.where(post_id: post.id, post_liked: true).count,
        post_like: PostLike.find_by(post_id: post.id)
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
      liked_count: PostLike.where(post_id: post.id, post_liked: true).count,
      post_likes: PostLike.where(user_id: post.user_id, post_id: post.id).exists? 
      #post_likes: PostLike.find_by(user_id: params[:user_id]),
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
  
  def liked 
  end
  
  private
  
  def post_params
    params.require(:post).permit(:content, :image).merge(user_id: current_api_v1_user.id)
  end
end