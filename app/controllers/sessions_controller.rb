class SessionsController < ApplicationController
  def new
  end

  def create
    user = User.find_by_user_name(params[:user_name])
    if user
      session[:id] = user.id
      redirect_to "/"
    else
      render :new
    end
  end

  def destroy
    session[:id] = nil
    redirect_to new_sessions_url
  end
end
