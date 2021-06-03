Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :v1 do
    resources :channels, only: [:index] do
      resources :messages, only: [:index, :create], controller: 'channel_messages'
    end
  end
end
