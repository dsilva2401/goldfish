var gulp = require('gulp-param')(require('gulp'), process.argv);
var fs = require('fs-extra');
var path = require('path');

// Bubble seeds manager
  gulp.task('bubble', function (install, remove, name) {
    if (!install || remove) return;
    var targetPath = path.join('bubble', 'childs', name);

    // Install
      if (install) {
        console.log('Installing bubble to =>', targetPath);
        fs.copySync( path.join('.seeds', 'bubble'), targetPath );
        return;
      }
  
    // Remove
      if (remove) {
        console.log('Not available');
        // fs.removeSync(targetPath);
      }

  });

  gulp.task('front-seed', function (install, remove, seed, bubble, name) {

    // Install
    if (install) {
      if (!name) return;
      // Copy seed
      var targetPath = path.join('statics/modules', name);
      if (!bubble) targetPath = path.join('bubble', targetPath);
      else targetPath = path.join('bubble/childs', bubble, targetPath);
      console.log('Installing '+seed+' to =>', targetPath);
      fs.copySync( path.join('.seeds', seed), targetPath );
      // Replace paths
      var repl = require("replace");
      repl({
        regex: seed,
        replacement: name,
        paths: [targetPath],
        recursive: true,
        silent: true,
      });
    }
  
  });

  gulp.task('help', function () {
    console.log('\n\n');
    console.log('gulp bubble');
    console.log('gulp front-seed');
    console.log('\n\n');
  });

// Default
  // gulp.task('default', ['help']);