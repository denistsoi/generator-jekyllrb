// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>. Yo Jekyll!
'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};
var yeomanConfig = {
  app: 'app',
  dist: 'dist',
  css: '<%= cssDir %>',<% if (cssPre) { %>
  cssPre: '<%= cssPreDir %>',<% } %>
  js: '<%= jsDir %>',<% if (jsPre) { %>
  jsPre: '<%= jsPreDir %>',<% } %>
  img: '<%= imgDir %>',
  fonts: '<%= fontsDir %>'
};

module.exports = function (grunt) {

  // Configuration
  grunt.initConfig({
    yeoman: yeomanConfig,

    watch: {<% if (cssPre === 'sass') { %>
      sass: {
        files: ['<%%= yeoman.app %>/<%%= yeoman.cssPre %>/**/*.{scss,sass}'],
        tasks: ['sass:server']
      },<% } %><% if (cssPre === 'compass') { %>
      compass: {
        files: ['<%%= yeoman.app %>/<%%= yeoman.cssPre %>/**/*.{scss,sass}'],
        tasks: ['compass:server']
      },<% } %><% if (jsPre === 'coffeescript') { %>
      coffee: {
        files: ['<%%= yeoman.app %>/<%%= yeoman.jsPre %>/**/*.coffee'],
        tasks: ['coffee:server']
      },
      coffeeTest: {
        files: ['test/spec/**/*.coffee'],
        tasks: ['coffee:test']
      },<% } %>
      jekyll: {
        files: ['<%%= yeoman.app %>/**/*.{html,yml,md,mkd,markdown}',
                '!<%%= yeoman.app %>/{<% if (cssPre) { %><%%= yeoman.cssPre %>,<% } %><% if (jsPre) { %><%%= yeoman.jsPre %>,<% } %>_plugins}'],
        tasks: ['jekyll:server']
      },
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: [
          '.jekyll/**/*.html',
          '{.tmp,<%%= yeoman.app %>}/<%%= yeoman.css %>/**/*.css',
          '{.tmp,<%%= yeoman.app %>}/<%%= js %>/**/*.js',
          '<%%= yeoman.app %>/<%%= yeoman.img %>/**/*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },
    connect: {
      options: {
        port: 9000,
        // Change hostname to null to access the server from outside.
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
            lrSnippet,
            mountFolder(connect, '.tmp'),
            mountFolder(connect, '.jekyll'),
            mountFolder(connect, yeomanConfig.app)];
          }
        }
      },
      test: {
        options: {
          middleware: function (connect) {
            return [
            mountFolder(connect, '.tmp'),
            mountFolder(connect, 'test')];
          }
        }
      },
      dist: {
        options: {
          middleware: function (connect) {
            return [
            mountFolder(connect, yeomanConfig.dist)];
          }
        }
      }
    },
    open: {
      server: {
        path: 'http://localhost:<%%= connect.options.port %>'
      }
    },
    // Running Jekyll also cleans all non-git files from its destination,
    // unless specifically declared in _config.yml's `keep_files`
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%%= yeoman.dist %>/*',
            '!<%%= yeoman.dist %>/.git*']
        }]
      },
      server: ['.tmp', '.jekyll']
    },<% if (cssPre === 'sass') { %>
    // Add the sass files you want to compile in this task.
    // TODO: Revise to watch default directories when
    // https://github.com/gruntjs/grunt-contrib-sass/issues/40 is resolved.
    sass: {
      options: {
        bundleExec: true,
        style: 'expanded',
        debugInfo: true,
        lineNumbers: true,
        loadPath: 'app/bower_components'
      },
      dist: {
        options: {
          debugInfo: false,
          lineNumbers: false
        },
        // RWRW tailor for templates
        files: {
          '<%%= yeoman.dist %>/<%%= yeoman.css %>/main.css': '<%%= yeoman.app %>/<%%= yeoman.cssPre %>/main.scss',
          '<%%= yeoman.dist %>/<%%= yeoman.css %>/syntax.css': '<%%= yeoman.app %>/<%%= yeoman.cssPre %>/syntax.scss'
        }
      },
      server: {
        files: {
          '.tmp/<%%= yeoman.css %>/main.css': '<%%= yeoman.app %>/<%%= yeoman.cssPre %>/main.scss',
          '.tmp/<%%= yeoman.css %>/syntax.css': '<%%= yeoman.app %>/<%%= yeoman.cssPre %>/syntax.scss'
        }
      }
    },<% } %><% if (cssPre === 'compass') { %>
    compass: {
      options: {
        // require: ['singularity', 'jacket'],
        bundleExec: true,
        sassDir: '<%%= yeoman.app %>/<%%= yeoman.cssPre %>',
        imagesDir: '<%%= yeoman.app %>/<%%= yeoman.img %>',
        fontsDir: '<%%= yeoman.app %>/<%%= yeoman.fonts %>',
        javascriptsDir: '<%%= yeoman.app %>/<%%= yeoman.js %>',
        relativeAssets: false,
        httpImagesPath: '/<%%= yeoman.img %>',
        httpGeneratedImagesPath: '/<%%= yeoman.img %>/generated',
        outputStyle: 'expanded',
        raw: 'asset_cache_buster :none \nextensions_dir = "<%%= yeoman.app %>/bower_components"\n'
      },
      dist: {
        options: {
          cssDir: '<%%= yeoman.dist %>/<%%= yeoman.css %>',
          generatedImagesDir: '<%%= yeoman.dist %>/<%%= yeoman.img %>/generated'
        }
      },
      server: {
        options: {
          debugInfo: true,
          cssDir: '.tmp/<%%= yeoman.css %>',
          generatedImagesDir: '.tmp/<%%= yeoman.img %>/generated'
        }
      }
    },<% } %><% if (jsPre === 'coffeescript') { %>
    coffee: {
      test: {
        files: [{
          expand: true,
          cwd: 'test/spec',
          src: '**/*.coffee',
          dest: '.tmp/spec',
          ext: '.js'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/<%%= yeoman.jsPre %>',
          src: '**/*.coffee',
          dest: '<%%= yeoman.dist %>/<%%= yeoman.js %>',
          ext: '.js'
        }]
      },
      server: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/<%%= yeoman.jsPre %>',
          src: '**/*.coffee',
          dest: '.tmp/<%%= yeoman.js %>',
          ext: '.js'
        }]
      },
    },<% } %>
    jekyll: {
      // TODO: switch config to options style after
      // https://github.com/dannygarcia/grunt-jekyll/pull/14
      dist: {
        bundleExec: true,
        src : '<%%= yeoman.app %>',
        dest: '<%%= yeoman.dist %>',
        server : false,
        auto : false,
        config: '_config.yml,_config.build.yml'
      },
      server: {
        bundleExec: true,
        src : '<%%= yeoman.app %>',
        dest: '.jekyll',
        server : false,
        auto : false,
        config: '_config.yml'
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '{.tmp,<%%= yeoman.app %>}/<%%= yeoman.js %>/**/*.js',
        '!<%%= yeoman.app %>/<%%= yeoman.js %>/vendor/**/*',
        'test/spec/**/*.js'],
      report: [
        '{.tmp,<%%= yeoman.app %>}/<%%= yeoman.js %>/**/*.js',
        '!<%%= yeoman.app %>/<%%= yeoman.js %>/vendor/**/*']
    },
    // TODO: rewrite for globbing and bundleExec when 5.0 is released
    csscss: {
      options: {
        minMatch: 2,<% if (cssPre === 'compass' || cssPre === 'sass') { %>
        ignoreSassMixins: false,<% } %><% if (cssPre === 'compass') { %>
        compass: true,<% } %><% if (!cssPre) { %>
        showParserErrors: true,<% } %>
        colorize: true,
        shorthand: false,
        verbose: true
      },
      // Check files manually here until we can glob with 5.0
      report: {<% if (!cssPre) { %>
       src: ['<%%= yeoman.app %>/<%%= yeoman.css %>/main.css']<% } %><% if (cssPre === 'compass' || cssPre === 'sass') { %>
       src: ['<%%= yeoman.app %>/<%%= yeoman.cssPre %>/main.scss']<% } %>
      }
    },
    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      report: {
        src: ['{.tmp,<%%= yeoman.app %>}/<%%= yeoman.css %>/**/*.css']
      }
    },
    // Note that useminPrepare will only scan one page for usemin blocks. If
    // you have usemin blocks that aren't used in index.html, create a usemin
    // manifest page (hackery!) and point the task there.
    useminPrepare: {
      options: {
        dest: '<%%= yeoman.dist %>'
      },
      html: '<%%= yeoman.dist %>/index.html'
    },
    usemin: {
      options: {
          basedir: '<%%= yeoman.dist %>',
          dirs: ['<%%= yeoman.dist %>/**/*']
      },
      html: ['<%%= yeoman.dist %>/**/*.html'],
      css: ['<%%= yeoman.dist %>/<%%= yeoman.css %>/**/*.css']
    },
    // usemin runs concat, but this is left here if you need it
    /* concat: {
      dist: {}
    },*/
    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%%= yeoman.dist %>',
          src: '**/*.html',
          dest: '<%%= yeoman.dist %>'
        }]
      }
    },
    cssmin: {
      dist: {
        options: {
          // banner: '/* See more of my projects at github.com/<%= github %> */',
          report: 'gzip'
        },
        files: {
          '<%%= yeoman.dist %>/<%%= yeoman.css %>/main.css': [
            '.tmp/<%%= yeoman.css %>/{,*/}*.css',
            '<%%= yeoman.app %>/<%%= yeoman.css %>/{,*/}*.css']
        }
      }
    },
    uglify: {},
    imagemin: {
      dist: {
        options: {
          progressive: true
        },
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>',
          src: ['*.png', '<%%= yeoman.img %>/**/*.{png,jpg,jpeg}'],
          dest: '<%%= yeoman.dist %>'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/<%%= yeoman.img %>',
          src: '**/*.svg',
          dest: '<%%= yeoman.dist %>/<%%= yeoman.img %>'
        }]
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%%= yeoman.app %>',
          dest: '<%%= yeoman.dist %>',
          src: [
            // Jekyll moves all html and text files
            // Copy and *min tasks transport image files and asset drectories
            // If your site requires it, add other file type patterns here
            '**/*.{gif,ico,webp}',
            '<%%= yeoman.css %>',
            '<%%= yeoman.js %>',
            '<%%= yeoman.img %>',
            '<%%= yeoman.fonts %>']
        }]
      }
    },
    rev: {
      options: {
        length: 4
      },
      dist: {
        files: {
          src: [
            '<%%= yeoman.dist %>/<%%= yeoman.js %>/**/*.js',
            '<%%= yeoman.dist %>/<%%= yeoman.css %>/**/*.css',
            '<%%= yeoman.dist %>/<%%= yeoman.img %>/**/*.{png,jpg,jpeg,gif,webp,svg}',
            '<%%= yeoman.dist %>/<%%= yeoman.fonts %>/**/*.{eot*,woff,ttf,svg}']
        }
      }
    },
    concurrent: {
      server: [<% if (cssPre === 'sass') { %>
        'sass:server'<% } %><% if (cssPre === 'compass') { %>
        'compass:server'<% } %><% if (cssPre && jsPre) { %>,<% } %><% if (jsPre === 'coffee') { %>
        'coffee:server'<% } %>
      ],
      dist: [<% if (cssPre === 'sass') { %>
        'sass:dist',<% } %><% if (cssPre === 'compass') { %>
        'compass:dist',<% } %><% if (jsPre === 'coffee') { %>
        'coffee:dist',<% } %>
        'imagemin',
        'svgmin'
      ]
    }
  });

  // Load plugins
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Define Tasks
  grunt.registerTask('server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      // Jekyll cleans its destination before it compiles, so must run first
      'jekyll:server',
      'concurrent:server',
      'connect:livereload',
      'open',
      'watch']);
  });

  // No real tests yet. Add your own.
  // grunt.registerTask('test', [
  //   'clean:server',
  //   'concurrent:test',
  //   'connect:test']);

  grunt.registerTask('report', [
    'concurrent:server',
    'jshint:report',
    'csscss:report',
    'csslint:report'
    ]);

  grunt.registerTask('build', [
    'clean:dist',
    // Jekyll cleans its destination before it compiles, so must run first
    'jekyll:dist',
    'copy:dist',
    'concurrent:dist',
    'useminPrepare',
    'concat',
    'cssmin',
    'uglify',
    'rev',
    'usemin',
    'htmlmin'
    ]);

  grunt.registerTask('default', [
    'report',
    'build']);
};
