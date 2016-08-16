'use strict';

var models = require("../models");

module.exports = {
  up: function (queryInterface, Sequelize) {
    return models.Habits.bulkCreate(
      [
        {habit: "Smoking"},
        {habit: "Nail-biting"},
        {habit: "Drinking"},
        {habit: "Being late"},
        {habit: "Fapping"},
        {habit: "Other"}
      ]
    )
  },

  down: function (queryInterface, Sequelize) {

    return models.Habits.destroy({where:{fandom: [
        "Smoking",
        "Nail-biting",
        "Drinking",
        "Being late",
        "Fapping",
        "Other"
    ]}})
  }
};
