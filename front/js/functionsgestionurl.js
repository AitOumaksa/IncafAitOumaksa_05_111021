//prend en argument une variable de l'url et retourne sa valeur
/**
*recupérer la 
*/
function getUrlParamValue(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
    
}


