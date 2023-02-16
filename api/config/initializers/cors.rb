# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin AJAX requests.

# Read more: https://github.com/cyu/rack-cors

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # origins 'localhost:8081', '6a230d9e32254bf18f34da11905ca812.vfs.cloud9.ap-northeast-1.amazonaws.com:8081'
    # origins 'https://geem84.com', 'https://localhost:8081'
    origins ENV['CORS_ORIGIN']
    # origins 'geem84.com'
    # origins 'https:/localhost:8081'
    
    resource '*',
      headers: :any,
      expose: ["access-token", "expiry", "token-type", "uid", "client"],
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
