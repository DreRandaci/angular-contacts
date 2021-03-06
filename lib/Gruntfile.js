module.exports = function (grunt) {
    
      grunt.loadNpmTasks('grunt-contrib-jshint');
      grunt.loadNpmTasks('grunt-contrib-watch');
      grunt.loadNpmTasks('grunt-contrib-copy');
      grunt.loadNpmTasks('grunt-sass');
      grunt.loadNpmTasks('grunt-contrib-clean');
    
    
      grunt.initConfig({
        jshint: {
          options: {
            predef: ["document", "console", "firebase", "angular", "app"],
            esnext: true,
            globalstrict: true,
            globals: {}
          },
          files: ['../javascripts/**/*.js']
        },
        sass: {
          dist: {
            files: {
              '../styles/main.css': '../sass/main.scss'
            }
          }
        },
        watch: {
          options: {
            livereload: true,
          },
          sass: {
            files: ['../sass/**/*.scss'],
            tasks: ['sass']
          },
          javascripts: {
            files: ['../javascripts/**/*.js'],
            tasks: ['jshint']
          }
        },
        clean: {
          options: { force: true },
          public: ['../public']
        },
        copy: {
          dev: {
            files: [{
              expand: true,
              cwd: "../",
              src: [
                "index.html",                      
                "partials/*.html",
                "styles/**/*.css",
                "javascripts/**/*.js",
                "lib/node_modules/font-awesome/css/font-awesome.min.css",
                "vendor/font-awesome-4.7.0/css/font-awesome.min.css",
                "vendor/font-awesome-4.7.0/fonts/fontawesome-webfont.ttf",
                "vendor/font-awesome-4.7.0/fonts/fontawesome-webfont.woff",
                "vendor/font-awesome-4.7.0/fonts/fontawesome-webfont.woff2",
                "lib/node_modules/bootstrap/dist/css/bootstrap.min.css",
                "lib/node_modules/jquery/dist/jquery.min.js",
                "lib/node_modules/bootstrap/dist/js/bootstrap.min.js",
                "lib/node_modules/bootstrap-social/bootstrap-social.css",
                "lib/node_modules/angular/angular.min.js",
                "lib/node_modules/angular-animate/angular-animate.min.js",
                "lib/node_modules/angular-route/angular-route.min.js",
                "lib/node_modules/angular-sanitize/angular-sanitize.min.js",                            
                "lib/node_modules/angular-base64-upload/dist/angular-base64-upload.min.js",                            
                "lib/node_modules/angular-base64/angular-base64.min.js",                            
                "lib/node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf",
                "lib/node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.woff",
                "lib/node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2"
    
              ],
              dest: "../public/"
            }]
          }
        }
      });
    
      grunt.registerTask('default', ['jshint', 'sass', 'watch']);
      grunt.registerTask('deploy', ['sass', 'copy']);
      grunt.registerTask('cleanit', ['clean']);
    };