const getIndexPage = (req, res) => {
    res.render("index", { title: 'home' });
}

const getAboutPage = (req, res) => {
    res.render("about", { title: 'about' });
}

export { getIndexPage, getAboutPage }