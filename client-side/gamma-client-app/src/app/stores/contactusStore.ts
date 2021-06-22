import { makeAutoObservable } from "mobx";

export default class ContactusStore{
    constructor(){
        makeAutoObservable(this);
    }
}