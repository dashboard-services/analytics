module.exports = function( grunt ){
  grunt.initConfig({

		browserify: {
			options: {
				transform: [ require('grunt-react').browserify ]
			},
			app: {
				src: 'client/js/main.js',
				dest: 'client/js/main.dist.js'
			}
		},

    connect: {
      server: {
        options: {
          port: 3000,
          base: 'client',
          livereload: true
        }
      }
    },

		watch: {
      js: {
        files: ['client/**/**/*.js', 'client/**/*.js', '!client/js/main.dist.js'],
        tasks: ['browserify']
      },
      livereload: {
        options: {
          livereload: true
        },
        files: [
          'client/**/**/*.js',
          'client/**/*.js',
          'client/css/*.css',
          '!client/js/main.dist.js',
          'client/index.html'
        ]
      }

		}
  });

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask( 'dev', ['browserify', 'connect', 'watch'] );
	grunt.registerTask('default', ['browserify']);
};
