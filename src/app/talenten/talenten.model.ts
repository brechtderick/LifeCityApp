interface TalentenJson {
    id: number;
      naam : string;
      user: string;
  }

  export class Talenten {
      private _id: number = 0;
      constructor(
          private _naam: string,
          private _user: string,
      ){}

        static fromJSON(json: TalentenJson): Talenten {
            const talent = new Talenten(json.naam,json.user);
            talent._id = json.id;
            return talent;        
        }

        toJSON(): Talenten {
            return <Talenten>{
                naam: this.naam,
                user: this.user
            }
        }
        get id():number {
            return this._id;
        }

        get naam():string {
            return this._naam;
        }

        get user():string {
            return this._user;
        }

  }