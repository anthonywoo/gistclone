module SessionsHelper
  def current_user
    if session[:id]
      return User.find(session[:id])
    else
      return nil
    end
  end
end
