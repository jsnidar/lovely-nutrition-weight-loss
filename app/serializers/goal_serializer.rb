class GoalSerializer < ActiveModel::Serializer
  attributes :id, :goal_met, :goal_end_date, :goal_name, :goal_start_date, :goal_weight
end
