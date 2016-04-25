module.exports = function (HTTPManager, $) {
	var Q = $.interfaces.libs('Q');
	var bubbleRouter = {};

	// Attributes
		bubbleRouter.routers = {};
		bubbleRouter.childs = {};

	// Methods
		var Router = function (name) {
			// Attributes
				var self = this;
				this.name = name;
				this.router = $.express.Router();
				this.routes = {};
			// Methods
				['get', 'put', 'post', 'delete', 'all'].forEach(function (method) {
					self[method] = function (name, route, controllers) {
						var rArguments = arguments;
						var r = {};
						r.name = name;
						r.method = method;
						r.route = route;
						r.controllers = [];
						Object.keys(rArguments).forEach(function (index) {
							if (index < '2') return;
							r.controllers.push(rArguments[index]);
						});
						r.controllers.forEach(function (controller) {
							self.router[method](route, controller);
						});
						self.routes[name] = r;
					}
				});
		}
		bubbleRouter.new = function (bubbleName) {		
			// Init
				if (bubbleName) bubbleRouter.childs[bubbleName] = { name: bubbleName, routers: {} };
			// Attributes
				var br = {};
			// Methods
				br.createRouter = function (name) {
					var r = new Router(name);
					if (bubbleName) bubbleRouter.childs[bubbleName].routers[name] = r;
					else bubbleRouter.routers[name] = r;
					return r;
				}
			// Export
				return br;
		}
		bubbleRouter.getChilds = function () {
			var childs = [];
			Object.keys(bubbleRouter.childs).forEach(function (childName) {
				childs.push(bubbleRouter.childs[childName]);
			});
			return childs;
		}
		bubbleRouter.getViews = function (bubble) {
			var deferred = Q.defer();
			if (bubble && !bubbleRouter.childs[bubble]) {
				deferred.reject({
					details: 'Error: Child \''+bubble+'\' not defined'
				})
				return;
			}
			var routers = (bubble) ? bubbleRouter.childs[bubble].routers : bubbleRouter.routers ;
			var viewsRouter = routers.viewsRouter || {};
			var routes = [];
			Object.keys(viewsRouter.routes).forEach(function (routeName) {
				routes.push( viewsRouter.routes[routeName] );
			});
			deferred.resolve(routes)
			return deferred.promise;
		}

	return bubbleRouter;
}