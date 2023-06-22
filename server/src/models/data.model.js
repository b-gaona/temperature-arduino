const Data = require("./data.mongo");

async function getAllData({ skip, limit }) {
  return await Data.find(
    {},
    {
      __v: 0,
    }
  )
    .skip(skip) //The number of elements to skip
    .limit(limit) //The number of elements to show
    .sort({ fecha: -1 });
}

async function saveData(temperature) {
  return await Data.create(temperature);
}

async function getCurrentData() {
  // Create an aggregation pipeline
  const pipeline = [
    { $sort: { fecha: -1} }, // Sort by seccion and fecha (latest first)
    {
      $group: {
        _id: "$seccion",
        latestRecord: { $first: "$$ROOT" }, // Select the first record in each group (latest)
      },
    },
    { $replaceRoot: { newRoot: "$latestRecord" } }, // Replace the root document with the latest record
  ];

  // Execute the aggregation pipeline
  return (await Data.aggregate(pipeline).exec());
}

module.exports = {
  getAllData,
  saveData,
  getCurrentData,
};
