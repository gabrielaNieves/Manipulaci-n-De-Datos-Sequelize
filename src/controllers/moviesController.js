const db = require('../database/models');
const sequelize = db.sequelize;


const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                res.render('moviesList.ejs', {movies})
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                res.render('moviesDetail.ejs', {movie});
            });
    },
    'new': (req, res) => {
        db.Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', {movies});
            });
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', {movies});
            });
    },
    'add': (req,res) => {
        res.render('addMovie')
    },
    'create': (req, res) => {
        db.Movie.create({
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            length: req.body.length,
            release_date: req.body.releaseDate
        })
        .then(() => {
            res.redirect('/movies')
        }) 
    },
    'edit': (req, res) => {
        db.Movie.findByPk(req.params.id)
        .then(movie =>{
            res.render('editMovie', {movie})
        })
    },
    'update': (req, res) => {
        db.Movie.update({
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            length: req.body.length,
            release_date: req.body.releaseDate
        }, {
            where: {id: req.params.id}
        })
        .then(() => {
            res.redirect('/movies/detail/' + req.params.id)
        }) 
    },
    'delete': (req, res) => {
        db.Movie.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(() => {
            res.redirect('/movies')
        })
    }

}

module.exports = moviesController;