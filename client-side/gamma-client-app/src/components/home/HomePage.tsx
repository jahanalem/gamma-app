import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { Posts } from "../posts/Posts";
import { Tags } from "../tag/tags";

export const HomePage: React.FC = observer(() => {

    const { tagStore } = useStore();
    const { tagsSortedByTitle } = tagStore;

    return (
        <>
            <div className="row">
                <Posts />
                <Tags  tags={tagsSortedByTitle} />
            </div>
        </>
    )
})