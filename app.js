const express = require('express');
const session = require('express-session');
const app = express();

// Read form data The following line is required
app.use(express.urlencoded({ extended: true }));

// Uses session to temporarily remember the name
app.use(session({
secret: 'secret-key',
resave: false,
saveUninitialized: true
}));

// Home page - Name entry form
app.get('/', (req, res) => {
res.send(`
<form action="/submit" method="POST">
<input type="text" name="username" placeholder="Enter your name here" required>
<button type="submit">Submit</button>
</form>
`);
});

// Get the name and put it in a variable (session) (POST)
app.post('/submit', (req, res) => {
req.session.userName = req.body.username; 
res.redirect('/display'); // Redirects to the page that displays the name
});

// Page that displays the name (GET)
app.get('/display', (req, res) => {
const name = req.session.userName || "Guest";
res.send(<h1>Welcome, ${name}!</h1>);
});


app.listen(3000, () => console.log('Server running on http://localhost:3000'));
