class GistFilesController < ApplicationController
  def update
    file = GistFile.find(params[:id])
    if file.update_attributes(params[:gist_file])
      render :json => { status: "ok!" }
    else
      render :json => file.errors, status: 422
    end
  end
end
