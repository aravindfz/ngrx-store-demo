import { Component, OnInit } from '@angular/core';
import { Demo } from "app/demo.component/demo.model";
import { Store } from "@ngrx/store";
import { AppStore } from "app/common.store/app.store";
import * as _ from "lodash";
import { ACTIONS } from "app/common.store/reducer";
import { EditableService } from "app/editable.component/editable.component.service";

@Component({
    selector: 'editable-component',
    templateUrl: './editable.component.html'
})
export class EditableComponent implements OnInit {
    data: Demo[] = [];
    constructor(private editableService: EditableService,
        private appStore: Store<AppStore>) {
        this.editableService.getData();
    }
    ngOnInit() {
        this.appStore.select('demoSlice').subscribe(data => {
            if (!_.isEmpty(data)) {
                console.log('Subscription triggered');
                this.data = _.cloneDeep(<Demo[]>data);
            }
        })
    }
    /**
     * No changes will be seen as the same data is redispatched to the store
     */
    dispatchSameData() {
        this.appStore.dispatch(
            {
                type: ACTIONS.LOAD_DATA,
                payload: {
                    demoSlice: this.data
                }
            }
        )

    }
    /**
     * Does not subscribes as only the reference is changed but still a value is modified
     */
    dispatchDataWithChanged() {
        // no subscription but data is dynamically changed as the subscription is in live
        // data flows through this pipeline
        let newData: Demo[] = this.data;
        newData[0].name = 'ARAVIND**********************'
        this.appStore.dispatch(
            {
                type: ACTIONS.LOAD_DATA,
                payload: {
                    demoSlice: newData
                }
            }
        )
    }
    /**
     * Subscribes when the object is having a different reference and also the data is changed
     */
    dispatchCompletelyNewData() {
        let newData: Demo[] = [];
        newData.push(this.data[0]);
        newData.push(this.data[1]);
        newData.push(this.data[2]);
        this.appStore.dispatch(
            {
                type: ACTIONS.LOAD_DATA,
                payload: {
                    demoSlice: newData
                }
            }
        )
    }
    /**
     * Subscribes when the reference is changed
     */
    dispatchClonedData() {
        this.appStore.dispatch(
            {
                type: ACTIONS.LOAD_DATA,
                payload: {
                    demoSlice: _.cloneDeep(this.data)
                }
            }
        )

    }
}
