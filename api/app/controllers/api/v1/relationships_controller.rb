class Api::V1::RelationshipsController < ApplicationController
  before_action :set_user, only: [:create, :destroy]
  
  def index
    relationships = Relationship.all
    relationship_array = relationships.map do |relationship|
      {
        id: relationship.id,
        user_id: relationship.user_id,
        follow_id: relationship.follow_id
      }
    end
    render json: relationship_array
  end
  
  #def show
  #  relationship = Relationship.find(params[:id])
  #  render json: relationship  #[relationship: relationship]
  #end

  def create
    relationship = @user.follow(@follow)
    render json: relationship
  end

  def destroy
    relationship = @user.unfollow(@follow)
    render json: relationship
  end

  private
  
  def set_user
    @user = User.find(params[:user_id])
    #@follow = User.find(params[:follow_id])
    @follow = User.find_by(id: current_api_v1_user.id)
  end

end