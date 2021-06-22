import { makeAutoObservable } from "mobx";

export default class CommentStore{
    constructor(){
        makeAutoObservable(this);
    }
}