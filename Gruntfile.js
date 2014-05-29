module.exports = function(grunt) {

  'use strict';
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

    svgstore: {
      options: {
        prefix: 'icon-',
      },
      files: {
        'images/social-icons.svg': ['svg/*.svg']
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
        tasks: ['jshint', 'uglify']
      }
    }

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-svgstore');

  // Default task(s).
  grunt.registerTask('default', ['watch']);

  grunt.registerTask('svg', ['svgstore']);

  grunt.registerTask('production', ['sass', 'jshint', 'uglify']);

};
