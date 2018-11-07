export class EventModel {
  constructor(
    public type: number,
    public amount: number,
    public category: number,
    public date: string,
    public description: string,
    public id?: number,
    public catName?: string
  ) {
  }
}
