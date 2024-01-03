const mongodb = require("mongodb");

const { getDatabase } = require("../util/database");

class Post {
  constructor(title, description, image, id) {
    this.title = title;
    this.description = description;
    this.image = image;
    this._id = id ? new mongodb.ObjectId(id) : null;
  }
  create() {
    const db = getDatabase();
    let temDb;
    if (this._id) {
      temDb = db
        .collection("posts")
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      temDb = db.collection("posts").insertOne(this);
    }
    return temDb
      .then((post) => {
        console.log(post);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static getPosts() {
    const db = getDatabase();
    return db
      .collection("posts")
      .find()
      .sort({ title: 1 })
      .toArray()
      .then((posts) => {
        // console.log(posts);
        return posts;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static getPost(postId) {
    const db = getDatabase();
    return db
      .collection("posts")
      .find({ _id: new mongodb.ObjectId(postId) })
      .next()
      .then((post) => {
        // console.log(post);
        return post;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static getOldPost(postId) {
    const db = getDatabase();
    return db
      .collection("posts")
      .find({ _id: new mongodb.ObjectId(postId) })
      .next()
      .then((post) => {
        if (!post) {
          redi;
        }
        // console.log(post);
        return post;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static deletePost(id) {
    const db = getDatabase();
    return db
      .collection("posts")
      .deleteOne({ _id: new mongodb.ObjectId(id) })
      .then((post) => {
        console.log(post);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

// class Edit {
//   constructor(title, description, image, id) {
//     (this.title = title),
//       (this.description = description),
//       (this.image = image);
//     this._id = new mongodb.ObjectId(id);
//   }
//   edit() {
//     const db = getDatabase();
//     return db.collection("posts").updateOne({ _id: this._id }, { $set: this });
//   }
// }

module.exports = { Post };
