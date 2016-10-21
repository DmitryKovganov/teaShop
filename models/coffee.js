var mongoose = require('mongoose');

module.exports = mongoose.model('Coffee', {
	type		: String, // Arabica (арабика)/ Canephora (робуста) (вид)
	region		: String, // Мокко / бразильский / колумбийский
    technology	: String, // powder (порошок) / Freeze-dried (сублимированный) / granulated (гранулированный)
    description	: String,
    label		: String,
    price		: Number // 1kg
});