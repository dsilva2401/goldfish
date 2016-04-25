module.exports = function (HTTPManager, $) {
	var GenericControllers = {};
	var Q = $.interfaces.libs('Q');
	var db = $.interfaces.databases('sequelize');

	GenericControllers.SequelizeBasic = function (model, modelIdKey) {
		// Methods
			// POST => /model
			this.create = function (req, res, next) {
				var modelData = req.body;
				var response = new HTTPManager.Response(req, res);
				db.models[model].create(modelData)
				// Success
				.then( response.success )
				// Error
				// .catch( response.error );
				.catch(function (error) {
					if (error.name == 'SequelizeUniqueConstraintError') res.status(409);
					response.error(error);
				})
			}
			// PUT => /model/:modelId
			this.updateOne = function (req, res, next) {
				var response = new HTTPManager.Response(req, res);
				db.models[model].findById(req.params[modelIdKey])
				// Success
				.then(function (modelInstance) {
					Object.keys(req.body).forEach(function (attr) {
						if (attr == 'id') return;
						modelInstance[attr] = req.body[attr];
					});
					modelInstance.save()
					// Success
					.then( response.success )
					// Error
					.catch( response.error );
				})
				// Error
				.catch( response.error );
			}
			// GET => /model?where={..}
			this.getAll = function (req, res, next) {
				var response = new HTTPManager.Response(req, res);
				var filter = JSON.parse( req.query.where || '{}' );
				db.models[model].findAll({ where: filter })
				// Success
				.then( response.success )
				// Error
				.catch( response.error );
			}
			// DELETE => /model/:modelId
			this.delete = function (req, res, next) {
				var response = new HTTPManager.Response(req, res);
				db.models[model].findById(req.params[modelIdKey])
				// Success
				.then(function (modelInstance) {
					modelInstance.destroy()
					// Success
					.then( response.success )
					// Error
					.catch( response.error );
				})
				// Error
				.catch( response.error );
			}

	}

	return GenericControllers;
}