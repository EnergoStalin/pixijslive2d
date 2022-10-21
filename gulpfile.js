const fs = require('fs');
const gulp = require('gulp');
const browserify = require('browserify');
const tsify = require('tsify');


function loadlibs(path) {
	let buffer = "";
	for(const f of [
		'./src/lib/live2dcubismcore.min.js',
		'./src/lib/live2d.min.js',
		'./src/lib/pixi.min.js',
		'./src/lib/index.min.js'
	]) {
		buffer += `${fs.readFileSync(f)}\n`;
	}

	fs.writeFileSync(path, buffer);
}

gulp.task('browserify', () => {
	if(!fs.existsSync('./dist'))
		fs.mkdirSync('./dist');

	loadlibs('./dist/bundle.js');

	return browserify({
		entries: ['src/index.ts']
	})
	.plugin(tsify)
	.on('log', (e) => console.log(e))
	.bundle()
	.on('error', console.error)
	.pipe(fs.createWriteStream('./dist/bundle.js', { flags: 'a' }));
});

gulp.task('default', () => {
	gulp.watch('./src/**', gulp.task('browserify'));
});