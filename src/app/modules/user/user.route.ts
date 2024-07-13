import express from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middleware/validateRequest";
import { UserValidation } from "./user.validation";

const router = express.Router();

// create user
router.post("/", validateRequest(UserValidation.createUserValidation), UserControllers.createUser );


// uppdate user
router.put("/:userId", validateRequest(UserValidation.updateUserValidation), UserControllers.updateUser );


export const UserRoutes = router;