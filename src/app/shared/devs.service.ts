import { Dev } from '../shared/dev.model';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class DevsService {

public devs: Dev[] = [];
public devsUpdated = new Subject<Dev[]>();

 constructor(private http: HttpClient){}

 getDevs(){

 }
}
