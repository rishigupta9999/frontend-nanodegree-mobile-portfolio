## Setup

This project uses Gulp.  So NPM and Node must be installed for your platform.  I'm running on Mac OS X 10.10.5 and installed Node and NPM from here https://nodejs.org/en/download/

### Installing Gulp

I followed the instructions here https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md

### Required plug-ins

The following Gulp plug-ins were used:

[del](https://www.npmjs.com/package/del)

[runSequence](https://www.npmjs.com/package/run-sequence)

[image](https://www.npmjs.com/package/gulp-image)

[image-resize](https://www.npmjs.com/package/gulp-image-resize)

[gulp-htmlmin](https://www.npmjs.com/package/gulp-htmlmin)

[cleanCSS](https://www.npmjs.com/package/gulp-clean-css)

[rename](https://www.npmjs.com/package/gulp-rename)

[inlinesource](https://www.npmjs.com/package/gulp-inline-source)

Install these using the standard method

## Optimizations

### Part 1
- Resize pizzeria.jpg to the proper size that it can be displayed at max
- Add pizzeria thumbnail (generated via Gulp)
- More aggressive compression on PNGs and JPEGs using the gulp image plug-in
- Minify HTML, CSS and Javascript
- Asynchronously load Javascript as appropriate
- Inline CSS in the HTML file
- Asynchronous font loading using the Google Web Font Loader framework

### Part 2
- Cache the query result for ```#randomPizzas```, it's being done in a tight loop and doesn't change per loop element
- Cache the result of ```document.body.scrollTop``` since that also doesn't change per loop element
- Don't query for ```.mover``` every frame, just do it once since it doesn't change
- Eliminate the determineDx function.  Nothing in that function needs to be done per element.  All pizzas are the same size, so just apply the calculations based on the first pizza's width.  And hoist all calculations out of the loop, including the ```newwidth``` string generation which seems particularly expensive.
