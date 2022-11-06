const getIndexPage = (req, res) => {
    res.render('index', { title: 'home' });
}
const getAboutPage = (req, res) => {
    res.render('about', { title: 'about' });
}
const getRegisterPage = (req, res) => {
    res.render('register', { title: 'register' });
}
const getLoginPage = (req, res) => {
    res.render('login', { title: 'login' });
}



export { getIndexPage, getAboutPage, getRegisterPage, getLoginPage }