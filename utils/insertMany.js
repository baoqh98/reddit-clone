exports.insertMany = (Model, data) => async (req, res, next) => {
  try {
    await Model.insertMany(data);
    console.log('Data inserted successfully');
    res.status(201).json({
      status: 'success',
    });
  } catch (error) {
    res.status(409).json({
      error,
    });
  }
};
