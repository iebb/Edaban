var sanitize = require("sanitize-filename");
var request = require('request');
var mkdirp = require('mkdirp');
var prompt = require('prompt');
var jsdom = require('jsdom');
var util = require('util');
var path = require('path')
var fs = require("fs");
var j = request.jar();
var getDirName = path.dirname;
var request = request.defaults({jar : j});
function writeFile(path, contents, cb) { mkdirp(getDirName(path), function (err) { if (err) return cb(err); fs.writeFile(path, contents, cb); }); }
function jQexec(body, cb) { jsdom.env({ html: body, scripts: ['http://eden.sysu.edu.cn/static/js/jquery-1.8.3.min.js'], done: cb }); }
function doFetch() {
	request.get('http://eden.sysu.edu.cn/m/ass/', function (e, r, body) {
		jQexec(body, function (err, window) {
			var $ = window.$;
			$('.item-ass a').each(function() {
				Id = $(this).attr('href').replace(/[^0-9]/g,'');
				Title = $(this).text().replace(/^\s+/,'').replace(/\s+$/,'');
				console.log("Fetching", Id, Title);
				(function(Id, Title) {
			        request.get('http://eden.sysu.edu.cn/m/ass/' + Id, function (e, r, body) {
						jQexec(body, function (err, window) {
							var $ = window.$;
							var folder = sanitize(Id + " " + Title), devFile = "", isCpp = 0, i = 0;
							$('#tab-nondiv-container .tab a').each(function(){
								w = $(this).text();
								if (~w.indexOf("cpp")) isCpp = 1;
								if (~w.indexOf('[*]')){ filter = " textarea"; filename = sanitize(w.replace('[*]','')); }
								else { filter = " pre"; filename = sanitize(w); }
								code = $($(this).attr('href') + filter).text();
								writeFile("./saved/" + folder + "/" + filename, code); 
								devFile += util.format("[Unit%d]\nFileName=%s\n", ++i, filename);
							});
							devFile = util.format("[Project]\nFileName=Project%s.dev\nName=%s\n\
								UnitCount=%s\nIsCpp=%d\nType=1\nVer=2\n", Id, Id, $('#tab-nondiv-container .tab a').length, isCpp) + devFile;
							writeFile("./saved/" + folder + "/Project" + Id + ".dev", devFile);
						});
					});
			    })(Id, Title);

			});
		})
	});
}
function PromptLogin(csrf) {
	prompt.start();
	prompt.get(['username', { name: 'password', hidden: true, replace: '*', required: true }], function (err, result) {
		if (err) { return onErr(err); }
		console.log("logging in....");
		request.post({
			url: 'http://eden.sysu.edu.cn/m/login/', 
			form:  { 'csrfmiddlewaretoken' : csrf, 'username' : result.username, 'password' : result.password, 'next' : '/m/my/' }
		}, function(err, response, body){
			jQexec(body, function (err, window) {
				var $ = window.$;
				if ($('.errorlist').length) {
					console.log($('.errorlist').text());
					console.log("login failed, please retry :(");
					return PromptLogin(csrf);
				} else {
					console.log("logged in.... now fetching assignments");
					doFetch();
				}
			});
		})
	});
}

request('http://eden.sysu.edu.cn/m/login/', function (e, r, body) {
	jQexec(body, function (err, window) { var $ = window.$;
		var csrf = $($('[name=csrfmiddlewaretoken]')[0]).val();
		PromptLogin(csrf);
	});
});
