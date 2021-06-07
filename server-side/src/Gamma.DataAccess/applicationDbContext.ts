import { PrismaClient } from "@prisma/client";
const mysql = require("mysql2");

export class ApplicationDbContext {
  constructor() {}

  private static prismaInstance: PrismaClient;
  
  static db = mysql
    .createPool({
      host: "localhost",
      user: "root",
      database: "gamma_db",
    })
    .promise();

  public static get Prisma() {
    if (ApplicationDbContext.prismaInstance) return this.prismaInstance;
    this.prismaInstance = new PrismaClient();
    return this.prismaInstance;
  }
}
