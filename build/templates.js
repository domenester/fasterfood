(function () {
	'use strict';

	angular
		.module('core')
		.run(templates);

	templates.$inject = ['$templateCache'];

	function templates($templateCache) {
		$templateCache.put('modules/core/views/home.client.view.html', '<section ng-controller=\"HomeController\">\r\n  <br>Enjoy &amp; Keep Us Updated,\r\n  <br>The MEAN.JS Team.\r\n</section>\r\n');
		$templateCache.put('modules/users/views/register.server.view.html', '<section ng-controller=\"Register\">\r\n	<div>REGISTER</div>\r\n</section>');	}
})();
