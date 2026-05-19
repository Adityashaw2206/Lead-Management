import express from "express";
import protect from "../middleware/auth.middleware";
import authorizeRoles from "../middleware/role.middleware";
import {createLead, getLeads, getSingleLead, updateLead, deleteLead} from "../controllers/lead.controller";

const router = express.Router();

// CREATE LEAD

router.post("/", protect, createLead);

//GET ALL LEADS

router.get("/", protect, getLeads);

//GET SINGLE LEAD

router.get("/:id", protect, getSingleLead);

//EDIT LEAD

router.put("/:id", protect, updateLead);

//DELETE LEAD(ONLY ADMIN CAN HAVE THIS ACCESS OF THIS ROUTE)

router.delete("/:id", protect, authorizeRoles("admin"), deleteLead);

export default router;
