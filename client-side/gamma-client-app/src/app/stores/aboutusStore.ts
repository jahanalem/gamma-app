import { makeAutoObservable } from "mobx";

export default class AboutusStore{
    constructor(){
        makeAutoObservable(this);
    }
}