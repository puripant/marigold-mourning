window.onload = function() {
  var video = document.getElementById('video');
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');

  var bubbleNum = 100;
  var bubbleXs = [];
  var bubbleYs = [];
  for (var b = 0; b < bubbleNum; b++) {
    bubbleXs[b] = Math.random() * canvas.width;
    bubbleYs[b] = Math.random() * canvas.height;
  }
  var isInRect = function(x, y, rect) {
    return (x >= rect.x && x <= (rect.x + rect.width)) &&
           (y >= rect.y && y <= (rect.y + rect.height));
  }

  var tracker = new tracking.ObjectTracker('face');
  tracker.setInitialScale(4);
  tracker.setStepSize(2);
  tracker.setEdgesDensity(0.1);

  tracking.track('#video', tracker, { camera: true });

  tracker.on('track', function(event) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    event.data.forEach(function(rect) {
      context.strokeStyle = '#a64ceb';
      context.strokeRect(rect.x, rect.y, rect.width, rect.height);
      context.font = '11px Helvetica';
      context.fillStyle = "#fff";
      context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
      context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);

      //draw circle
      context.fillStyle = "#ff0";
      for (var b = 0; b < bubbleNum; b++) {
        while (isInRect(bubbleXs[b], bubbleYs[b], rect)) {
          bubbleXs[b] = Math.random() * canvas.width;
          bubbleYs[b] = Math.random() * canvas.height;
        }

        context.beginPath();
        context.arc(bubbleXs[b], bubbleYs[b], 10, 0, 2 * Math.PI);
        context.fill();
      }
      // for (var b = 0; b < bubbleNum; b++) {
      //   var bx, by;
      //   do {
      //     bx = Math.random() * canvas.width;
      //     by = Math.random() * canvas.height;
      //   } while (isInRect(bx, by, rect));
      //
      //   context.beginPath();
      //   context.arc(bx, by, 10, 0, 2 * Math.PI);
      //   context.fill();
      // }
    });
  });
};
