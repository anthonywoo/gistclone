class ApplicationController < ActionController::Base
  protect_from_forgery
  include SessionsHelper

  def require_login
    unless current_user
      redirect_to new_sessions_url
    end
  end
end
