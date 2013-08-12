
$(window).bind('hashchange', function(){
  updateWindow();
});

function updateWindow() {
  // $(currentHash).animate({opacity: 0, height: 'toggle'});
  swapHash();
  if (window.location.hash == '#Projects'){
    $(currentHash).load('templates/projects.html', function() {
      custFadeIn();
    });
  } else if (window.location.hash == '#About'){
    $(currentHash).load('templates/about.html', function() {
      custFadeIn();
    });
  } else {
    $(currentHash).load('templates/main.html', function() {
      custFadeIn();
      $('.awesome').delay(delay*2 + 1000).animate({
        opacity:1,
        'padding-bottom': '+=27px'
      }, 1000);
      $('.stuff').delay(delay*2 + 1000).animate({'padding-top': '-=27px'}, 1000);
    });
  }
}

var delay = 200;

function custFadeIn(){
  // $(function () {
    $(otherHash).animate({opacity: 0, height: 'toggle'}, delay, 'linear');
    // $(otherHash).animate({opacity: 0}, 5000, 'linear');
    $(currentHash).animate({height: 'toggle'}, delay, 'linear');
    // $(currentHash).animate({opacity: 1}, 5000, 'linear');
  // });
  $(currentHash).delay(delay).animate({opacity: 1}, delay, 'linear');

  //Fixes bug on certain screen sizes by forcing overflow to hidden at end of transmission
  setTimeout(function() {
    $(currentHash).css({overflow: 'initial'});
    $(otherHash).css({overflow: 'initial'});
  }, delay*2);
}

var currentHash = '#mainBody'
var otherHash = '#mainBody2'

function swapHash() {
  var temp = otherHash;
  otherHash = currentHash;
  currentHash = temp;
}
$(window).load(function(){
  $(otherHash).hide();
  $(currentHash).css({display: 'block'});
  updateWindow();
})
