import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  private dataSource = new BehaviorSubject<any>('Initial Data');
  currentData = this.dataSource.asObservable();

  changeData(data: any) {
    this.dataSource.next(data);
  }


}
