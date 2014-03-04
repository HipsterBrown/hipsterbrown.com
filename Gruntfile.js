'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        camelcase: true,
        curly: true,
        eqeqeq: true,
        indent: 2,
        strict: true
      },
      all: [
        'js/*.js'
      ]
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'js/app.js',
        dest: 'js/app.min.js'
      }
    },

    sass: {
      dist: {
        files: {
          'css/main.min.css': [
            'sass/app.scss'
          ]
        },
        options: {
          style: 'compressed',
          sourcemap: false
        }
      }
    },

    watch: {
      sass: {
        files: [
          'sass/*.scss',
          'sass/**/*.scss',
          'sass/**/**/*.scss'
        ],
        tasks: ['sass']
      },

      js: {
        files: [
          'js/*.js'
        ],
        tasks: ['jshint']
      }
    }

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Default task(s).
  grunt.registerTask('default', ['watch']);

  grunt.registerTask('production', ['sass', 'jshint', 'uglify']);

};
