import User from '../models/categoy.model';
import merge from 'lodash/merge';
import errorHandler from './../helpers/dbErrorHandler';

const create = async (req, res) => {
  const category = new User(req.body);
  try {
    await category.save();
    return res.status(200).json({
      message: 'Successfully signed up!'
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

const list = async (req, res) => {
  try {
    let categories = await category.find().select('name descrition updated created');
    res.json(categories);
  } catch (err) {
    return res.status('400').json({
      error: errorHandler.getErrorMessage(err)
    })
  }
};

const userById = async (req, res, next, id) => {
  try {
    let category = await category.findById({_id: id});
    if(!category) {
      return res.status(400).json({
        error: 'User not found'
      });
    }
    req.profile = category;
    next();
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Could not retrieve user"
    });
  }
};

const read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  req.name = 'ss';
  return res.json(req.profile);
};

const update = async (req, res, next) => {
  try {
    let category = req.profile;
    category = merge(category, req.body);

    category.updated = Date.now();
    await category.save();
    category.hashed_password = '';
    category.salt = '';
    res.json(category);
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

const remove = async (req, res, next) => {
  try {
    console.log('deleted');
    let category = req.profile;
    console.log('user to remove', category);
    let deletedUser = await category.deleteOne();
    deletedUser.hashed_password = '';
    deletedUser.salt = '';
    res.json(deletedUser);
  } catch(err) {
    console.log(err);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

export default {
  create,
  list,
  read,
  remove,
  userById,
  update
};
