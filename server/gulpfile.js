var gulp            = require("gulp"),
    clean           = require("gulp-clean"),
    browserSync     = require("browser-sync"),
    jade            = require("gulp-jade"),
    plumber         = require("gulp-plumber"),
    sass            = require("gulp-sass"),
    autoprefixer    = require('gulp-autoprefixer')
    cssLint         = require("gulp-csslint"),
    useref          = require("gulp-useref"),
    mmq             = require('gulp-merge-media-queries'),
    inlinesource    = require('gulp-inline-source'),
    sprite          = require('gulp.spritesmith'),
    gulpif          = require('gulp-if'),
    jshint          = require("gulp-jshint"),
    jsStylish       = require("jshint-stylish"),
    uglify          = require("gulp-uglify");

gulp.task("clean", function(){

    gulp.src(["../docs", "../app/_source/compilado"])
    .pipe(clean({force: true}));
});


gulp.task("server", function(){

    browserSync.init({
        server: {
            baseDir: "../docs"
        }
    });

    gulp.watch("../docs/**/*").on("change", browserSync.reload);
    gulp.watch("../app/_source/**/*.jade", ["jade"]);
    gulp.watch("../app/_source/**/*.scss", ["sass"]);
    // gulp.watch("../app/_source/js/*.js", ["js"]);
    gulp.watch("../app/_source/img/*", ["img"]);
    gulp.watch("../app/_source/img/sprite/*.png", ["sprite"]);

    gulp.watch("../app/_source/compilado/*.html", ["build-html"]);
    gulp.watch("../app/_source/compilado/css/*.css", ["build-css", "build-html"]);
    gulp.watch("../app/_source/js/*.js", ["build-js", "build-html"]);
    gulp.watch("../app/_source/vendor/*.js", ["build-vendor", "build-html"]);
    
    gulp.watch("../server/gulpfile.js", ["build-html", "build-css", "build-js"]);
    
});


gulp.task("jade", function(){

    gulp.src("../app/_source/index.jade")
        .pipe(plumber())
        .pipe(jade({
             pretty: true // 'true' não minifica o html, 'false' minifica html
        }))
        .pipe(gulp.dest("../app/_source/compilado"));
});


gulp.task("sass", function(){

    gulp.src(["../app/_source/scss/layout/abouve-default.scss", "../app/_source/scss/layout/style.scss"])
        .pipe(sass({outputStyle: 'compact' /* expanded, compact,compressed*/}).on('error', sass.logError))
        .pipe(plumber())
         .pipe(autoprefixer({
                browsers: ['last 10 versions'],
                cascade: false
            }))
        .pipe(mmq({
            beautify: false
        }))
        .pipe(sass({outputStyle: 'compact' /* expanded, compact,compressed*/}).on('error', sass.logError))
        .pipe(gulp.dest('../app/_source/compilado/css'))
});


// gulp.task("build-js", function(){

//     gulp.src("../app/_source/js/*.js")
//         .pipe(jshint())
//         .pipe(jshint.reporter(jsStylish))
//         .pipe(plumber())
//         .pipe(uglify())
//         .pipe(gulp.dest("../app/_source/compilado/js"))
// });


gulp.task("img", function(){

    gulp.src("../app/_source/img/*")
        .pipe(gulp.dest("../docs/img"))
});


gulp.task('sprite', function () {

    var spriteData = gulp.src('../app/_source/img/sprites/*.png')
        .pipe(sprite({
            imgName: 'sprite.png',  //nome sprite gerado
            cssName: 'sprite.css'   // nome css do sprite
        }));
        spriteData.img.pipe(gulp.dest('../docs/img/sprite'));
        spriteData.css.pipe(gulp.dest('../app/_source/cssSprite'));
});


gulp.task("build-html", function(){

    gulp.src("../app/_source/compilado/*.html")
        .pipe(useref())
        .pipe(inlinesource())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulp.dest("../docs"))
});


gulp.task("build-css", function(){

    gulp.src("../app/_source/compilado/css/*.css")
        // .pipe(cssLint())
        // .pipe(cssLint.formatter())
});


gulp.task("build-js", function(){

    return gulp.src("../app/_source/js/*.js")
        .pipe(jshint())
        .pipe(jshint.reporter(jsStylish))
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest("../app/_source/compilado/js"))
});


gulp.task("build-fonts", function(){

    gulp.src("../app/_source/fonts/**/*")
    .pipe(gulp.dest("../docs/fonts"));
});


gulp.task("build-vendor", function(){

    gulp.src("../app/_source/vendor/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("../docs/vendor"))
});


gulp.task("comp", ["jade", "sass"]);

gulp.task("images", ["img", "sprite"]);

gulp.task("build", ["build-html", "build-css", "build-js", "build-fonts", "build-vendor"]);

gulp.task("default", ["comp", "build", "images", "server"]);
