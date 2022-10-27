CarrierWave.configure do |config|
  if Rails.env.production?
  
  else
    config.asset_host = ENV['CARRIERWAVE_HOST'] 
    #config.asset_host = 'https://ed82-54-168-213-6.ngrok.io'
    config.storage = :file
    config.cache_storage = :file
  end
end