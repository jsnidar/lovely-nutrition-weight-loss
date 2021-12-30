class CheckInsController < ApplicationController

  def create
    user = User.find(session[:user_id])
    check_in = user.check_ins.create!(check_in_params)
    render json: check_in, status: :created
  end

  def destroy 
    check_in = CheckIn.find(params[:id])
    check_in.destroy
    render json: {}
  end

  private

  def check_in_params
    params.permit(:date, :weight, :left_arm_measurement, :left_thigh_measurement, :hips, :waist, :chest, :notes)
  end
end
