// Code goes here

var cookie_mgmt = (function() {
  return {
    options: {
      load_cookies: true,
      privacy_url: 'http://www.garanteprivacy.it/web/guest/home/docweb/-/docweb-display/docweb/2142939'
    },
    supportsHtml5Storage: function() {
      try {
        return 'localStorage' in window && window['localStorage'] !== null;
      } catch (e) {
        return false;
      }
    },
    getCookie: function(sKey) {
      if (!sKey) {
        return null;
      }
      return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    },
    setCookie: function(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
      if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
        return false;
      }
      var sExpires = "";
      if (vEnd) {
        switch (vEnd.constructor) {
          case Number:
            sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
            break;
          case String:
            sExpires = "; expires=" + vEnd;
            break;
          case Date:
            sExpires = "; expires=" + vEnd.toUTCString();
            break;
        }
      }
      document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
      return true;
    },
    allowCookies: function(e) {
      e.stopPropagation();
      e.preventDefault();
      
      cookie_mgmt.supportsHtml5Storage() ? localStorage.setItem('load-cookies', false) : cookie_mgmt.setCookie('load-cookies', false, Infinity, '/', '', false);

      if (e.type == 'click') {
        if(e.target.className == 'cookie-mgmt-container') {
          return;
        }
        if (e.target.nodeName == 'A') {
          location.href = e.target.href;
          return;
        }
      }

      location.reload();
    },
    showBanner: function() {
      var _cookie_container = document.createElement('div');
      var _cookie_text_bef = document.createTextNode('Su questo sito utilizziamo cookie tecnici e, previo tuo consenso, cookie di profilazione, nostri e di terze parti, per proporti pubblicità in linea con le tue preferenze. Se vuoi saperne di più ');
      var _cookie_text_aft = document.createTextNode('. Cliccando in un punto qualsiasi dello schermo, effettuando un’azione di scroll o chiudendo questo banner, invece, presti il consenso all’uso di tutti i cookie.');
      var _cookie_privacy_link = document.createElement('a');
      var _cookie_agree_link = document.createElement('button');

      _cookie_container.className = 'cookie-mgmt-container';
      _cookie_privacy_link.href = 'http://www.google.com';
      _cookie_privacy_link.innerText = 'clicca qui';
      _cookie_agree_link.innerText = 'OK';

      _cookie_container.appendChild(_cookie_text_bef);
      _cookie_container.appendChild(_cookie_privacy_link);
      _cookie_container.appendChild(_cookie_text_aft);
      _cookie_container.appendChild(_cookie_agree_link);
      document.body.appendChild(_cookie_container);
    },
    init: function() {
      if (this.options.load_cookies) {
        return;
      }

      window.addEventListener('click', this.allowCookies);
      window.addEventListener('scroll', this.allowCookies);

      this.showBanner();
    }
  }
})();

cookie_mgmt.options.load_cookies = cookie_mgmt.supportsHtml5Storage() ? localStorage.getItem('load-cookies') : cookie_mgmt.getCookie('load-cookies');
//cookie_mgmt.options.load_cookies = cookie_mgmt.getCookie('load_cookies');