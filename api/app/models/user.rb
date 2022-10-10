# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User
  
  has_many :posts, dependent: :destroy
  has_many :post_likes, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :comment_likes, dependent: :destroy
  #has_many :relationships, dependent: :destroy
  #has_many :followings, through: :relationships, source: :follow
  #has_many :reverse_of_relationships, class_name: 'Relationship', foreign_key: 'follow_id' 
  #has_many :followers, through: :reverse_of_relationships, source: :user
  has_many :follower, class_name: "Relationship", foreign_key: "follower_id", dependent: :destroy#フォローしてるユーザー
  has_many :followed, class_name: "Relationship", foreign_key: "followed_id", dependent: :destroy#フォローされてるユーザー
  has_many :following_user, through: :follower, source: :followed#自分がフォローしてる人
  has_many :follower_user, through: :followed, source: :follower #自分をフォローしてる人
  has_many :messages, dependent: :destroy
  has_many :entries, dependent: :destroy
  
  def self.guest
    find_or_create_by!(email: "guest@example.com") do |user|
      user.password = SecureRandom.urlsafe_base64
      user.name = "Guest_User"
    end
  end
  
  #def follow(other_user)
  #  unless self == other_user
  #    self.relationships.find_or_create_by(follow_id: other_user.id)
  #  end
  #end
  
  #def unfollow(other_user)
  #  relationship = self.relationships.find_by(follow_id: other_user.id)
  #  relationship.destroy if relationship
  #end
  
  ##def following?(other_user)
  #  self.followings.include?(other_user)
  #end
  
  def follow(user_id)
    self.follower.create(followed_id: user_id)
  end
  
  def unfollow(user_id)
    self.follower.find_by(followed_id: user_id).destroy
  end
  
  def following?(user)
    following_user.include?(user)
  end
  
  #def follower?(user)
  #  follower_user.include?(user)
  #end
  
  def selfId
    User.find_by(id: self.id)
  end

end
