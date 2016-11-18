

class Advertisement {

    constructor(name, format, impressions, startDate, endDate,advertHtml,isCalled) {
        this.name = name;
        this.format = format;
        this.impressions = impressions;
        this.startDate = new Date(startDate);
        this.endDate = new Date(endDate);
        this.advertHtml = advertHtml;
        this.isCalled = false||isCalled;
    }



}
module.exports = Advertisement;