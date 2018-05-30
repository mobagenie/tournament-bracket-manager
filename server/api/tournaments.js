const ObjectId = require('mongodb').ObjectId;
const db = require('../mongodb.js');

module.exports = {
    getAll: function (req, res, next) {
        const collection = db.get('tournaments');

        collection.find().toArray((err, tournaments) => {
            if (err) return next(err);

            res.send(tournaments);
        });
    },
    getOne: function (req, res, next) {
        const collection = db.get('tournaments');
        const tournamentId = { _id: new ObjectId(req.params.tournamentId) };

        collection.findOne(tournamentId, (err, tournament) => {
            if (err) return next(err);

            res.send(tournament);
        });
    },
    addTournament: function (req, res, next) {
        const collection = db.get('tournaments');
        const tournament = req.body;

        collection.insertOne(tournament, (err, result) => {
            if (err) return next(err);

            res.send(result);
        });
    },
    update: function (req, res, next) {
        const collection = db.get('tournaments');
        const tournamentId = { _id: new ObjectId(req.params.tournamentId) };
        const update = { $set: req.body };

        collection.updateOne(tournamentId, update, (err, result) => {
            if (err) return next(err);

            res.send(result);
        });
    },
    addParticipant: function (req, res, next) {
        const collection = db.get('tournaments');
        const tournamentId = { _id: new ObjectId(req.params.tournamentId) };
        const update = { $addToSet: { participants: req.params.participantId } };

        collection.updateOne(tournamentId, update, (err, result) => {
            if (err) return next(err);

            res.send(result);
        });
    },
    delete: function (req, res, next) {
        const collection = db.get('tournaments');
        const tournamentId = new ObjectId(req.params.tournamentId);
        const tournament = { _id: tournamentId };

        collection.deleteOne(tournament, (err, result) => {
            if (err) return next(err);

            res.send(result);
        });
    },
    deleteParticipant: function (req, res, next) {
        const collection = db.get('tournaments');
        const tournamentId = new ObjectId(req.params.tournamentId);
        const participantId = req.params.participantId;
        const selector = { _id: tournamentId };
        const update = { $pull: { participants: participantId } };

        collection.updateOne(selector, update, (err, result) => {
            if (err) return next(err);

            res.send(result);
        });
    },
};
