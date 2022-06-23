import { Typography } from "@douyinfe/semi-ui";
import { PureComponent } from "react";
import { MainLayout } from "../../component/MainLayout"

export default class Dashboard extends PureComponent {
    render() {
        const { Title } = Typography;
        return (
            <MainLayout>
                <Title type="secondary" heading={2} className="text-center">Dashboard page</Title>
            </MainLayout>
        )
    }
}