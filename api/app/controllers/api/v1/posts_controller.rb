class Api::V1::PostsController < ApplicationController
  before_action :post_params, only: [:create, :updata]
  
  def index
    post = Post.all
    render json: post
  end
  
  def show
    post = Post.find(params[:id])
    render json: post
  end

  def create
    post = Post.new(post_params)
    if post.save
      render json: post
    else
      render json: { status: not_found }
    end
  end
  
  def update
    post = Post.find(params[:id])
    if post.update(post_params)
      render json: post
    else
      render json: { status: not_found }
    end
  end
  
  def destroy
    post = Post.find(params[:id])
    if post.destroy
      render json: post
    else
      render json: { status: not_found }
    end
  end

  private
  
  def post_params
    params.require(:post).permit(:content)
  end
end