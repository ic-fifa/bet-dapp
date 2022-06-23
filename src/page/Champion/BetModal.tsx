import { Modal, InputNumber, Button, Notification, Spin } from "@douyinfe/semi-ui"
import React, { useState } from "react";

interface Props {
    visible: boolean;
    name: string;
    title: string;
    cancelBet: () => void;
}

export const BetModal: React.FC<Props> = ({ visible, name, title, cancelBet }) => {

    const [amount, setAmount] = useState(1);
    const [loading, SetLoading] = useState(false)

    const log = (v) => {
        console.log(`Changed to: [${typeof v}] ${v}`);
        setAmount(v)
    };
    const bet = () => {
        console.log(`bet ${name} ${amount} USDT`);
        SetLoading(true);
        setTimeout(() => {
            const randomBoolean = () => Math.random() >= 0.5;
            randomBoolean() ? Notification.success({
                title: "Success Bet",
                content: `Success Bet ${title} ${amount} USDT`,
                duration: 3,
                theme: "light"

            }) :
                Notification.error({
                    title: "Fail Bet",
                    content: `Fail Bet`,
                    duration: 3,
                    theme: "light"
                })
            closeThen()
        }, 2000)
    }

    const closeThen = () => {
        setAmount(1);
        cancelBet();
        SetLoading(false);
    }
    return (
        <Modal
            header={<h3 style={{ textAlign: 'center', fontSize: 24, margin: 40 }}>Bet {title}</h3>}
            footer={null}
            visible={visible}
            onCancel={closeThen}
        >
            <div style={{ width: "100%", paddingBottom: 30, textAlign: 'center' }}>
                {
                    loading ? <Spin size="large" tip="Betting..." /> :
                        <>
                            <InputNumber
                                onChange={log}
                                defaultValue={1}
                                min={1}
                                max={100}
                                suffix={'USDT'}
                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            // parser={value => value.replace(/\U\s?|(,*)/g, '')}
                            />
                            <br />
                            <br />
                            <br />
                            <Button theme='solid' type='primary' style={{ width: "40%", marginRight: 10 }} onClick={bet}>Bet</Button>
                            <Button theme='solid' type='tertiary' style={{ width: "40%" }} onClick={closeThen}>Cancel</Button>
                        </>
                }


            </div>



        </Modal>
    )


}