const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()
const fs = require('fs')

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// https://stackoverflow.com/questions/42956250/get-download-url-from-file-uploaded-with-cloud-functions-for-firebase
// https://github.com/firebase/functions-samples/tree/Node-8/generate-thumbnail
exports.returnWithOGP = functions.https.onRequest((req, res) => {
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600')

    const path = req.params[0].split('/')
    const id = path[path.length -1]

    // https://flaviocopes.com/node-module-fs/
    fs.readFile('index.html', 'utf8', (error, templateHtml) => {
        if (error) { res.status(500).send(error) }
        const filePath = `skillImages/${id}.jpg`
        console.log("ストレージのパス：" + filePath)
        const bucket = admin.storage().bucket()
        const file = bucket.file(filePath)
        const config = {
            action: 'read',
            expires: '03-01-2500',
        }

        file.getSignedUrl(config).then(urls => {
            const signedUrl = urls[0]
            console.log("画像url：" + signedUrl)
            const responseHtml = templateHtml.replace(/(<meta property=og:image content=)(.*?)>/, "$1" + signedUrl + '>')
            return res.status(200).send(responseHtml)
        }).catch(error => {
            console.log(error)
            return res.status(404).send(templateHtml)
        })
    })
});
