import urlExist from "url-exist";

export const validatUrl = async (req, res, next) => {
  const { url } = req.body;
  const isExist = await urlExist(url);
  if (!isExist) return res.json({ message: "Invalid URL", type: "failure" });
  next();
};


