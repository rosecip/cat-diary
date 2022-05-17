class CatSerializer {
  static getSummary(cat) {
    const allowedAttribute = ["id", "name", "breed"];

    let serializedCat = {};
    for (const attribute of allowedAttribute) {
      serializedCat[attribute] = cat[attribute];
    }
    return serializedCat;
  }
}

export default CatSerializer;
