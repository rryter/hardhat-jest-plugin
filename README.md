[![Build Status](https://travis-ci.com/rryter/hardhat-jest-plugin.svg?branch=master)](https://travis-ci.com/rryter/hardhat-jest-plugin)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

# Experimental, untested proof of concept hardhat-jest-plugin

👷‍♀️👷‍♂️

The plugin enables the use of [Jest](https://jestjs.io/) as a test runner.

## What

This plugin will make it possible to benefit from both the features Jest provides, as well as the HRE for an optimal debugging experience.

## Installation

```bash
npm install hardhat-jest-plugin jest
```

Import the plugin in your `hardhat.config.js`:

```js
require("hardhat-jest-plugin");
```

Or if you are using TypeScript, in your `hardhat.config.ts`:

```ts
import "hardhat-jest-plugin";
```

## Required plugins

None, yet.

## Tasks

This plugin adds the `test:jest` task to Hardhat:

```
output of `npx hardhat help example`
```

## Environment extensions

None.

## Configuration

None, yet.

## Usage

There are no additional steps you need to take for this plugin to work.

Install it and run it with `hardhat test:jest`
