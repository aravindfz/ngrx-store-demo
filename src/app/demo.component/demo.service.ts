import { Injectable } from '@angular/core';
import { Store } from "@ngrx/store";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/skipWhile';
import { AppStore } from "app/common.store/app.store";
import { Demo } from "app/demo.component/demo.model";
import { Http } from "@angular/http";
import { ACTIONS } from "app/common.store/reducer";
import * as _ from "lodash";

@Injectable()
export class DemoService {
    URL: string = 'assets/api/data.json'
    constructor(private appStore: Store<AppStore>, private http: Http) { }

    getData() {
        this.http.get(this.URL)
            .map(response => <Demo[]>response.json())
            .skipWhile(data => { return _.isEmpty(data) })
            .subscribe(data => {
                this.appStore.dispatch({
                    type: ACTIONS.LOAD_DATA,
                    payload: {
                        demoSlice: data
                    }
                });
            }, (error) => {

            }, () => {
                console.log('completeion came!!!!!')
            });
    }
}