import request from "supertest";
import { getConnection } from "typeorm";

import {app} from "../app";
import createConnection from "../database";

describe("Users", ()=>{
    beforeAll(async ()=>{
        const connection = await createConnection();
        await connection.runMigrations();
    });
    afterAll(async()=>{
        const connection = getConnection();
        await connection.dropDatabase();
        await connection.close();
    })

    it("Testar se novo usuario é criado", async()=>{
        const response = await request(app).post("/users").send({
            email: "teste@teste.com.br",
            name: "Exemplo",
        });
        expect(response.status).toBe(201);
    });

    it("Testar se é possível criar usuario com email ja existente", async()=>{
        const response = await request(app).post("/users").send({
            email: "teste@teste",
            name: "Exemplo",
        });
        expect(response.status).toBe(400);
    });
})
