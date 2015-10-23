class Sample {
	constructor($, Utils) {
		let utils = new Utils();

		let constants = {
			apiUrl: '/api/url'
		};

		let selectors = {
			wrapper: '.sample',
			button: '.button'
		};

		let objects = {
			wrapper: $(selectors.wrapper),
			button: $(selectors.button)
		};

		let apiResponseHandler = function(res) {
			//res = JSON.parse(res);
			//do something with api response
		};

		let buttonClickHandler = function(e) {
			var params = {};
			//utils.loadUrl(constants.apiUrl, 'POST', params, true, apiResponseHandler);
			objects.wrapper.append('It works!');
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
