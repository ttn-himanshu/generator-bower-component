'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
    //Configurations will be loaded here.
    //Ask for user input
    prompting: function() {
        var done = this.async();
        this.prompt({
            type: 'input',
            name: 'name',
            message: 'Your project name',
            //Defaults to the project's folder name if the input is skipped
            default: this.appname
        }, function(answers) {
            this.props = answers;
            this.log(answers.name);
            done();
        }.bind(this));
    },
    //Writing Logic here
    writing: {
        //Copy the configuration files
        config: function() {
            this.fs.copyTpl(
                this.templatePath('_package.json'),
                this.destinationPath('package.json'), {
                    name: this.props.name
                }
            );
            this.fs.copyTpl(
                this.templatePath('_bower.json'),
                this.destinationPath('bower.json'), {
                    name: this.props.name
                }
            );
            this.fs.copy(
                this.templatePath('_Gruntfile.js'),
                this.destinationPath('Gruntfile.js')
            );
            this.fs.copy(
                this.templatePath('_README.md'),
                this.destinationPath('README.md')
            );
            this.fs.copy(
                this.templatePath('_gitignore'),
                this.destinationPath('.gitignore')
            );
            this.fs.copy(
                this.templatePath('_karma.conf.js'),
                this.destinationPath('karma.conf.js')
            );
        },

        //Copy application files
        app: function() {
            // Views
            this.fs.copyTpl(
                this.templatePath('_public/_index.html'),
                this.destinationPath('src/index.html'), {
                    name: this.props.name
                }
            );

            this.fs.copy(
                this.templatePath('_public/_scripts/_app.js'),
                this.destinationPath('src/scripts/app.js')
            );
        }
    },
    install: function() {
        this.installDependencies();
    }
});
