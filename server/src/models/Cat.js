const Model = require("./Model")

class Cat extends Model {

  static getTableName() {
    return "cats"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "breed"],
      properties: {
        name: { type: "string" },
        breed: { type: "string" }
      }
    }
  }
}

module.exports = Cat