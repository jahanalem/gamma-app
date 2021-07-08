import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";

import { LoadingComponent } from "../../layout/LoadingComponent";

import { Posts } from "../posts/Posts";
import { Tags } from "../tag/tags";

export const HomePage: React.FC = observer((props) => {
    const { postStore, tagStore } = useStore();

    //if (postStore.loadingInitial) return <LoadingComponent content="Loading posts" />
    //if (tagStore.loadingInitial) return <LoadingComponent content="Loading tags" />

    return (
        <>
            <div className="row">
                <Posts />
                <Tags />
            </div>
        </>
    )
})