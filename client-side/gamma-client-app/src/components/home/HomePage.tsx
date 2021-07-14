import { observer } from "mobx-react-lite";
import { Posts } from "../posts/Posts";
import { Tags } from "../tag/tags";

export const HomePage: React.FC = observer((props) => {

    return (
        <>
            <div className="row">
                <Posts />
                <Tags />
            </div>
        </>
    )
})