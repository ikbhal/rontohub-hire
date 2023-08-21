const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3047; // Updated port number to 3046

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const applicationsFilePath = path.join(__dirname, 'data', 'applications.json');

app.post('/post-intern', (req, res) => {
    const application = req.body;
    const applications = JSON.parse(fs.readFileSync(applicationsFilePath));
    applications.push(application);
    fs.writeFileSync(applicationsFilePath, JSON.stringify(applications, null, 2));
    res.json({ message: 'Application submitted successfully' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
