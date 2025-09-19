module.exports = function(grunt) {
    // Configuração do projeto
    grunt.initConfig({
        // Configurações do projeto
        pkg: grunt.file.readJSON('package.json'),
        
        // Limpeza de arquivos
        clean: {
            build: {
                src: ['css/', 'dist/']
            }
        },
        
        // Compilação LESS
        less: {
            development: {
                options: {
                    compress: false,
                    sourceMap: true,
                    sourceMapFilename: 'css/estilo.css.map',
                    sourceMapURL: 'estilo.css.map'
                },
                files: {
                    'css/estilo.css': 'less/estilo.less'
                }
            },
            production: {
                options: {
                    compress: true,
                    cleancss: true,
                    sourceMap: false
                },
                files: {
                    'css/estilo.min.css': 'less/estilo.less'
                }
            }
        },
        
        // Minificação de CSS
        cssmin: {
            target: {
                files: {
                    'css/estilo.min.css': ['css/estilo.css']
                }
            }
        },
        
        // Minificação de JavaScript
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                compress: {
                    drop_console: true,
                    drop_debugger: true
                },
                mangle: true,
                sourceMap: true
            },
            build: {
                files: {
                    'js/script.min.js': ['js/script.js']
                }
            }
        },
        
        // Minificação de HTML
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                    minifyJS: true,
                    minifyCSS: true
                },
                files: {
                    'dist/index.html': 'index.prod.html'
                }
            }
        },
        
        // Cópia de arquivos
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        src: ['css/*.min.css', 'js/*.min.js'],
                        dest: 'dist/',
                        flatten: true
                    },
                    {
                        expand: true,
                        src: ['index.prod.html'],
                        dest: 'dist/',
                        rename: function(dest, src) {
                            return dest + 'index.html';
                        }
                    }
                ]
            }
        },
        
        // Watch para desenvolvimento
        watch: {
            less: {
                files: ['less/**/*.less'],
                tasks: ['less:development'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['js/script.js'],
                tasks: ['uglify:build'],
                options: {
                    livereload: true
                }
            },
            html: {
                files: ['*.html'],
                options: {
                    livereload: true
                }
            }
        },
        
        // Servidor de desenvolvimento
        connect: {
            server: {
                options: {
                    port: 8080,
                    base: '.',
                    livereload: true,
                    open: {
                        target: 'http://localhost:8080'
                    }
                }
            }
        }
    });

    // Carregar plugins
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // Registrar tarefas personalizadas
    
    // Tarefa de desenvolvimento
    grunt.registerTask('dev', [
        'clean:build',
        'less:development',
        'uglify:build',
        'connect:server',
        'watch'
    ]);
    
    // Tarefa de build para produção
    grunt.registerTask('build', [
        'clean:build',
        'less:production',
        'uglify:build',
        'htmlmin:dist',
        'copy:main'
    ]);
    
    // Tarefa padrão (build completo)
    grunt.registerTask('default', [
        'clean:build',
        'less:production',
        'uglify:build'
    ]);
    
    // Tarefa rápida (apenas compilação)
    grunt.registerTask('compile', [
        'less:development',
        'uglify:build'
    ]);
    
    // Tarefa de minificação completa
    grunt.registerTask('minify', [
        'less:production',
        'cssmin',
        'uglify:build',
        'htmlmin:dist'
    ]);
    
    // Tarefa de deploy
    grunt.registerTask('deploy', [
        'build',
        'copy:main'
    ]);

    // Log de informações
    grunt.registerTask('info', function() {
        grunt.log.writeln('');
        grunt.log.writeln('🎲 Sorteador de Números - Grunt Build System');
        grunt.log.writeln('==========================================');
        grunt.log.writeln('');
        grunt.log.writeln('Comandos disponíveis:');
        grunt.log.writeln('  grunt           - Build completo (LESS + JS minificado)');
        grunt.log.writeln('  grunt dev       - Modo desenvolvimento com watch e servidor');
        grunt.log.writeln('  grunt build     - Build para produção');
        grunt.log.writeln('  grunt compile   - Compilação rápida');
        grunt.log.writeln('  grunt minify    - Minificação completa');
        grunt.log.writeln('  grunt deploy    - Build + cópia para dist/');
        grunt.log.writeln('  grunt info      - Exibir esta mensagem');
        grunt.log.writeln('');
        grunt.log.writeln('Arquivos gerados:');
        grunt.log.writeln('  css/estilo.min.css  - CSS compilado e minificado');
        grunt.log.writeln('  js/script.min.js    - JavaScript minificado');
        grunt.log.writeln('');
    });
};
