const Number = require("../models/Number");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllNumbers = async (req, res) => {
  const numbers = await Number.find({ createdBy: req.user.userId }).sort({
    numbername: 1,
  });
  res.status(StatusCodes.OK).json({ numbers, count: numbers.length });
};

const getNumber = async (req, res) => {
  const {
    user: { userId },
    params: { id: numberId },
  } = req;

  const number = await Number.findOne({
    _id: numberId,
    createdBy: userId,
  });

  if (!number) {
    throw new NotFoundError(`No number with such id ${numberId}`);
  }
  res.status(StatusCodes.OK).json(number);
};

const createNumber = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const number = await Number.create(req.body);
  res.status(StatusCodes.CREATED).json({ number });
};

const updateNumber = async (req, res) => {
  const {
    body: { numbername, countrycode, phonenumber },
    user: { userId },
    params: { id: numberId },
  } = req;

  if (numbername === "" || countrycode === "" || phonenumber === "") {
    throw new BadRequestError(
      "Name, Countrycode, and Number fields cannot be empty"
    );
  }
  const number = await Number.findByIdAndUpdate(
    { _id: numberId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!number) {
    throw new NotFoundError(`No number with id ${numberId}`);
  }
  res.status(StatusCodes.OK).json({ number });
};

const deleteNumber = async (req, res) => {
  const {
    user: { userId },
    params: { id: numberId },
  } = req;

  const number = await Number.findOneAndRemove({
    _id: numberId,
    createdBy: userId,
  });
  if (!number) {
    throw new NotFoundError(`No number with specific id ${numberId}`);
  }
  res.status(StatusCodes.OK).send();
};

module.exports = {
  createNumber,
  deleteNumber,
  getAllNumbers,
  updateNumber,
  getNumber,
};
