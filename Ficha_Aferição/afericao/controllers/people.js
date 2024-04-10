var mongoose = require('mongoose');
const { modelName } = require('../models/people');
var Person = require('../models/people');

module.exports.get = (bi) => {
    let filtro = {
        $or: [
            { BI: bi },
            { CC: bi }
        ]
    };
    return Person
        .find(filtro)
        .exec();
}

module.exports.list = () => {
    return Person
        .find()
        .sort({nome : 1})
        .exec();
}

module.exports.insert = (person) => {
    var newPerson = new Person(person);
    
    return newPerson.save();
}

module.exports.update = (bicc, person) => {
    let filtro = {
        $or: [
            { BI: bicc },
            { CC: bicc }
        ]
    };
    return Person
    .findOneAndUpdate(filtro, person, {new : true})
    .exec();
}

module.exports.delete = (bicc) => {
    let filtro = {
        $or: [
            { BI: bicc },
            { CC: bicc }
        ]
    };
    return Person
        .find(filtro)
        .deleteOne()
        .exec();
}

module.exports.distinct = (campName) => {
    return Person.distinct(campName)
}

module.exports.sport = (nomeModalidade) => {
    filtro = {}
    filtro["desportos"] = nomeModalidade ;
    return Person
        .find(filtro)
        .sort({nome : 1})
        .exec()
}
