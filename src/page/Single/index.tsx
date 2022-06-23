import { Pagination } from "@douyinfe/semi-ui";
import { PureComponent } from "react";
import { MainLayout } from "../../component/MainLayout"

export default class Single extends PureComponent {
    render() {
        return (
            <MainLayout>
                <h1>single Game page</h1>
                <Pagination pageSize={5} total={80} showSizeChanger/>
            </MainLayout>
        )
    }
}