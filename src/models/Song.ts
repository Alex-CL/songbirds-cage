type SongDTO = {
  id: string
  title: string
  duration: string
  album?: string
  year?: number
  lyrics?: string
}

export class Song {
  private readonly _id: string
  private readonly _title: string
  private readonly _duration: string

  private _album: string | undefined
  private _year: number | undefined
  private _lyrics: string | undefined

  constructor(p: SongDTO) {
    this._id = p.id
    this._title = p.title
    this._duration = p.duration
    this._album = p.album
    this._year = p.year
    this._lyrics = p.lyrics
  }

  get id(): string {
    return this._id
  }

  get title(): string {
    return this._title
  }

  get duration(): string {
    return this._duration
  }

  get album(): string | undefined {
    return this._album
  }

  get year(): number | undefined {
    return this._year
  }

  get lyrics(): string | undefined {
    return this._lyrics
  }

  set album(a: string | undefined) {
    this._album = a
  }

  set year(y: number | undefined) {
    this._year = y
  }

  set lyrics(l: string | undefined) {
    this._lyrics = l
  }
}
