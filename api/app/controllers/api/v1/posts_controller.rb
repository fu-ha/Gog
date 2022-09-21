class Api::V1::PostsController < ApplicationController
  #before_action :authenticate_api_v1_user!
  before_action :set_posts, only: [:index]
  
  def index 
    posts = Post.all.order(created_at: :desc)
    #render json: posts
    #posts = Post.where(user_id: current_api_v1_user.id).all.order("created_at DESC")
    post_array = posts.map do |post|
      { 
        id: post.id, user: User.find_by(id: post.user_id), user_id: post.user_id, 
        content: post.content, image: post.image, created_at: post.created_at,
        #post_user_count: Post.count, post_liked_count: PostLike.count,
        #liked_icon: PostLike.where(user_id: current_api_v1_user.id, post_liked: true).all,
        #liked_icon: PostLike.where().exists?,
        liked_count: PostLike.where(post_id: post.id, post_liked: true).count
      }
    end
    render json: post_array
    
    #post_count = Post.where(user_id: 1).count
    #render json: post_count
  end
  
  def show
    post = Post.find(params[:id])
    post_info = {
      id: post.id,
      user: post.user,
      content: post.content,
      liked_count: PostLike.where(post_id: post.id, post_liked: true).count
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

  def set_posts
    @post_like = PostLike.all
  end
  
  def post_params
    params.require(:post).permit(:content, :image).merge(user_id: current_api_v1_user.id)
  end
end