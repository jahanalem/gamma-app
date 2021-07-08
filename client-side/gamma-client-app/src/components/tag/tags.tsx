
import { observer } from "mobx-react-lite";
import { SyntheticEvent, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import { LoadingComponent } from "../../layout/LoadingComponent";



interface stateType {
    tagId: string;
    catId: string;
}

export const Tags: React.FC = observer(() => {
    const history = useHistory();
    const { tagStore } = useStore();

    //const location = useLocation<stateType>();
    //const { tagId } = location.state || { tagId: null };
    useEffect(() => {
        tagStore.loadTags();

    }, [tagStore]);
    
    const tagHandler = (e: SyntheticEvent<HTMLAnchorElement>, tagId: string) => {
        e.preventDefault();
        //tagStore.setSelectedTagId(tagId);
        history.push(`/posts/tag/${tagId}`);
    }
    // if (tagStore.loadingInitial) return <LoadingComponent content="Loading tags" />
    return (
        <>
            <aside id="sidebar" className="col-xs-12 col-lg-3">
                <div className="card my-4">
                    <h5 className="card-header"><span className="fa fa-tag mr-1"> </span>Tags</h5>
                    <div className="card-body">
                        <div id="tagList" className="row">
                            <div className="col-lg-12">
                                <ul className="list-unstyled mb-0">
                                    {tagStore.tagsSortedByTitle.map((tag, index) => {
                                        return (
                                            <li key={index}>
                                                <Link id={tag.Id} to={`/posts/tag/${tag.Id}`} onClick={(e) => tagHandler(e, tag.Id)} className="btn btn-sm btn-success">
                                                    <span className="fa fa-tag mr-1"> </span>{tag.Title}
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    )
})