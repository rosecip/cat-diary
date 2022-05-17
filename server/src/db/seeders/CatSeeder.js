import Cat from "../../models/Cat.js";

class CatSeeder {
  static async seed() {
    const catData = [
      {
        name: "Jasper",
        breed: "Maine Coon",
      },
      {
        name: "Olive",
        breed: "weird little guy",
      }
    ];

    for (const singleCatData of catData) {
      const currentCat = await Cat.query().findOne(singleCatData);
      if (!currentCat) {
        await Cat.query().insert(singleCatData);
      }
    }
  }
}

export default CatSeeder;
