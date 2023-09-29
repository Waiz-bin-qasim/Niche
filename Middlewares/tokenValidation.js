export const resetPasswordCheck = (req, res, next) => {
  try {
    const { type } = req.body;
    if (type === "Reset Password") {
      next();
      return;
    }
    res.status(403).json({
      success: false,
      message: "Access Not Allowed",
      result: {},
    });
  } catch (error) {
    res.status(403).send(error);
  }
};
export const adminCheck = (req, res, next) => {
  try {
    const { type } = req.body;
    if (type === "Admin") {
      req.headers.id = req.body.id;
      next();
      return;
    }
    res.status(403).json({
      success: false,
      message: "Access Not Allowed",
      result: {},
    });
  } catch (error) {
    res.status(403).send(error);
  }
};
export const sellerCheck = (req, res, next) => {
  try {
    const { role } = req.body;
    if (role === "seller") {
      req.headers.user_id = req.body.user_id;
      next();
      return;
    }
    res.status(403).json({
      success: false,
      message: "Access Not Allowed",
      result: {},
    });
  } catch (error) {
    res.status(403).send(error);
  }
};

export const buyerCheck = (req, res, next) => {
  try {
    const { role } = req.body;
    if (role === "buyer") {
      req.headers.user_id = req.body.user_id;
      next();
      return;
    }
    res.status(403).json({
      success: false,
      message: "Access Not Allowed",
      result: {},
    });
  } catch (error) {
    res.status(403).send(error);
  }
};
