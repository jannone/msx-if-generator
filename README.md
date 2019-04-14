[![Build Status](https://travis-ci.org/jannone/msx-if-generator.svg?branch=master)](https://travis-ci.org/jannone/msx-if-generator)


# Interactive Fiction Generator for MSX

Create Interative Fiction games using a simple JSON or YAML as input

* Reads JSON or YAML files (see the "examples" folder)
* Generates MSX-BASIC program
* Uses SCREEN 2 (graphic mode)
* Displays .SC2 files for images
* Supports conditional options using variables

Notice this is alpha quality software and not unit-tested.
Use it at your own risk.

## Requirements

* NodeJS: https://nodejs.org

## Installation

Before using, make sure to install the node_modules with:
```
npm install
```

## Usage

These are simple instructions for Mac OS. Please adapt for your environment.

1. Transpile game to your target folder (eg: "disk"):
```
ts-node src/cli.ts examples/croco.yaml > disk/AUTOEXEC.BAS
```

2. Add image files to disk (eg: "IMAGE1.SC2")
```
cp IMAGE1.SC2 disk/
```

3. Run game with OpenMSX:
```
open -a openMSX --args -machine msx2 -diska $(pwd)/disk
````
