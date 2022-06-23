import { Rating, Button, Typography } from '@douyinfe/semi-ui';
import { TeamMeta } from '../../component/TeamMeta';
import { useState } from "react";
import { MainLayout } from "../../component/MainLayout";
import style from "./index.module.scss";
import session from '../../model/Session';
import { Teams } from '../../model/utils/config';
import { BetModal } from './BetModal';
const Champion = () => {

    const [betModalVisible, setBetModalVisible] = useState<boolean>(false);
    const [betName, setBetName] = useState<string>('Qatar');
    const [betTitle, setBetTitle] = useState<string>('Qatar');


    const hangChooseTeam = async (title, name) => {
        if(!session.isConnected){
            try {
                await session.connectWallet();
            } catch (error) {
                console.error(error);
            }
        }else{
            setBetModalVisible(true);
            setBetName(name);
            setBetTitle(title);
        }
    }

 
    const { Title } = Typography
    return (
        <MainLayout>
            <Title type="secondary" style={{ marginBottom: 20 }} heading={3}>Champion 所有猜中的玩家按投注份额平均分配2022个BNB</Title>
            <div className={style.listWrap}>
                {
                    Teams.map(({ title, name, group, rating }, idx) =>
                        <div className="semi-card semi-card-bordered"
                            key={idx}
                            style={{ width: 240 }}
                        >
                            <div className="semi-card-body">
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <TeamMeta teamName={title} />
                                    <Title type="secondary" heading={4}>{group}</Title>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Rating allowHalf size="small" value={rating} />
                                    <Button onClick={() => hangChooseTeam(title, name)}>Bet</Button>
                                </div>
                            </div>
                        </div >
                    )
                }
            </div>
            <BetModal visible={betModalVisible} title={betTitle} name={betName} cancelBet={() => { setBetModalVisible(false) }} />
        </MainLayout>
    )

}

export default Champion;