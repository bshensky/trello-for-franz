const path = require('path');
const {shell} = require('electron');

module.exports = (Franz, options) => {
  const looping = () => {

    // always redirect to notifications
    if(window.location.href.indexOf('notifications') === -1) {
      window.location.href = window.localStorage.initUrl;
    }

    // get unread messages
    const unread = $('.mod-unread').length;

    // set Franz badge
    Franz.setBadge(unread);
  };

  if(!window.localStorage.initUrl){
      window.localStorage.initUrl = window.location.href;
  }

  // open url's in browser
  $(document).on('click', 'a[href*="/"]', function(event) {
      event.preventDefault();
      shell.openExternal(this.href);
  });

  // inject franz.css stylesheet
  Franz.injectCSS(path.join(__dirname, 'css', 'franz.css'));

  // check for new messages every second and update Franz badge
  Franz.loop(looping);
};
