var mongoose = require('mongoose');

var personSchema = new mongoose.Schema({
    nome : String,
    idade : Number,
    sexo : String,
    morada : {
        cidade: String,
        distrito: String
    },
    BI : {
        type: String,
        required: true
    },
    descrição : String,
    profissão : String,
    partido_politico : {
        party_abbr : String,
        party_name : String
    },
    religiao : String,
    desportos : [String],
    animais : [String],
    figura_politica_pt : [String],
    marca_carro : String,
    destinos_favoritos : [String],
    atributos : {
        fumador : Boolean,
        gosta_cinema : Boolean,
        gosta_viajar : Boolean,
        acorda_cedo : Boolean,
        gosta_ler : Boolean,
        gosta_musica : Boolean,
        gosta_animais_estimação : Boolean,
        gosta_dançar : Boolean,
        comida_favorita : String
    }
}, { versionKey : false });

module.exports = mongoose.model('people', personSchema);