define('app',['exports', 'aurelia-auth'], function (exports, _aureliaAuth) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      this.router = router;
      config.addPipelineStep('authorize', _aureliaAuth.AuthorizeStep);
      config.map([{
        route: ['', 'home'],
        moduleId: './modules/home',
        name: 'Home'
      }, {
        route: 'list',
        moduleId: './modules/list',
        name: 'List',
        auth: true
      }]);
    };

    return App;
  }();
});
define('auth-config',['exports'], function (exports) {
   'use strict';

   Object.defineProperty(exports, "__esModule", {
      value: true
   });
   var authConfig = {
      baseUrl: "/",
      loginUrl: 'users/login',
      tokenName: 'token',
      authHeader: 'Authorization',
      authToken: '',
      logoutRedirect: '#/home'
   };

   exports.default = authConfig;
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment', 'regenerator-runtime', './auth-config'], function (exports, _environment, _regeneratorRuntime, _authConfig) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  var _regeneratorRuntime2 = _interopRequireDefault(_regeneratorRuntime);

  var _authConfig2 = _interopRequireDefault(_authConfig);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  window.regeneratorRuntime = _regeneratorRuntime2.default;

  function configure(aurelia) {
    aurelia.use.standardConfiguration().plugin('aurelia-auth', function (baseConfig) {
      baseConfig.configure(_authConfig2.default);
    }).feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('modules/home',['exports', 'aurelia-framework', 'aurelia-router', '../resources/data/users', 'aurelia-auth'], function (exports, _aureliaFramework, _aureliaRouter, _users, _aureliaAuth) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Home = undefined;

	function _asyncToGenerator(fn) {
		return function () {
			var gen = fn.apply(this, arguments);
			return new Promise(function (resolve, reject) {
				function step(key, arg) {
					try {
						var info = gen[key](arg);
						var value = info.value;
					} catch (error) {
						reject(error);
						return;
					}

					if (info.done) {
						resolve(value);
					} else {
						return Promise.resolve(value).then(function (value) {
							step("next", value);
						}, function (err) {
							step("throw", err);
						});
					}
				}

				return step("next");
			});
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var Home = exports.Home = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _users.Users, _aureliaAuth.AuthService), _dec(_class = function () {
		function Home(router, users, auth) {
			_classCallCheck(this, Home);

			this.router = router;
			this.auth = auth;
			this.loginError = '';
			this.users = users;
			this.message = 'Home';
			this.showLogin = true;
			this.showOK = false;
			this.showError = false;
		}

		Home.prototype.login = function login() {
			var _this = this;

			return this.auth.login(this.email, this.password).then(function (response) {
				sessionStorage.setItem("user", JSON.stringify(response.user));
				_this.loginError = "";
				_this.router.navigate('list');
			}).catch(function (error) {
				console.log(error);
				_this.loginError = "Username and or password is incorrect. Try again.";
			});
		};

		Home.prototype.showRegister = function showRegister() {
			this.user = {
				firstName: "",
				lastName: "",
				email: "",
				password: ""
			};
			this.registerError = "";
			this.showLogin = false;
		};

		Home.prototype.save = function () {
			var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
				var serverResponse;
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.next = 2;
								return this.users.save(this.user);

							case 2:
								serverResponse = _context.sent;

								if (!serverResponse.error) {
									this.showOK = true;
									this.user = {
										firstName: "",
										lastName: "",
										email: "",
										password: ""
									};
								} else {
									this.showError = true;
								}

							case 4:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function save() {
				return _ref.apply(this, arguments);
			}

			return save;
		}();

		return Home;
	}()) || _class);
});
define('modules/list',['exports', 'aurelia-framework', 'aurelia-router', '../resources/data/pics', 'aurelia-auth'], function (exports, _aureliaFramework, _aureliaRouter, _pics, _aureliaAuth) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Wall = undefined;

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Wall = exports.Wall = (_dec = (0, _aureliaFramework.inject)(_pics.Pics, _aureliaAuth.AuthService, _aureliaRouter.Router), _dec(_class = function () {
    function Wall(pics, auth, router) {
      _classCallCheck(this, Wall);

      this.pics = pics;
      this.router = router;
      this.auth = auth;
      this.user = JSON.parse(sessionStorage.getItem('user'));
      this.message = this.user.firstName + "'s Pics";
      this.modalTitle = '';
      this.gallerySelected = false;
      this.selected = [];
      this.filesToUpload = [];
    }

    Wall.prototype.selectGallery = function selectGallery(pic) {
      this.gallerySelected = pic;
      this.selected = [];
    };

    Wall.prototype.logout = function logout() {
      sessionStorage.removeItem('user');
      this.auth.logout();
    };

    Wall.prototype.selectAction = function selectAction(id, event) {
      var index = this.selected.indexOf(id);
      if (index >= 0) {
        this.selected.splice(index, 1);
      } else {
        this.selected.push(id);
      }

      if ($(event.target).hasClass('pic-container')) {
        $(event.target).toggleClass('active');
      } else {
        $(event.target).parent().toggleClass('active');
      }
    };

    Wall.prototype.createImages = function createImages() {

      if (this.gallerySelected) {
        this.picObj = this.gallerySelected;
        this.modalTitle = 'Add Image';
        $('#addPicture').modal();
      } else {
        alert('Select a gallery');
      }
    };

    Wall.prototype.deleteImages = function deleteImages() {
      for (var i = 0, l = this.selected.length; i < l; i++) {
        var reponse = this.pics.deleteImages(this.selected, this.gallerySelected._id);
      }

      this.selected = [];
    };

    Wall.prototype.saveImages = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(this.filesToUpload && this.filesToUpload.length)) {
                  _context.next = 5;
                  break;
                }

                _context.next = 3;
                return this.pics.uploadFile(this.filesToUpload, this.user._id, this.gallerySelected._id);

              case 3:
                this.gallerySelected = _context.sent;

                this.filesToUpload = [];

              case 5:
                $('#addPicture').modal('toggle');
                window.location.reload();

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function saveImages() {
        return _ref.apply(this, arguments);
      }

      return saveImages;
    }();

    Wall.prototype.createPic = function createPic() {
      this.picObj = {
        name: "",
        userID: this.user._id
      };
      this.modalTitle = 'New Pic';
      $('#mainModal').modal();
    };

    Wall.prototype.editPic = function editPic(pic) {
      this.picObj = pic;
      this.modalTitle = 'Edit Pic';
      $('#mainModal').modal();
    };

    Wall.prototype.deleteGallery = function deleteGallery(pic) {
      this.pics.deletePic(pic._id);
      this.gallerySelected = false;
    };

    Wall.prototype.changeFiles = function changeFiles() {
      this.filesToUpload = new Array();
      this.filesToUpload.push(this.files[0]);
    };

    Wall.prototype.removeFile = function removeFile(index) {
      this.filesToUpload.splice(index, 1);
    };

    Wall.prototype.savePic = function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(close) {
        var response, picId;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this.picObj) {
                  _context2.next = 6;
                  break;
                }

                _context2.next = 3;
                return this.pics.save(this.picObj);

              case 3:
                response = _context2.sent;

                if (response.error) {
                  alert("There was an error creating the Pic");
                } else {
                  picId = response._id;
                }
                if (close) {
                  $('#mainModal').modal('toggle');
                }

              case 6:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function savePic(_x) {
        return _ref2.apply(this, arguments);
      }

      return savePic;
    }();

    Wall.prototype.activate = function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.pics.getUserPics(this.user._id);

              case 2:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function activate() {
        return _ref3.apply(this, arguments);
      }

      return activate;
    }();

    return Wall;
  }()) || _class);
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('resources/data/data-services',['exports', 'aurelia-framework', 'aurelia-fetch-client'], function (exports, _aureliaFramework, _aureliaFetchClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DataServices = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var DataServices = exports.DataServices = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = function () {
    function DataServices(http) {
      var _this = this;

      _classCallCheck(this, DataServices);

      this.httpClient = http;
      this.BASE_URL = "/api/";

      this.httpClient.configure(function (config) {
        config.withBaseUrl(_this.BASE_URL).withDefaults({
          credentials: 'same-origin',
          headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'Fetch'
          }
        }).withInterceptor({
          request: function request(_request) {
            console.log('Requesting ' + _request.method + ' ' + _request.url);
            return _request;
          },
          response: function response(_response) {
            console.log('Received ' + _response.status + ' ' + _response.url);
            return _response;
          }
        });
      });
    }

    DataServices.prototype.get = function get(url) {
      return this.httpClient.fetch(url).then(function (response) {
        return response.json();
      }).then(function (data) {
        return data;
      }).catch(function (error) {
        return error;
      });
    };

    DataServices.prototype.post = function post(content, url) {
      return this.httpClient.fetch(url, {
        method: 'post',
        body: (0, _aureliaFetchClient.json)(content)
      }).then(function (response) {
        return response.json();
      }).then(function (object) {
        return object;
      }).catch(function (error) {
        return error;
      });
    };

    DataServices.prototype.put = function put(content, url) {
      return this.httpClient.fetch(url, {
        method: 'put',
        body: (0, _aureliaFetchClient.json)(content)
      }).then(function (response) {
        return response.json();
      }).then(function (object) {
        return object;
      }).catch(function (error) {
        return error;
      });
    };

    DataServices.prototype.delete = function _delete(url) {
      return this.httpClient.fetch(url, {
        method: 'delete'
      }).then(function (response) {
        return response.json();
      }).then(function (object) {
        return object;
      }).catch(function (error) {
        return error;
      });
    };

    DataServices.prototype.uploadFiles = function uploadFiles(files, url) {
      return this.httpClient.fetch(url, {
        method: 'post',
        body: files
      }).then(function (response) {
        return response.json();
      }).then(function (object) {
        return object;
      }).catch(function (error) {
        return error;
      });
    };

    return DataServices;
  }()) || _class);
});
define('resources/data/pics',['exports', 'aurelia-framework', './data-services'], function (exports, _aureliaFramework, _dataServices) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Pics = undefined;

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Pics = exports.Pics = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class = function () {
    function Pics(data) {
      _classCallCheck(this, Pics);

      this.data = data;
      this.PIC_SERVICE = 'pics';
      this.picsArray = [];
    }

    Pics.prototype.updateArray = function updateArray(pic) {
      for (var i = 0, l = this.picsArray.length; i < l; i++) {
        if (this.picsArray[i]._id == pic._id) {
          this.picsArray[i] = pic;
          break;
        }
      }
      this.picsArray.push(this.picsArray.pop());
    };

    Pics.prototype.save = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(pic) {
        var response, _response;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (pic._id) {
                  _context.next = 8;
                  break;
                }

                _context.next = 3;
                return this.data.post(pic, this.PIC_SERVICE);

              case 3:
                response = _context.sent;


                if (!response.error) {
                  this.picsArray.push(response);
                }
                return _context.abrupt('return', response);

              case 8:
                _context.next = 10;
                return this.data.put(pic, this.PIC_SERVICE + "/" + pic._id);

              case 10:
                _response = _context.sent;


                if (!_response.error) {
                  this.updateArray(_response);
                }
                return _context.abrupt('return', _response);

              case 13:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function save(_x) {
        return _ref.apply(this, arguments);
      }

      return save;
    }();

    Pics.prototype.getUserPics = function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(id) {
        var response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.data.get(this.PIC_SERVICE + "/user/" + id);

              case 2:
                response = _context2.sent;

                if (!response.error && !response.message) {
                  this.picsArray = response;
                }

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getUserPics(_x2) {
        return _ref2.apply(this, arguments);
      }

      return getUserPics;
    }();

    Pics.prototype.uploadFile = function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(files, userId, picId) {
        var formData, response;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                formData = new FormData();


                files.forEach(function (item, index) {
                  formData.append("file" + index, item);
                });
                _context3.next = 4;
                return this.data.uploadFiles(formData, this.PIC_SERVICE + "/upload/" + userId + "/" + picId);

              case 4:
                response = _context3.sent;

                if (!response.error) {
                  this.updateArray(response);
                }
                return _context3.abrupt('return', response);

              case 7:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function uploadFile(_x3, _x4, _x5) {
        return _ref3.apply(this, arguments);
      }

      return uploadFile;
    }();

    Pics.prototype.deleteImages = function () {
      var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(images, id) {
        var response;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.data.post({ 'images': images }, this.PIC_SERVICE + "/" + id + "/images");

              case 2:
                response = _context4.sent;

                this.updateArray(response);
                return _context4.abrupt('return', response);

              case 5:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function deleteImages(_x6, _x7) {
        return _ref4.apply(this, arguments);
      }

      return deleteImages;
    }();

    Pics.prototype.deletePic = function () {
      var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(id) {
        var response, i;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.data.delete(this.PIC_SERVICE + "/" + id);

              case 2:
                response = _context5.sent;

                if (!response.error) {
                  for (i = 0; i < this.picsArray.length; i++) {
                    if (this.picsArray[i]._id === id) {
                      this.picsArray.splice(i, 1);
                    }
                  }
                }

              case 4:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function deletePic(_x8) {
        return _ref5.apply(this, arguments);
      }

      return deletePic;
    }();

    return Pics;
  }()) || _class);
});
define('resources/data/users',['exports', 'aurelia-framework', './data-services'], function (exports, _aureliaFramework, _dataServices) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Users = undefined;

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Users = exports.Users = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class = function () {
    function Users(data) {
      _classCallCheck(this, Users);

      this.data = data;
      this.USER_SERVICE = 'users';
    }

    Users.prototype.save = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(user) {
        var serverResponse;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!user) {
                  _context.next = 5;
                  break;
                }

                _context.next = 3;
                return this.data.post(user, this.USER_SERVICE);

              case 3:
                serverResponse = _context.sent;
                return _context.abrupt('return', serverResponse);

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function save(_x) {
        return _ref.apply(this, arguments);
      }

      return save;
    }();

    return Users;
  }()) || _class);
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"./resources/css/styles.css\"></require><div class=\"container\"><router-view></router-view></div></template>"; });
define('text!resources/css/styles.css', ['module'], function(module) { module.exports = ".rightMargin {\n\tmargin-right: 10px;\n}\n\n.topMargin{\n\tmargin-top: 10px;\n}\n\nul{\n\tpadding: 0px;\n}\n\n.btn,\na{\n\tcursor: pointer;\n}\n\n.btn.btn-default{\n\tborder:1px solid #000;\n\tbackground: #000;\n\tcolor:#fff;\n}\n\n.btn.btn-default:hover,\n.btn.btn-default:focus,\n.btn.btn-default:active{\n\tcolor: #000;\n\tbackground:#fff;\n}\n\n.border-right{\n\tborder-right: 1px solid #000;\n}\n\n\n.mimHeight{\n\tmin-height: 200px;\n}\n\n.pic-container{\n\tcursor: pointer;\n\tmin-height: 180px;\n\tmargin-bottom: 20px;\n\tborder: 2px solid #000;\n}\n\n.pic-container.active{\n\tborder: 2px solid #0000DE;\t\n}"; });
define('text!modules/home.html', ['module'], function(module) { module.exports = "<template><h1 class=\"text-center topMargin\">${message}</h1><div class=\"col-sm-6 offset-sm-3\"><div class=\"jumbotron\"><compose show.bind=\"showLogin\" view=\"./components/login.html\"></compose><compose show.bind=\"!showLogin\" view=\"./components/register.html\"></compose></div></div></template>"; });
define('text!modules/list.html', ['module'], function(module) { module.exports = "<template><div class=\"topMargin\"><button class=\"btn btn-default btn-sm pull-right\" click.trigger=\"logout()\">Sing Out</button><h1 class=\"text-center\">${message}</h1><compose view=\"./components/picList.html\"></compose><div class=\"modal fade\" id=\"mainModal\"><div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><h5 class=\"modal-title\">${modalTitle}</h5><button type=\"button\" class=\"close\" data-dismiss=\"modal\"><i class=\"fa fa-close\"></i></button></div><div class=\"modal-body\"><compose view=\"./components/picForm.html\"></compose></div></div></div></div><div class=\"modal fade\" id=\"addPicture\"><div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><h5 class=\"modal-title\">${modalTitle}</h5><button type=\"button\" class=\"close\" data-dismiss=\"modal\"><i class=\"fa fa-close\"></i></button></div><div class=\"modal-body\"><form><div><div><label class=\"btn btn-secondary\">Browse for files&hellip; <input type=\"file\" style=\"display:none\" change.delegate=\"changeFiles()\" files.bind=\"files\"></label><small id=\"fileHelp\" class=\"form-text text-muted\">Upload pic.</small></div><div><ul><li repeat.for=\"file of filesToUpload\" class=\"list-group-item\"> ${file.name}<span click.delegate=\"removeFile($index)\" class=\"pull-right\"><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></span></li></ul></div><button click.trigger=\"saveImages()\" class=\"btn btn-primary topMargin\">Save</button></div></form></div></div></div></div></div></template>"; });
define('text!modules/components/login.html', ['module'], function(module) { module.exports = "<template><div id=\"errorMsg\" class=\"alert alert-danger\" show.bind=\"loginError\" innerhtml.bind=\"loginError\"></div><div class=\"form-group\"><label for=\"email\">Email</label><input value.bind=\"email\" type=\"email\" autofocus class=\"form-control\" id=\"email\" placeholder=\"Email\"></div><div class=\"form-group\"><label for=\"password\">Password</label><input value.bind=\"password\" type=\"password\" class=\"form-control\" id=\"password\" placeholder=\"Password\"></div><div class=\"form-actions text-center\"><button click.trigger=\"login()\" class=\"btn btn-default\">Login</button><br><br><span>Don't have an account? <a click.trigger=\"showRegister()\" href=\"#\">Sign up</a> today!</span></div></template>"; });
define('text!modules/components/picForm.html', ['module'], function(module) { module.exports = "<template><form><div class=\"form-group topMargin\"><label for=\"todoInput\">Gallery Name *</label><input value.bind=\"picObj.name\" type=\"text\" class=\"form-control\" id=\"todoInput\" aria-describedby=\"todoHelp\" placeholder=\"Enter Gallery name\"> <small id=\"todoHelp\" class=\"form-text text-muted\">A short name for the Gallery.</small> <button click.trigger=\"savePic(true)\" class=\"btn btn-primary topMargin\">Save</button></div></form></template>"; });
define('text!modules/components/picList.html', ['module'], function(module) { module.exports = "<template><div class=\"row\"><div class=\"col-sm-3 border-right mimHeight\"><a click.trigger=\"createPic()\" class=\"btn btn-default btn-sm pull-right rightMargin\" href=\"#\"><i class=\"fa fa-plus\"></i></a><h3>Gallery List</h3><ul class=\"list-group\"><li repeat.for=\"pic of pics.picsArray\" class=\"list-group-item list-group-item-action\" class.bind=\"(gallerySelected._id == pic._id)? 'active':''\" click.trigger=\"selectGallery(pic)\"><a>${pic.name}</a><span class=\"pull-right rightMargin\" click.trigger=\"deleteGallery(pic)\"><i class=\"fa fa-trash\"></i></span> <span class=\"pull-right rightMargin\" click.trigger=\"editPic(pic)\"><i class=\"fa fa-pencil\"></i></span></li></ul></div><div class=\"col-sm-9 mimHeight\"><div class=\"card col-sm-12\"><div class=\"card-body text-right\"><a click.trigger=\"createImages()\" class=\"btn btn-default btn-sm rightMargin\" href=\"#\"><i class=\"fa fa-plus\"></i> </a><a click.trigger=\"deleteImages()\" class=\"btn btn-default btn-sm rightMargin\" href=\"#\"><i class=\"fa fa-trash\"></i></a></div></div><br><br><div class=\"row\"><div class=\"col-sm-3\" repeat.for=\"file of gallerySelected.files\"><div class=\"pic-container\" click.trigger=\"selectAction(file.filename,$event)\" class.bind=\"(selected.indexOf(pic.filename) < 0)? '' :  'active'\"><img src=\"/uploads/${user._id}/${file.filename}\" class=\"img-fluid\"> <strong>${file.originalName}</strong></div></div></div><div show.bind=\"!pics.picsArray.length\" class=\"col-sm-12\"><h2 class=\"text-center\">Apparently, you don't have Pics on your gallery!</h2></div></div></div></template>"; });
define('text!modules/components/register.html', ['module'], function(module) { module.exports = "<template><div class=\"alert alert-success text-center\" show.bind=\"showOK\">\"Registration was successful\"<br><a click.trigger=\"showLogin = true\" href=\"#\">Please Login</a></div><form><div class=\"form-group\"><label>First Name:</label><input value.bind=\"user.firstName\" class=\"form-control\" required=\"\"></div><div class=\"form-group\"><label>Last Name:</label><input value.bind=\"user.lastName\" class=\"form-control\" required=\"\"></div><div class=\"form-group\"><label>Email:</label><input value.bind=\"user.email\" class=\"form-control\" required=\"\"></div><div class=\"form-group\"><label>Password:</label><input value.bind=\"user.password\" class=\"form-control\" required=\"\"></div><div class=\"form-actions\"><button class=\"btn btn-default\" click.trigger=\"save()\">Save</button></div></form></template>"; });
//# sourceMappingURL=app-bundle.js.map