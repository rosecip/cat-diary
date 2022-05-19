const Model = require("./Model.js")

class Cat extends Model {
  static get tableName() {
    return "cats"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "breed"],
      properties: {
        name: { type: "string" },
        breed: { type: "string" },
      },
    }
  }

  static get relationMappings() {
    const { DiaryEntry } = require("./index.js")
    return {
      diaryEntries: {
        relation: Model.HasManyRelation,
        modelClass: DiaryEntry,
        join: {
          from: "cats.id",
          to: "diaryEntries.catId",
        },
      },
    }
  }
}

module.exports = Cat
