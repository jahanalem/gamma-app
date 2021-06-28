import { observer } from "mobx-react-lite";
import { Posts } from "../posts/Posts";

export const HomePage: React.FC = observer(() => {

    return (
        <>
             <Posts /> 
        </>
    )
})