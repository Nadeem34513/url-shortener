const router = require('express').Router()
const validUrl = require('valid-url')
const shortId = require('shortid')
const URL = require('../model/URL')

router.get('/', (req, res) => {
    res.render('index')
})

router.post('/api', (req, res) => {
    const { longURL } = req.body
    const baseURL = process.env.baseURL

    if (!validUrl.isUri(baseURL)) {
        console.error("Invalid Base URL")
        // return res.status(401).json("Invalid Base URL")
    }

    const urlCode = shortId.generate()

    if (validUrl.isUri(longURL)) {
        URL.findOne({ longURL }).then((url) => {
            if (url) {
                console.error("URL ALREADY EXISTS")
                return
                // return res.status(401).json("URL ALREADY EXISTS")       
            } else {
                const shortURL = `${baseURL}/${urlCode}`
                const newUrl = new URL({ longURL, shortURL, urlCode })
                newUrl.save()
                    .then(() => {
                        console.log("SUCCESS, ", shortURL)
                        // return res.status(200).json("SUCCESS")
                    })
                    .catch((err) => console.error(err))
            }
        })
    } else {
        return res.status(500).json("Invalid URL")
    }
    res.redirect('/')
})

// URL redirect
router.get('/:code', (req, res) => {
    URL.findOne({ urlCode: req.params.code })
        .then((url) => {
            if (url) {
                return res.redirect(url.longURL)
            } else {
                return res.status(404).send("404 Url not found")
            }
                
        })
        .catch(err => console.error(err))
})

module.exports = router