
import { observer } from "mobx-react-lite";
import { Fragment } from 'react';
import { Link } from "react-router-dom";
import { ICategoryModel } from "../../app/models/categoryModel";
import { v4 as uuidv4 } from 'uuid';


interface ICategoryRecursive {
    categoryies: ICategoryModel[];
    parentId: string | null;
    item?: ICategoryModel;
    count?: number;
}


export const CategoryRecursiveComponent: React.FC<ICategoryRecursive> = observer((props) => {

    return (
        <Fragment key={"out_ul_" + uuidv4()}>
            {
                (props.categoryies.some(c => c.ParentId === props.parentId)) ?
                    <Fragment>
                        <ul className="submenu">
                            {
                                props.categoryies.filter(c => c.ParentId === props.parentId).map((child, index) => {
                                    return (
                                        <Fragment key={"child_" + child.Id}>
                                            <li className="subitem">
                                                <Link to={`/posts/category/${child.Id}`}>
                                                    {child.Title}
                                                </Link>
                                                {
                                                    (props.categoryies.some(c => c.ParentId === child.Id))
                                                        ? <>
                                                            <span className="plus"></span>
                                                        </>
                                                        : null
                                                }

                                                <CategoryRecursiveComponent categoryies={props.categoryies} parentId={child.Id} />

                                            </li>
                                        </Fragment>
                                    )
                                })
                            }
                        </ul>
                    </Fragment>
                    :
                    null
            }
        </Fragment>
    )
})