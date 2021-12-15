class User < ApplicationRecord
  has_many :check_ins
  has_many :goals 
end
