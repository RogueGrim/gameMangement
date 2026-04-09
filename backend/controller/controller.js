
async function getAllItems(req, res) {
    res.render('index',{title: 'Game Management App'})
}

module.exports = { getAllItems }