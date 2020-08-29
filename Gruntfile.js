const sass = require("node-sass");

module.exports = function (grunt) {
  "use strict";
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    jshint: {
      options: {
        camelcase: true,
        curly: true,
        eqeqeq: true,
        validthis: true
      },
      all: ["js/app.js"]
    },

    uglify: {
      options: {
        banner:
          '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        mangle: false
      },
      build: {
        src: ["js/app.js"],
        dest: "js/app.min.js"
      }
    },

    sass: {
      dist: {
        files: {
          "css/main.min.css": ["sass/app.scss"]
        },
        options: {
          implementation: sass,
          outputStyle: "compressed",
          sourceMap: false
        }
      }
    },

    svgstore: {
      options: {
        prefix: "icon-"
      },
      files: {
        "images/social-icons.svg": ["svg/*.svg"]
      }
    },

    watch: {
      sass: {
        files: ["sass/*.scss", "sass/**/*.scss", "sass/**/**/*.scss"],
        tasks: ["sass"]
      },

      js: {
        files: ["js/app.js"],
        tasks: ["jshint", "uglify"]
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-svgstore");
  grunt.loadNpmTasks("grunt-sass");

  // Default task(s).
  grunt.registerTask("default", ["watch"]);

  grunt.registerTask("svg", ["svgstore"]);

  grunt.registerTask("production", ["sass", "jshint", "uglify"]);
};
