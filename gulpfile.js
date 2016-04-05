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

// Default
  gulp.task('default', ['help']);