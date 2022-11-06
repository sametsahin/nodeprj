const getIndexPage = (req, res) => {
    res.render("index", { title: 'home' });
}

const getAboutPage = (req, res) => {
    res.render("about", { title: 'about' });
}
const getRegisterPage = (req, res) => {
    res.render("register", { title: 'register' });
}




export { getIndexPage, getAboutPage, getRegisterPage }