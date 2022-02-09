import { Injectable } from '@angular/core';
import { ToastrService as toastrSer } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastrService {

  constructor(private toastr: toastrSer) { }

  public success(title: string, message: string): void {
    this.toastr.success(message, title);
  }

  public error(title: string, message: string): void {
    this.toastr.error(message, title);
  }
}
