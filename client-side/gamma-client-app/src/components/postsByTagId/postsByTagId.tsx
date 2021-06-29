import { observer } from 'mobx-react-lite';
import { Redirect, useParams } from 'react-router-dom';

export const PostsByTagId: React.FC = observer(() => {

    let { tagId } = useParams<{ tagId?: string }>();

    return (
        <>
            <Redirect to={{ pathname: "/home", state: { tagId: tagId } }} />
        </>
    );
})