const Model = require("./Model.js");

class DiaryEntry extends Model {
  static get tableName() {
    return "diaryEntries";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["metCat", "ownCat", "date", "entry"],
      properties: {
        metCat: { type: "boolean" },
        ownCat: { type: "boolean" },
        date: { type: "string" },
        entry: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    const { Cat, User } = require("./index.js");
    return {
      cats: {
        relation: Model.BelongsToOneRelation,
        modelClass: Cat,
        join: {
          from: "diaryEntries.catId",
          to: "cats.id",
        },
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "diaryEntries.userId",
          to: "users.id",
        },
      },
    };
  }
}

module.exports = DiaryEntry;
