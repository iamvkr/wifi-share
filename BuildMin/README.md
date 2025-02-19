# Wifi Share

### Build Min version

Transfer files and Messages over local wifi network without internet. Made with react js

This version requires user to already installed node js on their system

## Required Programs to compile

- Inno Setup

## Build

- Copy production build `Frontend/dist/` folder contents in `Backend/public/` folder. (replace existing)
- Now Copy `Backend/` folder contents to `BuildSrc/ExportFolder/` (with node_modules too) (replace existing)
- Note: node.exe is not bundled here
- Open the  `wifi-share-build-script-min.iss` in inno steup.
- Make required changes
- Compile the project
- A setup will be genetated which will install the wifi-share software.

