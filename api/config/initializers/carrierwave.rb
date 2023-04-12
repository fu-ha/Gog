CarrierWave.configure do |config|
  if Rails.env.production?
    config.asset_host = 'https://geem84.work'
  else
    # config.asset_host = ENV['CARRIERWAVE_HOST'] 
    config.storage = :file
    config.cache_storage = :file
  end
end