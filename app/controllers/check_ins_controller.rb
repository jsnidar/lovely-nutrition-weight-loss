class CheckInsController < ApplicationController

  private

  def user_params
    params.permit(:date, :weight, :left_arm_measurement, :left_thigh_measurement, :hips, :waist, :chest, :notes)
  end
end
