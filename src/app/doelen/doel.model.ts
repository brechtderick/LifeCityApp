interface DoelJson {
    id:number;
    naam:string;
    user:string;
    beschrijving:string;
    datum: Date;
}

export class Doel{
    private _id: number = 0;
    constructor(
        private _naam: string,
        private _user:string,
        private _beschrijving:string,
        private _datum: Date
    ){}

    static fromJSON(json: DoelJson): Doel {
        const doel = new Doel(json.naam,json.user,json.beschrijving,new Date(json.datum));
        doel._id = json.id;
        return doel;
    }

    toJSON(): Doel {
        return <Doel>{
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