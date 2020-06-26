const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');

const Survey = mongoose.model('surveys');

module.exports = (app) => {
  app.post('/api/surveys', requireLogin, requireCredits, (req, res, next) => {
    const {title, subject, body, recipients} = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      //    recipients: recipients.split(',').map(email => { return {email: email}})
      recipients: recipients.split(',').map(email => ({ email: email.trim() })), 
      _user: req.user.id,
      dateSent: Date.now(),
    });
  });
  next();
};
 