// プラグインを定数に代入
const gulp = require('gulp');
const sass = require('gulp-dart-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
// ローカルサーバー用プラグイン
const browserSync = require('browser-sync');
// CSS・JSファイル圧縮プラグイン
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify')
const del = require('del');
// 画像圧縮プラグイン
const imagemin = require('gulp-imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const pngquant = require('imagemin-pngquant');
// 入出力するフォルダを指定
const srcPath = {
	'scss': './src/assets/scss/**/*.scss',
	'html': './src/**/*.html',		//  末尾にカンマを追加
	'js': './src/assets/js/**/*.js',			// ← 末尾にカンマを追加
	'img': './src/assets/img/**/*'
};
const distPath = {
	'css': './dist/assets/css/',
	'html': './dist/',				//  末尾にカンマを追加
	'js': './dist/assets/js/',					// ← 末尾にカンマを追加
	'img': './dist/assets/img/'
};
// Scssコンパイル用のタスク
const cssSass = () => {
	return gulp.src(srcPath.scss, {
		sourcemaps: true
	})
		.pipe(sass({ outputStyle: 'expanded' }))
		// ベンダープレフィックス付与
		.pipe(postcss([
			autoprefixer({
				cascade: false,
				grid: 'autoplace'
			})
		]))
		// メディアクエリをまとめる
		.pipe(postcss([mqpacker()]))
		.pipe(gulp.dest(distPath.css, { sourcemaps: './' }))
		// Scss用 ローカルサーバーリロード
		.pipe(browserSync.stream())
		.pipe(gulp.dest(distPath.css))
}
// HTMLを書き出すためのタスク
const html = () => {
	return gulp.src(srcPath.html)
		.pipe(gulp.dest(distPath.html))
}
// ローカルサーバーの立ち上げ
const browserSyncFunc = () => {
	browserSync.init(browserSyncOption);
}
const browserSyncOption = {
	server: "./dist/"
}

const browserSyncReload = (done) => {
	browserSync.reload();
	done();
}
// CSSファイル圧縮用のタスク
const cssMin = () => {
	return gulp.src(distPath.css + '*.css')		//  distフォルダの中にあるCSSファイルを指定
		.pipe(cleanCSS())			//  CSSファイルを圧縮
		.pipe(rename({ suffix: ".min" }))		//  圧縮したファイル名に「 .min 」をつける
		.pipe(gulp.dest(distPath.css));			//  圧縮したファイルの書き出し先を指定
}
// clean タスク
const clean = () => {
	return del('./dist/**/*');		//  distフォルダ内のファイルをすべて削除
}
// JSファイル圧縮用のタスク
const js = () => {
	return gulp.src(srcPath.js)
		.pipe(gulp.dest(distPath.js))
}
const jsMin = () => {
	return gulp.src(srcPath.js)	//  圧縮したいJavaScriptファイルを指定
		.pipe(gulp.dest(distPath.js)) // 圧縮前のファイルを出力		
		.pipe(uglify())					//  JavaScript圧縮
		.pipe(rename({ suffix: ".min" }))		//  圧縮したファイル名に「 .min 」をつける
		.pipe(gulp.dest(distPath.js));		//  圧縮したファイルの書き出し先を指定
}
// 画像圧縮用のタスク
const minifyImage = () => {
	return (
		gulp.src(srcPath.img, { encoding: false })			// ← 圧縮したい画像を指定
			.pipe(imagemin([
				imageminMozjpeg({ quality: 80 }),		// ← jpg画像の圧縮率を指定
				pngquant({
					quality: [0.6, 0.7],			// ← png画像の圧縮率を指定
					speed: 1,					// ← 実行速度を指定
				}),
				imagemin.svgo({
					plugins: [
						{ removeViewBox: true }, 		// ← IE用 svg画像のwidthとheightを担保
						{ cleanupIDs: false }],			// ← cleanupIDs機能を無効
				}),
				imagemin.gifsicle({
					interlaced: true,				// ← インターレース機能を有効
					optimizationLevel: 3,			// gifアニメーションの圧縮率を指定
				}),
			]))
			.pipe(gulp.dest(distPath.img))		// ← 圧縮した画像の書き出し先を指定
	);
}
// watch タスク
const watchFiles = () => {
	gulp.watch(srcPath.scss, gulp.series(cssSass))
	gulp.watch(srcPath.html, gulp.series(html, browserSyncReload))
	gulp.watch(srcPath.js, gulp.series(js, browserSyncReload))
	gulp.watch(srcPath.img, gulp.series(minifyImage, browserSyncReload))
}
// 開発段階 全タスク実行文
exports.default = gulp.series(
	clean,
	gulp.parallel(html, cssSass, js, minifyImage),
	gulp.parallel(watchFiles, browserSyncFunc)
);

// 提出段階 全タスク実行文
exports.prod = gulp.series(
	clean,				//  この一行を追加
	gulp.parallel(html, cssSass),
	gulp.parallel(cssMin, jsMin)
);
