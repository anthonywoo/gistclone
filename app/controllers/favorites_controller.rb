class FavoritesController < ApplicationController
  before_filter :require_login
  respond_to :json

  def index
    favs = current_user.favorite_gists
    render :json => favs.to_json(:include => [:gist_files])
  end

  def create
    fav = Favorite.new(gist_id: params[:gist_id], user_id: current_user.id)
    if fav.save
      render :json => {status: 'ok'}
    else
      render :json => fav.errors, status: 422
    end
  end

  def destroy
    fav = Favorite.where({gist_id: params[:gist_id], user_id: current_user.id})
    if fav.empty?
      render :json => {status: 'fav not found'}, status: 422
    else
      fav.destroy_all
      render :json => {status: 'ok'}
    end
  end
end
