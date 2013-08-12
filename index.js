/*
 * Skeenan.com Javasript sheet
 *
 * This loads the content for the page with an animation
 * it also animates the home page
 *
 * author: Sean Keenan, sean@skeenan.com
 *
**/

// The delay in ms of the toggle (twice this for the full swap and fade in)
var delay = 200;

// Keep track of the two bodies, which one is being shown and which is hidden
// We load content into the hidden one, then fade the two out over one another
var currentHash = '#mainBody'
var otherHash = '#mainBody2'

// Tricky way to swap the hashes without a temp variable
function swapHash() {
  otherHash = [currentHash, currentHash = otherHash][0];
}

// Whenever the hash changes load the new conent and animate it
$(window).bind('hashchange', updateWindow);

// First swap the hashes, then load the appropriate template and fade it in
function updateWindow() {
  swapHash();
  if (window.location.hash == '#Projects'){
    $(currentHash).load('templates/projects.html', custFadeIn);
  } else if (window.location.hash == '#About'){
    $(currentHash).load('templates/about.html', custFadeIn);
  } else {
    $(currentHash).load('templates/main.html', function() {
        custFadeIn();
        homeAwesomeAnimation();
      });
  }
}

// Toggle the old/new content and fade in the new content
function custFadeIn(){
  $(otherHash).animate({opacity: 0, height: 'toggle'}, delay, 'linear');
  $(currentHash).animate({height: 'toggle'}, delay, 'linear');

  $(currentHash).delay(delay).animate({opacity: 1}, delay, 'linear');

  // Fixes bug on certain screen sizes by forcing overflow to hidden 
  // at end of transmission
  setTimeout(function() {
    $(currentHash).css({overflow: 'initial'});
    $(otherHash).css({overflow: 'initial'});
  }, delay*2);
}

// The homepage "awesome" animation
function homeAwesomeAnimation(){
  $('#awesome').delay(delay*2 + 1000).animate(
                               {opacity:1,'padding-bottom': '+=27px'}, 1000);
  $('#stuff').delay(delay*2 + 1000).animate({'padding-top': '-=27px'}, 1000);
}

// On page load configure the two bodies and update based on the current page
$(window).load(function(){
  $(otherHash).hide();
  $(currentHash).css({display: 'block'});
  updateWindow();
})
