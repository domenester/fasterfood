'use strict';

/**
 * Render the main application page
 */
exports.register = function (req, res) {
  res.render('modules/core/server/views/index', {
    user: req.user || null
  });
};
