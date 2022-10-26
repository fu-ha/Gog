CarrierWave.configure do |config|
  if Rails.env.production?
  
  else
    #config.asset_host = ENV['CARRIERWAVE_HOST'] 
    config.asset_host = 'https://e5eb-18-183-169-161.ngrok.io'
    config.storage = :file
    config.cache_storage = :file
  end
end