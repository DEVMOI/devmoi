const decryptData = require('./decryptData');
const encryptData = require('./encryptData');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
export function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}
export function getCookie(cname) {
  var name = cname + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

export function delCookie(name) {
  setCookie(name, '', 0);
}

export async function checkCookie(props) {
  try {
    var user = getCookie('mmUser');
    if (user == '') {
      console.log('fdw',user,props)
      if (user != '' && user != null) {
        var hash = await bcrypt.hash(props, 8);
        bcrypt.hash(props, 8, function (err, hash) {
          console.log(hash)
        });
        setCookie('mmUser', hash, 0.015625);
      }
    }
  } catch (error) {
    console.log('error retrieving cookie', error);
  }
}
