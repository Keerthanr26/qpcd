function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

function ensureRole(role) {
    return function (req, res, next) {
        if (req.user.role === role) {
            return next();
        }
        res.status(403).send('Access Denied');
    }
}

// Routes
app.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }));

app.post('/input', ensureAuthenticated, ensureRole('editor'), (req, res) => {
    // Handle data input
});

app.get('/view', ensureAuthenticated, ensureRole('viewer'), (req, res) => {
    // Handle data viewing
});

const xlsx = require('xlsx');
