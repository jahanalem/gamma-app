import { Link } from "react-router-dom"
import { ITagModel } from "../../app/models/tagModel"


interface ITagsProps {
    tags: ITagModel[];
}

export const Tags: React.FC<ITagsProps> = (props) => {
    return (
        <>
            <aside id="sidebar" className="col-xs-12 col-lg-3">
                <div className="card my-4">
                    <h5 className="card-header"><span className="fa fa-tag mr-1"> </span>Tags</h5>
                    <div className="card-body">
                        <div id="tagList" className="row">
                            <div className="col-lg-12">
                                <ul className="list-unstyled mb-0">
                                    {props.tags.map((tag, index) => {
                                        return (
                                            <li key={index}>
                                                <Link to="#" className="btn btn-sm btn-success">
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
}