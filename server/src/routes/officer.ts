import { NextFunction, Response, Router } from "express";
import { processQuery } from "../lib/database";
import IRequest from "../interfaces/IRequest";
import { useAuth } from "../hooks";

const router: Router = Router();

router.get(
  "/my-officers",
  useAuth,
  useOfficerAuth,
  async (req: IRequest, res: Response) => {
    const officers = await processQuery(
      "SELECT * FROM `officers` WHERE `user_id` = ?",
      [req.user?.id]
    );

    return res.json({ officers, status: "success" });
  }
);

router.get(
  "/status/:id",
  useAuth,
  useOfficerAuth,
  async (req: IRequest, res: Response) => {
    const { id } = req.params;
    const officer = await processQuery(
      "SELECT * FROM `officers` WHERE  `officers`.`id` = ?",
      [id]
    );

    return res.json({ officer: officer[0], status: "success" });
  }
);

router.put(
  "/status/:id",
  useAuth,
  useOfficerAuth,
  async (req: IRequest, res: Response) => {
    const { id } = req.params;
    const { status, status2 } = req.body;

    await processQuery(
      "UPDATE `officers` SET `status` = ?, `status2` = ? WHERE `id` = ?",
      [status, status2, id]
    );

    const updatedOfficer = await processQuery(
      "SELECT * FROM `officers` WHERE `id` = ?",
      [id]
    );

    return res.json({ status: "success", officer: updatedOfficer });
  }
);

/**
 *
 * Check if the authenticated user has permission to access '/officer' routes
 */
async function useOfficerAuth(
  req: IRequest,
  res: Response,
  next: NextFunction
) {
  const user = await processQuery("SELECT `leo` from `users` WHERE `id` = ?", [
    req.user?.id,
  ]);

  if (!user[0]) {
    res.json({
      error: "user not found",
      status: "error",
    });
    return;
  }

  if (user[0].leo !== "1") {
    res.json({
      error: "Forbidden",
      status: "error",
    });
    return;
  }

  next();
}

export default router;