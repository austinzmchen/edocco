(function() {
    var docco = require('docco');
    var _ref = require('child_process'), exec = _ref.exec;
    var fs = require('fs');
    var path = require('path');

    var run = function(args) {
        docco.run(args, function(){
            // copy resource to docs folder
            var outputDir = this.output;
            var sourceDir = __dirname + "/resources/";
            exec("cp -fR " + sourceDir + "css" + " " + outputDir);
            exec("cp -fR " + sourceDir + "img" + " " + outputDir);
            exec("cp -fR " + sourceDir + "js" + " " + outputDir);

            var outputFile = path.join(outputDir, path.basename(this.source, path.extname(this.source)) + '.html')
            var fileContent = fs.readFileSync(outputFile).toString();
            fileContent = fileContent.replace('<link rel="stylesheet" media="all" href="docco.css" />',
                '<!--include js library-->' +
                '<script src="js/lib/jquery-1.8.3.js"></script>' +
                '<!--main app-->' +
                '<script src="js/app.js"></script>');
            fs.writeFileSync(outputFile, fileContent);
        });
    };

    var version = JSON.parse(fs.readFileSync("" + __dirname + "/package.json")).version;

    var edocco = module.exports = {
        run: run,
        version: version
    };

}).call(this)