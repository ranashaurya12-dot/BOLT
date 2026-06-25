import { register,login,logout } from "../controller/authcontroller.js";
import { userAuth } from "../middleware/authprotect.js";
import express from "express";
import userModel from "../model/user.js";

const userRouter=express.Router();

userRouter.post("/register",register);
userRouter.post("/login",login);
userRouter.post("/logout",logout);
userRouter.get("/me", userAuth, async (req, res) => {
    console.log("🔥 /api/auth/me called");
  try {
    const user = await userModel
      .findById(req.user.id)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

export default userRouter;