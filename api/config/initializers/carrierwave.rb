CarrierWave.configure do |config|
  if Rails.env.production?
    config.fog_provider = 'fog/aws'
    config.fog_directory = 'gog-s3-bucket'
    config.cache_storage = :fog
    config.fog_public = false
    config.fog_credentials = {
      provider: 'AWS',
      aws_access_key_id: ENV['AWS_ACCESS_KEY_ID'],
      aws_secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],
      region: 'ap-northeast-1'
    }
  else
    config.asset_host = ENV['CARRIERWAVE_HOST'] || ''
    config.storage = :file
    config.cache_storage = :file
  end
end