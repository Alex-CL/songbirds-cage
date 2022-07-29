type ArtistDTO = {
  id: string;
  name: string;
  country: string;
  tags: string[];
  isCurrent?: boolean;
};

export class Artist {
  private readonly _id: string;
  private readonly _name: string;
  private readonly _country: string;
  private readonly _tags: string[];
  private _isCurrent: boolean;

  constructor(p: ArtistDTO) {
    this._id = p.id;
    this._name = p.name;
    this._country = p.country;
    this._tags = p.tags;
    this._isCurrent = !!p.isCurrent;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get country(): string {
    return this._country;
  }

  get tags(): string[] {
    return this._tags;
  }
  
  get isCurrent(): boolean {
  	return this._isCurrent;
  }
  
  set isCurrent(i: boolean) {
  	this._isCurrent = i
  }
  
}
