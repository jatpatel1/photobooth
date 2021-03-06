// Generated by CoffeeScript 1.7.1
(function() {
  var onMedia, photoDiv, running, showPhotos, socket;

  socket = io.connect('http://localhost:8000');

  running = false;

  photoDiv = document.getElementById('photo');

  showPhotos = function(photos) {
    var img;
    if (photos.length) {
      console.log('SHOWING PHOTO');
      img = photos[0];
      photoDiv.style.display = 'block';
      photoDiv.innerHTML = "<img src=\"" + img + "\"/>";
      return setTimeout(function() {
        return showPhotos(photos.slice(1));
      }, 5000);
    } else {
      return photoDiv.style.display = 'none';
    }
  };

  window.onkeypress = function(evt) {
    if (running) {
      return;
    }
    running = true;
    return socket.emit('photo');
  };

  socket.on('done', function(response) {
    running = false;
    return showPhotos(response);
  });

  socket.on('fail', function() {
    return running = false;
  });

  onMedia = function(stream) {
    var output, source;
    output = document.getElementsByTagName('video')[0];
    source = window.webkitURL.createObjectURL(stream);
    return output.src = source;
  };

  navigator.webkitGetUserMedia({
    video: true,
    audio: false
  }, onMedia, function() {});

}).call(this);
