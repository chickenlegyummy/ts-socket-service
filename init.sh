echo "Initializing project structure..."
echo "Creating files and directories..."
echo "init.sh - Project Initialization by: G gor's daddy"
echo "Thanks for using this script!" 
echo ""
echo "Creating: /src"
echo ""
mkdir src
echo "Creating: /dist"
echo ""
mkdir dist
echo "Creating: /public"
echo ""
mkdir public
echo "Creating: /src/index.js"
echo ""
touch src/index.js
echo "Creating: /src/index.css"
echo ""
touch src/index.css
echo "Creating: /public/index.html"
echo ""
touch public/index.html
echo ""
echo "Done creating files and directories."
echo ""
echo "Writing default content to index.html..."
echo "<!DOCTYPE html>" > public/index.html
echo "<html>" >> public/index.html
echo "<head>" >> public/index.html
echo "    <meta charset=\"UTF-8\">" >> public/index.html
echo "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">" >> public/index.html
echo "    <title>HAHA</title>" >> public/index.html
echo "    <link rel=\"stylesheet\" href=\"../src/index.css\">" >> public/index.html
echo "</head>" >> public/index.html
echo "<body>" >> public/index.html
echo "    <h1>Welcome to My Project</h1>" >> public/index.html
echo "    <script src=\"../src/index.js\"></script>" >> public/index.html
echo "</body>" >> public/index.html   
echo "</html>" >> public/index.html
echo ""
echo "Project structure initialized successfully! UwU"
echo "Initializing npm? (y/n)"
read init_npm
if [ "$init_npm" = "y" ] || [ "$init_npm" = "Y" ]; then
    echo "Initializing npm..."
    npm init -y
    echo "Done initializing npm!"

    echo "Installing Express? (y/n)"
    read install_express
    if [ "$install_express" = "y" ] || [ "$install_express" = "Y" ]; then
        echo "Installing Express..."
        npm install express
        echo "Done installing Express!"

    else
        echo "Skipping Express installation."
    fi
else
    echo "Skipping npm initialization."
fi

echo "Create gitignore? (y/n)"
read create_gitignore
if [ "$create_gitignore" = "y" ] || [ "$create_gitignore" = "Y" ]; then
    echo "Creating .gitignore..."
    touch .gitignore
    echo "node_modules/" >> .gitignore
    echo "dist/" >> .gitignore
    echo ".DS_Store" >> .gitignore
    echo "package-lock.json" >> .gitignore
    echo "Done creating .gitignore!"
else 
    echo "Skipping .gitignore creation."
fi

echo ""
echo "Done ALL!"
