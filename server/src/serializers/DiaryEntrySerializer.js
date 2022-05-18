import UserSerializer from "./UserSerializer.js";

class DiaryEntrySerializer {
  static async getSummary(diaryEntry) {
    try {
      const allowedAttributes = ["id", "date", "entry", "metCat", "ownCat", "catId", "userId"];

      let serializedDiaryEntry = {};
      for (const attribute of allowedAttributes) {
        serializedDiaryEntry[attribute] = diaryEntry[attribute];
      }
      const relatedUser = await diaryEntry.$relatedQuery("user");
      const serializedUser = UserSerializer.getSummary(relatedUser);

      serializedDiaryEntry.user = serializedUser;
      return serializedDiaryEntry;
    } catch (error) {
      throw error;
    }
  }
}

export default DiaryEntrySerializer;
