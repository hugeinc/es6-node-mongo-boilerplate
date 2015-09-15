import $ from '../js/lib/jquery-1.11.2.min';
import ModuleLoader from '../js/modules/ModuleLoader.es6';
import Utils from '../js/modules/Utils.es6';
import Sample from '../js/modules/Sample.es6';


describe('ModuleLoader', function(){
	let _module,
		modules = [Sample],
		page;

	fixture.setBase('spec/fixtures');

	beforeEach( () => {
		page = fixture.load('sample.html');
		_module = new ModuleLoader($, Utils, modules, $j(page).find('[data-module]'));
		_module.init();
	});

	it('should load all modules on the page', () => {
		expect(_module._modulesLoaded).toEqual(modules.length);
		expect(_module._modulesLoaded).toEqual($j(page).find('[data-module]').length);
	});

});
