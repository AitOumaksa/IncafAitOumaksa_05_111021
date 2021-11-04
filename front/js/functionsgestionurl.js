/**
 * recupére la valeur d'une variable dans L'url de la page en cours
 * @param {String} param 
 * @return {String} urlParams.get(param)
 */
function getUrlParamValue(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
    
}


