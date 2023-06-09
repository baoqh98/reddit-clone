
export const insertMany =(Model, data) => async (req, res, next) => {
  await Model.insertMany(data)
    .then((res) => console.log('Data inserted successfully'))
    .catch((err) => console.log(err));

  res.status(201).json({
    status: 'success',
  });
};