# Javascript rendering/game engines comparison

https://shirajuki.js.org/js-game-rendering-benchmark/

This is a sprite-based performance test that compares a set of Javascript-based rendering/game engines that are currently maintained. The test includes rendering a set of graphics/shapes and sprites.

## Description

- A preset of up to 10.000 different sprites moving on a canvas with various speed
  - A custom option through the count query is also available for comparing sprite counts between libraries more freely. Be aware that drawing a large number of sprites on specific libraries may cause the test to freeze.
  - Compare drawing of graphics/shapes and sprites through the type query
- Different libraries used to render the scene are chosen only if they have been maintained in the previous month of this benchmark. The following libraries compared and sorted by popularity (stars) are:

| Name                                                    | Stars                                                                           | Last Commit                                                                            | Description                                                                                                                                         | Game engine |
| ------------------------------------------------------- | ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| [three.js](https://github.com/mrdoob/three.js)          | ![GitHub Repo stars](https://img.shields.io/github/stars/mrdoob/three.js)       | ![GitHub last commit](https://img.shields.io/github/last-commit/mrdoob/three.js)       | JavaScript 3D library.                                                                                                                              | no          |
| [PixiJS](https://github.com/pixijs/pixi.js)             | ![GitHub Repo stars](https://img.shields.io/github/stars/pixijs/pixi.js)        | ![GitHub last commit](https://img.shields.io/github/last-commit/pixijs/pixi.js)        | The HTML5 Creation Engine: Create beautiful digital content with the fastest, most flexible 2D WebGL renderer.                                      | no          |
| [Phaser](https://github.com/photonstorm/phaser)         | ![GitHub Repo stars](https://img.shields.io/github/stars/photonstorm/phaser)    | ![GitHub last commit](https://img.shields.io/github/last-commit/photonstorm/phaser)    | Phaser is a fun, free and fast 2D game framework for making HTML5 games for desktop and mobile web browsers, supporting Canvas and WebGL rendering. | yes         |
| [Babylon.js](https://github.com/BabylonJS/Babylon.js)   | ![GitHub Repo stars](https://img.shields.io/github/stars/BabylonJS/Babylon.js)  | ![GitHub last commit](https://img.shields.io/github/last-commit/BabylonJS/Babylon.js)  | Babylon.js is a powerful, beautiful, simple, and open game and rendering engine packed into a friendly JavaScript framework.                        | yes         |
| [Two.js](https://github.com/jonobr1/two.js)             | ![GitHub Repo stars](https://img.shields.io/github/stars/jonobr1/two.js)        | ![GitHub last commit](https://img.shields.io/github/last-commit/jonobr1/two.js)        | A renderer agnostic two-dimensional drawing api for the web.                                                                                        | no          |
| [Hilo](https://github.com/hiloteam/Hilo)                | ![GitHub Repo stars](https://img.shields.io/github/stars/hiloteam/Hilo)         | ![GitHub last commit](https://img.shields.io/github/last-commit/hiloteam/Hilo)         | A Cross-end HTML5 Game development solution developed by Alibaba Group                                                                              | yes         |
| [MelonJS](https://github.com/melonjs/melonjs)           | ![GitHub Repo stars](https://img.shields.io/github/stars/melonjs/melonjs)       | ![GitHub last commit](https://img.shields.io/github/last-commit/melonjs/melonjs)       | A fresh & lightweight javascript game engine.                                                                                                       | yes         |
| [Kaboom](https://github.com/replit/kaboom) (deprecated) | ![GitHub Repo stars](https://img.shields.io/github/stars/replit/kaboom)         | ![GitHub last commit](https://img.shields.io/github/last-commit/replit/kaboom)         | 💥 JavaScript game library.                                                                                                                         | yes         |
| [Kaplay](https://github.com/kaplayjs/kaplay)            | ![GitHub Repo stars](https://img.shields.io/github/stars/kaplayjs/kaplay)       | ![GitHub last commit](https://img.shields.io/github/last-commit/kaplayjs/kaplay)       | 🦖 A JavaScript/TypeScript Game Library that feels like a game.                                                                                     | yes         |
| [Kontra](https://github.com/straker/kontra)             | ![GitHub Repo stars](https://img.shields.io/github/stars/straker/kontra)        | ![GitHub last commit](https://img.shields.io/github/last-commit/straker/kontra)        | A lightweight JavaScript gaming micro-library, optimized for js13kGames.                                                                            | yes         |
| [Excalibur](https://github.com/excaliburjs/Excalibur)   | ![GitHub Repo stars](https://img.shields.io/github/stars/excaliburjs/Excalibur) | ![GitHub last commit](https://img.shields.io/github/last-commit/excaliburjs/Excalibur) | 🎮 Your friendly TypeScript 2D game engine for the web 🗡️                                                                                           | yes         |

## Canvas and WebGL

As a baseline for benchmarking, a DOM engine and Canvas engine for rendering shapes and sprites are included. Canvas is a 2D rendering context that lets us draw and manipulate sprites on an HTML canvas element. It's simple to use and supported by the majority of modern browsers, making it a popular choice for creating simple graphics, animations, and games.

In contrast to Canvas, WebGL is a more powerful and versatile alternative. WebGL allows for more detailed and interactive 3D graphics, as well as access to the GPU, which improves performance even more than Canvas. As a result, WebGL is the most powerful choice for any web application that needs graphics-intensive rendering or interactive 3D scenes. However, when comparing Canvas and WebGL performance benchmarks with 2D graphics and sprites, it is important to remember that there may be some bias depending on the specific implementation as well as the environment in which the tests are run. Because WebGL is designed primarily for 3D graphics, it may not provide a significant performance boost over Canvas in a 2D context due to its higher resource requirements.

To summarize, both technologies have advantages and are used in different scenarios depending on the project's specific needs. As a result, comparing the differences between canvas and WebGL with 2D sprites may be biased.

## Game engines and rendering engines

A game engine is a software framework that gives one the tools and functionality one need to create and develop games. Input handling, physics, collision detection, and sprite animation are examples of the common features. A rendering engine, on the other hand, is a software component that is in charge of displaying and rendering graphics on the screen. It usually does not include the full set of tools and features found in a game engine. Three.js, Pixi.js, and Two.js are examples of such rendering engines.

The rendering engine libraries Three.js, Pixi.js, and Two.js were tested on rendering 2D graphics and sprites for the performance benchmark. The most performant was discovered to be Pixi.js, followed by Three.js and Two.js. As a fallback, all of these support rendering in both the WebGL and Canvas contexts.

In terms of performance, Babylon.js and Phaser outperformed the other game engines tested. The former is a game engine designed primarily for 3D games capable of rendering 2D sprites, whereas the latter has a longer history and a larger user base. Babylon.js was discovered to be slightly faster than Phaser, but both game engines performed reasonably well when tested.

## Conclusion

It should be noted that being faster is not always preferable. Aside from performance, one must consider the features a library provides such as asset loading, sprite animation, input, etc. to easily create various games. In addition to this, some rendering/game engines may have a steeper learning curve than others, making them less desirable to use. It is important to consider user experience as well as speed in game development.

Results of the benchmark on 10.000 sprites:

1. **Babylon.js**: [56 FPS] Babylon.js outperforms Three.js and has the best overall performance when it comes to rendering 2D sprites, despite being one of only two 3D engines in this benchmark - game engine. [(link)](https://shirajuki.js.org/js-game-rendering-benchmark/babylon.html?count=10000&type=sprite)
2. **Pixi.js**: [47 FPS] Good performance - rendering engine. [(link)](https://shirajuki.js.org/js-game-rendering-benchmark/pixi.html?count=10000&type=sprite)
3. **Phaser**: [43 FPS] The most popular library for HTML5 game development, and the performance demonstrates why. Overall, a good performance - game engine. [(link)](https://shirajuki.js.org/js-game-rendering-benchmark/phaser.html?count=10000&type=sprite)

Honourable mentions:

- **Kontra**: [60 FPS] To avoid frame rate issues, the game loop implementation of Kontra uses a time-based animation with a fixed dt. As a result, each update call is always guaranteed set to be 1/60 of a second. The update at 60 FPS in this case is not as smooth as in the other tests above, ranking it lower. - lightweight game engine. [(link)](https://shirajuki.js.org/js-game-rendering-benchmark/kontra.html?count=10000&type=sprite)
- **Kaboom**: [3 FPS] Despite being one of the slowest libraries in terms of performance, developing with Kaboom was the most enjoyable. The library is jam-packed with features that make development simple and enjoyable. It has a straightforward syntax, and the code is simple to read and understand. The documentation and examples are also among the best of any library - game engine. [(link)](https://shirajuki.js.org/js-game-rendering-benchmark/kaboom.html?count=10000&type=sprite)

The performance of the different libraries was measured by running a benchmark test on a computer with the following specifications:

- OS: `Microsoft Windows 11 Home - 10.0.22621 Build 22621`
- CPU: `AMD Ryzen 5 4500U`
- RAM: `8GB 2666MHz`
- Browser: `Microsoft Edge - Version 109.0.1518.55 (Official build) (64-bit)`

## Readings

- [A collection of WebGL and WebGPU frameworks and libraries](https://gist.github.com/dmnsgn/76878ba6903cf15789b712464875cfdc)
- [A collection of primarily HTML5 based game engines and frameworks](https://github.com/bebraw/jswiki/wiki/Game-Engines)
- [quidmonkey's Benchmark comparison of pixijs and impactjs](https://github.com/quidmonkey/particle_test)
- [slaylines' benchmark comparison of some popular canvas engines](https://github.com/slaylines/canvas-engines-comparison)
