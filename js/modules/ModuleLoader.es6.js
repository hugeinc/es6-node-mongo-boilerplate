class ModuleLoader {
    constructor($, Utils, imports, views) {
        this._imports = imports;
        this._modulesLoaded = 0; //expose for testing

        let getModulesOnPage = function() {
            let _modules = [],
                _module;
            for (let i = 0; i < views.length; i++){
                _module = $(views[i]).data('module');
                _modules.push(_module);
            }
            return _modules;
        };

        this.instantiateModules = function(modules) {
            let _modulesOnPage = getModulesOnPage(),
                _module,
                _name,
                _loaded = [];

            for (let i = 0; i < modules.length; i++){
                _name = Object.create(modules[i]).prototype.name();
                if(_modulesOnPage.indexOf(_name) > -1
                    && _loaded.indexOf(_name) === -1){
                    _module = new modules[i]($, Utils);
                    _module.init();
                    _loaded.push(_name);
                    this._modulesLoaded++; //this is for testing
                }
            }
        };

		this.browserHandler = function() {
			var ua = navigator.userAgent.toLowerCase(),
			isAndroid = ua.indexOf("android") > -1,
			isIE9 = ua.indexOf("msie 9") > -1,
			isIE = ua.indexOf("msie") > -1 || ua.indexOf("trident") > -1;

			if(isAndroid) {
				document.body.className += ' android';
			}else if(isIE) {
				document.body.className += ' ie';
			}
		};
    }

    init() {
		this.browserHandler();
        this.instantiateModules(this._imports);
    }
}
export default ModuleLoader;
