import mongoose from 'mongoose';

export class LeanWithId extends mongoose.Document {
  constructor(partial: Partial<LeanWithId>) {
    super();
    Object.assign(this, this.stringify_ids(partial));
  }
  stringify_ids(doc: object) {
    for (const key in doc) {
      if (key == '_id') {
        doc[key] = String(doc[key]);
        continue;
      }
      if (doc[key] instanceof Array) {
        doc[key].forEach((el, i) => {
          if (el instanceof Object) doc[key][i] = this.stringify_ids(el);
        });
      }
    }
    return { ...doc };
  }
}
