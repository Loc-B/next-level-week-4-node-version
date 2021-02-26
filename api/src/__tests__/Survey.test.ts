import request from "supertest";
import { getConnection } from "typeorm";

import {app} from "../app";
import createConnection from "../database";

describe("Surveys", ()=>{
    beforeAll(async ()=>{
        const connection = await createConnection();
        await connection.runMigrations();
    });
    afterAll(async()=>{
        const connection = getConnection();
        await connection.dropDatabase();
        await connection.close();
    })


    it("Testar se nova pesquisa é criada", async()=>{
        const response = await request(app).post("/surveys").send({
            title: "Exemplo de titulo",
            description: "Exemplo",
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
    });

    it("Testar se as pesquisas estão disponíveis", async()=>{
        await request(app).post("/surveys").send({
            title: "Exemplo de titulo2",
            description: "Exemplo2",
        });
        const response = await request(app).get("/surveys");

        expect(response.body.length).toBe(2);
    });
})
