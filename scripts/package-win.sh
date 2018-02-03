#!/usr/bin/env bash

# Vars
APP_TITLE="APP_NAME"
APP_PLATFORM="win32"
APP_ARCH="x64"
PLATFORM_NAME="Windows (via Wine)"
OUTPUT_FOLDER="packages"
ZIP_PACKAGE=false
ZIP_FILENAME="$(date +%Y-%m-%d)-APP_NAME-win.zip"
PATH_TO_WINE="/Applications/Wine Stable.app"

# Start
echo "Packaging '$APP_TITLE' for $PLATFORM_NAME..."

# Use Wine
test "$?BASH_VERSION" = "0" || eval 'setenv() { export "$1=$2"; }'
setenv PATH "$PATH_TO_WINE/Contents/Resources/start/bin:$PATH_TO_WINE/Contents/Resources/wine/bin:$PATH"

# Build source
echo
echo "Building source..."
rm -rf app/build/*
webpack --config config/webpack.prod.js

# Package Electron App
echo
echo "Packaging Electron app..."
mkdir -p $OUTPUT_FOLDER
electron-packager . "$APP_TITLE" --out=$OUTPUT_FOLDER --overwrite --platform=$APP_PLATFORM --arch=$APP_ARCH

if [ "$ZIP_PACKAGE" == true ]
then

  # Zip it up
  echo
  echo "Creating package zip file..."
  cd $OUTPUT_FOLDER
  zip -r "$ZIP_FILENAME" "$APP_TITLE-$APP_PLATFORM-$APP_ARCH"
  rm -rf "$APP_TITLE-$APP_PLATFORM-$APP_ARCH"
  cd ..

  # Complete
  echo
  echo "Zipped package ready: '$OUTPUT_FOLDER/$ZIP_FILENAME'"

else

  # Complete
  echo
  echo "Package ready: '$OUTPUT_FOLDER/$APP_TITLE-$APP_PLATFORM-$APP_ARCH'"

fi

echo
