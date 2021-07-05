export const USERROLES: UserRoles = {
    ADMINISTRATOR: "ADMINISTRATOR", //"Administrator",
    CONTRIBUTOR: "CONTRIBUTOR" //"Contributor"
}

export type UserRoles = {
    ADMINISTRATOR: string,
    CONTRIBUTOR: string,
}

// export const ACCESSLEVELS: accessLevels = {
//     ADMINISTRATOR: 100,
//     CONTRIBUTOR: 10,
// };

export type accessLevels = {
    ADMINISTRATOR: number,
    CONTRIBUTOR: number,
}

export const ACCESSLEVELS: { [key: string]: number } = {
    ADMINISTRATOR: 100,
    CONTRIBUTOR: 10,
}