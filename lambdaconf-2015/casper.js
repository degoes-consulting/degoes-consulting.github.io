var casper = require('casper').create({
    verbose: true,
    logLevel: 'debug',
    viewportSize: {width: 800, height: 800}
});

casper.start('http://www.degoesconsulting.com/lambdaconf-2015/index.html');

casper.then(function() {
  function captureSplash(id) {
    
  }

  function captureAllSplashes(ids) {
    if (ids.length == 0) return;
    else {
      var head = ids[0];
      var tail = ids.slice(1);

      casper.open('http://www.degoesconsulting.com/lambdaconf-2015/index.html#' + head);

      casper.then(function() {
        casper.wait(1000, function() {
          casper.captureSelector('lambdaconf2015-' + head + '.png', '#' + head);

          casper.then(function() {
            captureAllSplashes(tail);
          });
        });
      });
    }
  }

  captureAllSplashes(casper.evaluate(function() {
    var ids = [];

    var nodes = document.querySelectorAll('section.modal');

    for (var i = 0; i < nodes.length; i++) {
      ids.push(nodes[i].id);
    }

    return ids;
  }));
});

casper.run();