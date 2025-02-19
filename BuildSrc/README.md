# Wifi Share

### Build with Node js Bundled

Transfer files and Messages over local wifi network without internet. Made with react js

## Required Programs to compile

- Inno Setup

## Build

- Copy production build `Frontend/dist/` folder contents in `Backend/public/` folder. (replace existing)
- Now Copy `Backend/` folder contents to `BuildSrc/ExportFolder/` (with node_modules too) (replace existing)

- **`Note:`** Make sure to copy `node.exe` to `ExportFolder/`,
(node.exe is generally located at: C:\Program Files\nodejs)

- Open the  `wifi-share-build-script.iss` in inno steup.
- Make required changes
- Compile the project
- A setup will be genetated which will install the wifi-share software.

