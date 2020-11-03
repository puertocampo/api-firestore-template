import moment from 'moment-timezone'

export class User {
  constructor(name: string = '') {
    this._name = name
  }
  private _id: string;
  private _name: string;
  private _createdAt: moment.Moment;
  private _updatedAt: moment.Moment;

  get id(): string {
    return this._id
  }

  set id(id: string) {
    this._id = id
  }

  get name(): string {
    return this._name
  }

  set name(name: string) {
    this._name = name
  }

  get createdAt(): moment.Moment {
    return this._createdAt
  }

  getUTCCreatedAt(): string {
    if (this._createdAt) {
      return this._createdAt.utc().format('YYYY-MM-DD HH:mm:ss')
    }
    return null
  }

  set createdAt(t: moment.Moment) {
    this._createdAt = t
  }

  get updatedAt(): moment.Moment {
    return this._updatedAt
  }

  getUTCUpdatedAt(): string {
    if (this._updatedAt) {
      return this._updatedAt.utc().format('YYYY-MM-DD HH:mm:ss')
    }
    return null
  }

  set updatedAt(t: moment.Moment) {
    this._updatedAt = t
  }
}
