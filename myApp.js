require('dotenv').config();

let mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

let personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  favoriteFoods: {
    type: [String],
    required: false
  }
});

// attach model definition to named object
let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  var person = new Person({name: 'James Earley', age: 27, favoriteFoods: ['Brisket', 'Corned Beef', 'Garlic Bread']});

  person.save(function(err, data) {
    if (err) {
      console.error('Error saving Person: ', err);
      return done(err, null);
    } else {
      console.log('Successfully saved Person: ', data);
      return done(null, data);
    }
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, data) {
    if (err) {
      console.error('Error creating many people: ', err);
      return done(err, null);
    } else {
      console.log('Successfully created many people: ', data);
      return done(null, data);
    }
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err, data) {
    if (err) {
      console.error(`Error when finding person with name ${personName}: `, err);
      return done(err, null);
    } else {
      console.log('Successfully found people with name: ', data);
      return done(null, data);
    }
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: [food]}, function(err, data) {
    if (err) {
      console.error(`Error finding one person with favorite food '${food}': `, err);
      return done(err, null);
    } else {
      console.log('Successfully found one person with food: ', data);
      return done(null, data);
    }
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, data) {
    if (err) {
      console.error(`Error finding person with id '${personId}': `, err);
      done(err, null);
    } else {
      console.log('Successfully found person: ', data);
      done(null, data);
    }
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function(err, person) {
    if (err) {
      console.error(`Error finding person with id '${personId}': `, err);
      done(err, null);
    } else {
      console.log('Successfully found person: ', person);
      person.favoriteFoods.push(foodToAdd);
      person.save(function(err, updatedPerson) {
        if (err) {
          console.error('Error updating person: ', err);
          return done(err, null);
        } else {
          console.log('Successfully updated person: ', updatedPerson);
          return done(null, updatedPerson);
        }
      });
    }
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
