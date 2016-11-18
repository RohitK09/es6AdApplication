
let utilService = {}

utilService.isDefined = jsonObj => {
    console.log('method called');
    if (jsonObj !== null && jsonObj !== undefined) {
        return true;
    }
    log.debug('found null, undefined at isDefined()' );
    return false;
};
module.exports = utilService;