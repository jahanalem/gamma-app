import { observer } from 'mobx-react-lite';
import { Redirect, useParams } from 'react-router-dom';

export const PostsByCategoryId: React.FC = observer(() => {

    let { catId } = useParams<{ catId?: string }>();

    return (
        <>
            <Redirect to={{ pathname: "/home", state: { catId: catId } }} />
        </>
    );
})