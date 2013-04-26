class GistsController < ApplicationController
  before_filter :require_login
  respond_to :json
  respond_to :html, only: [:index, :create]

  def index
    @gists = current_user.gists.includes([:gist_files, :tags])
    respond_to do |format|
      format.html { render :index }
      format.json { render :json => @gists.to_json(:include => [:gist_files, :tags]) }
    end
  end

  def create
    gist = Gist.new(params[:gist])
    gist.owner_id = current_user.id
    if gist.save!
      render :json => gist.to_json(:include => [:gist_files])
    else
      render :json => gist.errors, status: 422
    end
  end

  def destroy
    gist = Gist.find(params[:id])
    gist.destroy
    render :json => {status: "ok!"}
  end

  def update
    gist = Gist.find(params[:id])
    if gist.update_attributes(params[:gist])
      render :json => {status: "ok!"}
    else
      render :json => gist.errors, status: 422
    end
  end

end
