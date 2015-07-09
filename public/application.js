'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config([
	'$locationProvider', '$mdThemingProvider', '$mdIconProvider',
	function($locationProvider, $mdThemingProvider, $mdIconProvider) {
		//$locationProvider.html5Mode(true).hashPrefix('!');

		$mdThemingProvider.theme('default')
			.primaryPalette('indigo', {
				'default': '500', // by default use shade 400 from the pink palette for primary intentions
				'hue-1': '50', // use shade 100 for the <code>md-hue-1</code> class
				'hue-2': '100', // use shade 600 for the <code>md-hue-2</code> class
				'hue-3': '300' // use shade A100 for the <code>md-hue-3</code> class
			})
			// If you specify less than all of the keys, it will inherit from the
			// default shades
			.accentPalette('orange', {
				'default': 'A400', // use shade 200 for default, and keep all other shades the same
				'hue-1': 'A100',
				'hue-2': 'A400'
			})
			.backgroundPalette('light-blue', {
				'default': '50'
			});

		// Register the user `avatar` icons
		$mdIconProvider
			.defaultIconSet('./assets/svg/avatars.svg', 128)
			.icon('menu'       , '/modules/core/img/icons/ic_menu_white_48px.svg' , 48)
			.icon('share'      , './assets/svg/share.svg'       , 24)
			.icon('google_plus', './assets/svg/google_plus.svg' , 512)
			.icon('hangouts'   , './assets/svg/hangouts.svg'    , 512)
			.icon('twitter'    , './assets/svg/twitter.svg'     , 512)
			.icon('phone'      , './assets/svg/phone.svg'       , 512)
			.icon('black-book', '/modules/core/img/icons/ic_book_black_48px.svg', 48)
			.icon('time',		'/modules/core/img/icons/ic_access_time_black_48px.svg', 48)
			.icon('user', 		'/modules/core/img/icons/ic_person_black_48px.svg', 48)
			.icon('lock', 		'/modules/core/img/icons/ic_lock_black_48px.svg', 48)
			.icon('email', 		'/modules/core/img/icons/ic_email_black_48px.svg', 48)
			.icon('usd', 		'/modules/core/img/icons/ic_attach_money_black_48px.svg', 48)
			.icon('search', 	'/modules/core/img/icons/ic_search_black_48px.svg', 48);
	}
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
