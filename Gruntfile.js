module.exports = function(grunt) {

  grunt.initConfig({

    // JS TASKS ====================================================
    // check all js files for errorMessage
    jshint: {
      all: ['client/src/js/**/*.js']
    },

    // take all the js files and minify them into app.min.js
    uglify: {
      build: {
        files: {
          'client/dist/js/app.min.js': ['client/src/js/**/*.js', 'client/src/js/*.js']
        }
      }
    },

    // CSS TASKS ====================================================
    // process the less file to style.css
    less: {
      build: {
        files: {
          'client/dist/css/style.css': 'client/src/css/style.less'
        }
      }
    },

    // take the processed style.css file and minify
    cssmin: {
      build: {
        files: {
          'public/dist/css/style.min.css': 'client/dist/css/style.css'
        }
      }
    },

    // COOL TASKS ====================================================
    // watch css and js files and process the above tasks
    watch: {
      css: {
        files: ['client/src/css/**/*.less'],
        tasks: ['less', 'cssmin']
      },
      js: {
        files: ['client/src/js/**/*.js'],
        tasks: ['jshint', 'uglify']
      }
    },

    // watch our node server for changes
    nodemon: {
      dev: {
        script: 'server/server.js'
      }
    },

    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      tasks: ['nodemon', 'watch']
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('default', ['less', 'cssmin', 'jshint', 'uglify', 'concurrent', 'nodemon']);

};
