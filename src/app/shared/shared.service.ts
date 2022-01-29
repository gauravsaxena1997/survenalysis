import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  public covertArrayToObj (
    array: Array<any>,
    keyName: string,
    valueName: string
  ): any {
    const entries = array.map(item => [item[keyName], item[valueName]]);
    return Object.fromEntries(entries);;
  }
}
