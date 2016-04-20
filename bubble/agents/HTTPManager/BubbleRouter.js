module.exports = function (HTTPManager, $) {
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
				if (bubbleName) bubbleRouter.childs[bubbleName] = { routers: {} };
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


	return bubbleRouter;
}