/* eslint-disable no-console */
import { connection } from "../boot.js"
import CatSeeder from "./seeders/CatSeeder.js"

class Seeder {
  static async seed() {

    console.log("seeding cats...")
    await CatSeeder.seed()
    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder