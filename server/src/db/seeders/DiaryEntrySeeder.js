import DiaryEntry from "../../models/DiaryEntry.js"

class DiaryEntrySeeder {
  static async seed() {
    const diaryEntryData = [
      {
        metCat: true,
        ownCat: false,
        date: "5/17/22",
        entry: "Today I got no work done because Olive was sleeping on my keyboard.",
        catId: 2,
        userId: 1,
      },
      {
        metCat: false,
        ownCat: false,
        date: "5/17/22",
        entry: "Jasper ate my lasagna again today.",
        catId: 1,
        userId: 1,
      },
    ]

    for (const singleDiaryEntryData of diaryEntryData) {
      const currentDiaryEntry = await DiaryEntry.query().findOne(singleDiaryEntryData)
      if (!currentDiaryEntry) {
        await DiaryEntry.query().insert(singleDiaryEntryData)
      }
    }
  }
}

export default DiaryEntrySeeder
