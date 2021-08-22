interface HulpbronnenJson {
    id: number;
    naam: string;
    user: string;
    beschrijving: string;
}

export class Hulpbronnen {
    private _id: number = 0;
    constructor(
        private _naam: string,
        private _user: string,
        private _beschrijving: string,
    ){}

    static fromJSON(json: HulpbronnenJson): Hulpbronnen {
        const hulpbron = new Hulpbronnen(json.naam,json.user,json.beschrijving);
        hulpbron._id = json.id;
        return hulpbron;
    }

    toJSON(): HulpbronnenJson {
        return <HulpbronnenJson>{
            naam: this.naam,
            user: this.user,
            beschrijving: this.beschrijving
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

    get beschrijving():string {
        return this._beschrijving;
    }
}