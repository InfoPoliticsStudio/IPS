const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost:27017/clickCounter', { useNewUrlParser: true, useUnifiedTopology: true });

const clickSchema = new mongoose.Schema({
    party: String,
    count: Number,
});

const Click = mongoose.model('Click', clickSchema);

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/click', async (req, res) => {
    const { party } = req.body;
    let click = await Click.findOne({ party });
    if (click) {
        click.count += 1;
    } else {
        click = new Click({ party, count: 1 });
    }
    await click.save();
    const ranking = await Click.find().sort({ count: -1 });
    res.json({ ranking });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
