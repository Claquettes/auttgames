const sharp = require('sharp');

function init(app) {
    app.get('/envoie', async (req, res) => {

            let msg1 = '';
            let msg2 = ''
            if (req.query.msg)
                msg1 = req.query.msg;
            if (req.query.msg2)
                msg2 = req.query.msg2;

            let svgImage = `
        <svg width="600" height="400">
          <style>
          .title { fill: #001; font-size: 45px; font-weight: bold;}
          </style>
          <text x="55%" y="10%" text-anchor="middle" class="title">${msg1}</text>
          <text x="55%" y="25%" text-anchor="middle" class="title">${msg2}</text>
        </svg>
        `;
            let svgBuffer = Buffer.from(svgImage);
            let pngBuffer;
            await sharp(svgBuffer).png().toBuffer().then((data) => {
                pngBuffer = data;
            }).catch((err) => {
                console.log(err);
            })

            await sharp("envoie.png").composite([{input: pngBuffer, gravity: "center"}]).toBuffer().then(data => {
                res.writeHead(200, {'Content-Type': 'image/png'});
                res.end(data, 'binary');
            });
        }
    );
}

module.exports = {init};