'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('bower-component:src', function() {
    before(function(done) {
        helpers.run(path.join(__dirname, '../generators/src'))
            .withOptions({ skipInstall: true })
            .withPrompts({ someOption: true })
            .on('end', done);
    });

    it('creates files', function() {
        assert.file([
            'bower.json',
            'package.json'
        ]);
    });
});
