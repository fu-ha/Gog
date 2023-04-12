CarrierWave.configure do |config|
  if Rails.env.production?
  
  else
    # config.asset_host = ENV['CARRIERWAVE_HOST'] 
    config.asset_host = 'https://geem84.work'
    config.storage = :file
    config.cache_storage = :file
  end
end