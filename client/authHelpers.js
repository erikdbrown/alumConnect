
module.exports = {
  login(email, password) {

/*    MAKE API CALL HERE
    MAKE API CALL HERE
    MAKE API CALL HERE*/
    
    //ON SUCCESS TOKENIZE
    //localStorage.setItem('jwtAlum', jwtAlum);

  },

  getToken() {
    return localStorage.getItem('jwtAlum');
  },

  logout() {
    localStorage.removeItem('jwtAlum');

    //redirect home
  },

  loggedIn() {
    return !!localStorage.getItem('jwtAlum');
  },

  onChange() {},

  parseJwt(){
    if(localStorage.getItem('jwtAlum') !== null) {
      return JSON.parse(atob(localStorage.getItem('jwtAlum').split('.')[1]));
    } else {
      return null;
    }
  }


}
 