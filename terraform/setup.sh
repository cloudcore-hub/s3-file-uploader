#!/bin/bash

# Update and upgrade the package list and existing packages
sudo apt-get update && sudo apt-get upgrade -y

# Install Nginx
sudo apt-get install nginx -y

# Install Git (if your project is in a Git repository)
sudo apt-get install git -y

# Install Node.js (using NVM for managing Node.js versions)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
nvm install --lts

# Clone your project (replace with your repository URL)
# For direct download without Git, use `curl` or `wget` instead
git clone https://github.com/cloudcore-hub/s3-file-uploader.git /var/www/my-react-app

# Navigate to your project directory
cd /var/www/my-react-app

# Install project dependencies
npm install

# Build your React app
npm run build

# Configure Nginx to serve your React app
cat > /etc/nginx/sites-available/default << EOF
server {
    listen 80;
    server_name _;
    location / {
        root /var/www/my-react-app/build;
        try_files \$uri \$uri/ /index.html;
    }
}
EOF

# Restart Nginx to apply the changes
sudo systemctl restart nginx
