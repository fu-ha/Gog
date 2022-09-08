CarrierWave.configure do |config|
  if Rails.env.production?
  
  else
    config.asset_host = 'https://a8e8-54-64-76-14.ngrok.io:8080'
    config.storage = :file
    config.cache_storage = :file
  end
end