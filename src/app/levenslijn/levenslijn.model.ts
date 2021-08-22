interface LevenslijnJson {
    id:number;
    naam: string;
    user:string;
    beschrijving: string;
    datum: Date;
}

export class Levenslijn{
    private _id: number = 0;
    constructor(
        private _naam: string,
        private _user:string,
        private _beschrijving:string,
        private _datum: Date
    ){}

    static fromJSON(json: LevenslijnJson): Levenslijn {
        const levenslijn = new Levenslijn(json.naam,json.user,json.beschrijving,new Date(json.datum));
        levenslijn._id = json.id;
        return levenslijn;
    }

    toJSON(): Levenslijn {
        return <Levenslijn>{
            naam: this.naam,
            user: this.user,
            beschrijving: this.beschrijving,
            datum: this.datum
        }
    }

    get id(): number {
        return this._id;
    }

    get naam(): string{
        return this._naam;
    }

    get user(): string{
        return this._user;
    }

    get beschrijving(): string{
        return this._beschrijving;
    }

    get datum(): Date{
        return this._datum;
    }
}