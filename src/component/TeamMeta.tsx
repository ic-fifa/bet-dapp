import { Avatar, Card } from '@douyinfe/semi-ui';
import React, { useEffect, useState } from 'react';
import { Teams } from '../model/utils/config';

interface Props {
    teamName: string
}
export const TeamMeta: React.FC<Props> = (props) => {
    const [icon, setIcon] = useState<string>('');
    const { teamName } = props;
    const { Meta } = Card;

    useEffect(() => {
        const team = Teams.find(({ name }) => name === teamName)
        const teamIcon = require(`../image/teams/${team?.icon}`).default;
        setIcon(teamIcon)
    }, [teamName])
    return <Meta title={teamName} avatar={<Avatar src={icon} alt={teamName} style={{borderRadius:0}} />} />
}