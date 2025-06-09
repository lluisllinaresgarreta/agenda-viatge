import { Router } from "express";
import {
    getClients,
    getClientById,
    getClientsByDestination,
    createClient,
    updateClient,
    deleteClient,
} from "../controllers/clients.controller.js";

const router = Router();

router.get("/clients", getClients);
router.get("/clients/:id", getClientById);
router.get("/clients", getClientsByDestination); // Aquest s'activa si hi ha query param ?destination=
router.post("/clients", createClient);
router.put("/clients/:id", updateClient);
router.delete("/clients/:id", deleteClient);

export default router;
