class Api::V1::PostLikesController < ApplicationController
  #before_action :set_post_likes, only: [:destroy]
  #before_action :set_variable
  
  def index
    post_likes = PostLike.all.order(created_at: :desc)
    #if current_api_v1_user.id == post_likes.user_id
    #liked_count = PostLike.count
    #render json: post_likes
    #render json: { post_likes: @post_likes, liked_count: PostLike.where(post_id: @post_likes.id).count }
    #else
    #  render json: { post_likes: post_likes.errors, liked_count: liked_count }
    #end
    
    #post_likes = PostLike.where(post_liked: true).count
    
    #post_likes = PostLike.where(post_liked: true).all if current_api_v1_user.id == post_likes.user_id
    #render json: post_likes
    
    #post_likes = PostLike.where(post_liked: true).all 
    #if current_api_v1_user.id == post_likes.user_id 
      #@post_likes = PostLike.where(post_liked: true).all
    #  render json: post_likes
    #end
    post_likes_array = post_likes.map do |post_like|
      { 
        id: post_like.id, 
        user_id: post_like.user_id, 
        post_id: post_like.post_id,
        created_at: post_like.created_at,
        liked_icon: PostLike.where(user_id: post_like.user_id).exists?
        #liked_count: PostLike.where(post_id: @post.id).count
      }
    end
    render json: post_likes_array
  end
  
  def show
    post_likes = PostLike.find(params[:id])
    render json: post_likes
    #post_likes = PostLike.find_by()
    #render json: { post_likes: post_likes, liked_count: PostLike.where(post_id: post_likes.post_id).count }
    #post_likes_info = {
    #  id: post_likes.id,
    #  user_id: post_likes.user_id,
    #  post_id: post_likes.post_id,
    #  liked_count: post_likes.liked_count
    #}
    #render json: post_likes_info
  end

  def create
    post_likes = PostLike.new(post_likes_params)
    if post_likes.save
      #render json: post_likes
      render json: { post_likes: post_likes, liked_icon: PostLike.where(user_id: post_likes.user_id).exists? }
    else
      render json: post_likes.errors
      #render json:  { post_likes: post_likes.errors, liked_count: liked_count }
    end
  end
  
  def destroy
    #post_likes = PostLike.where(user_id: current_api_v1_user.id, ).find(params[:id])
    #post_likes = PostLike.find(post_likes_params)
    @post_likes = PostLike.find_by(post_id: params[:post_id])
    #post_likes = PostLike.where(user_id: @user.id, post_id: @post.id).find(@post_likes)
    #post_likes = @user.un_post_likes(@post)
    #post_likes = PostLike.find_by(id: params[:id])
    if @post_likes.destroy
      render json: @post_likes
      #render json: { post_likes: post_likes, liked_count: liked_count }
    else
      render json: @post_likes.errors
      #render json: { post_likes: post_likes.errors, liked_count: liked_count }
    end
  end
  
  #def liked_count
  #  post_likes = PostLike.(post_liked: true).count
  #  render json: post_likes
  #end
  
  private
  def set_post_likes
    @user = User.find(params[:id])
    @post = Post.find(params[:id])
    #find_byはレコードの検索でヒットした初めの一件だけを返す
    #@user = User.find_by(id: params[:id])
    # @post = Post.find_by(id: params[:id])
    #@post = Post.find(params[:id])
    #@post = Post.find(15)
  end
  
  #def liked_count
  #  @liked_count = PostLike.where(post_id: @post.id).count
  #end
  
  #def set_variable
  #  @user = User.find_by(id: current_api_v1_user.id)
  #  @post = Post.find_by(id: @user.id)
  #  render json: @post
  #end
      
  def post_likes_params
    params.permit(:user_id, :post_id, :post_liked).merge(user_id: current_api_v1_user.id)#, post_id: @post.id)
  end
end