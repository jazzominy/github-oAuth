(function init(window){

  let token = '';

  if(!window) {
    return;
  }

  window.addEventListener('load', onLoad.bind(window,window.location.search));
  
  function onLoad(query) {

    if(query.search("code") != -1) {
      let [,code] = query.match(/\?code=(.*)/);
      let [,state] = query.match(/state=(.*)/);
  
      if(code) {
        getAccessTokenFromApi(code,state);
      }
    }
  }

  function getAccessTokenFromApi(code,state) {
    let $result = axios.get("http://localhost:9000/github-code",{
      params: {
        code: code.substr(0, code.indexOf('&')),
      }
    })
    
    $result.then(resp => {
      console.log(`Access token -> `, resp);
      token = resp.data.access_token;
      getUserInfo();
    }).catch(err => {
      console.log(`Error occurred when getting access_token -> ${err}`)
    });
  }

  function getUserInfo() {
    let $result = axios.get('https://api.github.com/user',{
      headers: {
        Authorization: `token ${token}`
      }
    });

    $result.then(resp => {
      console.log('user info -> ', resp.data);
    })
  }
}(window))