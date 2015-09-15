class Sample {
	constructor($, Utils) {
		let utils = new Utils();

		let constants = {
			apiUrl: '/api/url'
		};

		let selectors = {
			button: '.button'
		};

		let objects = {
			button: $(selectors.button)
		};

		let apiResponseHandler = function(res) {
			res = JSON.parse(res);
			//do something with api response
		};

		let buttonClickHandler = function(e) {
			params = {};
			utils.loadUrl(constants.apiUrl, 'POST', params, true, apiResponseHandler);
		};

		this.start = function() {
			objects.button.on('click', buttonClickHandler);
			console.log('Sample controller loaded');
		};
	}

	name() {
		return "Sample";
	}

	init() {
		this.start();
	}
}
export default Sample;
