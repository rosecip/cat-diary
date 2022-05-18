import DiaryEntrySerializer from "./DiaryEntrySerializer.js";

class CatSerializer {
  static async getSummary(cat) {
    try {
      const allowedAttributes = ["id", "name", "breed"];

      let serializedCats = {};
      for (const attribute of allowedAttributes) {
        serializedCats[attribute] = cat[attribute];
      }
      const relatedDiaryEntries = await cat.$relatedQuery("diaryEntries");
      const serializedDiaryEntries = await Promise.all(
        relatedDiaryEntries.map(
          async (diaryEntry) => await DiaryEntrySerializer.getSummary(diaryEntry)
        )
      );
      serializedCats.diaryEntries = serializedDiaryEntries;
      return serializedCats;
    } catch (error) {
      throw error;
    }
  }
}

export default CatSerializer;
