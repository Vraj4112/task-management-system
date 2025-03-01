const Builder = require("../utilities/response_builder");

let resultHandler = (req, res) => {
  console.log("result log");
  res.status(200).json(
    new Builder(res.status || "success", res.code || "200")
      .setMessage(res.message || "ok")
      .setPagination(res.totalRecords, res.page, res.pages)
      .setResultData(res.result)
      .build()
  );
};
module.exports = resultHandler;
