export class User {
  constructor(
    public _id: string,
    public username: string,
    public password: string,
    public firstname: string,
    public token: string,
    public Following: string[],
    public Followers: string[],
    public flage: string,
    public image: string,
  ) {}
}
