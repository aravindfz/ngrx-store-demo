import { Demo } from "app/demo.component/demo.model";

export interface DemoSlice {
    data: Demo[];
}
export interface AppStore {
    demoSlice: DemoSlice;
}
