module FavoritesHelper
  def favorites
    current_user.favorite_gists
  end
end
