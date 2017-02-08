(function () {
    'use strict';

    angular.module('app', [
        // Angular modules
        'ngAnimate',
        'ngRoute',

        // Custom modules

        // 3rd Party Modules
        'angular-plupload'
    ]).config(function(pluploadOptionProvider) {
        // global setting
        pluploadOptionProvider.setOptions({
            flash_swf_url: '/bower_components/plupload/js/Moxie.swf',
            silverlight_xap_url: '/bower_components/plupload/js/Moxie.xap',
            max_file_size: '1mb',

        });
    });
})();
