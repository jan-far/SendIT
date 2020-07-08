const API_URL = getHostUrl();

function getHostUrl(){
    if (window.location.host.indexOf('localhost')){
        return 'http://localhost:3000';
    }
    else{
        return `404`
    }
}