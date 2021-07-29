module.exports = function (grunt) {
    require('time-grunt')(grunt);
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin'
    });
    grunt.initConfig({
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'styles',
                    src: ['*.scss'],
                    dest: 'styles',
                    ext: '.css'
                }]
            }
        },
        watch: {
            scripts: {
                files: ['styles/*.scss'],
                tasks: ['css'],
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'styles/*.css',
                        '*.html',
                        'js/*.js'
                    ]
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: "./"
                    }
                }
            }
        },
        imagemin: {

            dynamic: {
                files: [{
                    expand: true,
                    cwd: './',
                    src: 'images/*.{png,gif,jpg,jpeg}',
                    dest: 'dist/images'
                }]
            }
        },
        copy: {
            html: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: './',
                    src: '*.html',
                    dest: 'dist'
                }]
            },
            main: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: './',
                    src: 'fonts/*',
                    dest: 'dist'
                }]
            }
        },
        clean: {
            build: {
                src: ['dist/']
            }
        },
        cssmin: {
            dist: {}
        },
        htmlmin: {                                     // Task
           
            dev: {  
                options: {                                 // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },                                     // Another target
                files: [{
                    expand: true,
                    cwd: './dist',
                    src: '*.html',
                    dest: 'dist'
                }]
            }
        },
        uglify: {
            dist: {}
        },
        filerev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 20
            },
            release: {
                files: [{
                    src: [
                        'dist/js/*.js',
                        'dist/css/*.css'
                    ]
                }]
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {}
        },
        useminPrepare: {
            foo: {
                dest: 'dist',
                src: ['index.html', 'about.html', 'prices.html', 'contact.html']
            },
            options: {
                flow: {
                    steps: {
                        css: ['cssmin'],
                        js: ['uglify']
                    },
                    post: {
                        css: [{
                            name: 'cssmin',
                            createConfig: function (context, block) {
                                var generated = context.options.generated;
                                generated.options = {
                                    keepSpecialComments: 0,
                                    rebase: false
                                }
                            }
                        }]
                    }
                }
            }
        },
        usemin: {
            html: ['dist/index.html', 'dist/about.html', 'dist/prices.html', 'dist/contact.html'],
            options: {
                assetsDir: ['dist', 'dist/css', 'dist/js']
            }
        }
    });

    grunt.registerTask('css', ['sass']);
    grunt.registerTask('default', ['browserSync', 'watch']);
    grunt.registerTask('img:compress', ['imagemin']);
    grunt.registerTask('build', [
        'clean',
        'copy',
        'imagemin',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin'
    ]);
}