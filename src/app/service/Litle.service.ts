import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class LitleService {

  public back(){
    history.back()
  }

}
