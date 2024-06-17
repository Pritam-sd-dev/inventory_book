export const test = (req, res, next) => {
    req.user = {id: 259, name: 'test_user'}
    console.log('test middleware');
    next();
}