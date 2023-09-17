mkdir build
cp background.js build/background.js
cp content_script.js build/content_script.js
cp icon.jpeg build/icon.jpeg
cp manifest.json build/manifest.json
cp stations_data.json build/stations_data.json
echo "Done! Use build/ folder."
#zip -vr metrodick_ext.zip build/ -x "*.DS_Store"
#rm -rf build
#echo "Done! 'metrodick_ext.zip' built."