interface EmotieJson {
    id: number;
    beschrijving : string;
    emoties: string;
    dateAdded: Date;
}

export class Emotieregulatie {
  private _id: number = 0;
    constructor(
        private _beschrijving: string,
        private _dateAdded = new Date(),
        private _emoties: string,
    ) {}

    static fromJSON(json: EmotieJson): Emotieregulatie {
        const emotie = new Emotieregulatie(json.beschrijving, new Date(json.dateAdded), json.emoties);
        emotie._id = json.id;
        return emotie;
      }

      toJSON(): EmotieJson {
        return <EmotieJson>{
          beschrijving : this.beschrijving,
          dateAdded : this.dateAdded,
          emoties : this.emoties
        }
      }
      get id(): number {
        return this._id;
      }

    get beschrijving(): string {
        return this._beschrijving;
      }

      get dateAdded(): Date{
        return this._dateAdded;
      }

      get emoties(): string{
        return this._emoties;
      }
}
