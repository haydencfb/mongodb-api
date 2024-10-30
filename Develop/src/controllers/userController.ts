import User from '../models/User.js';
import { Request, Response } from 'express';

  // gets all users
  export const getUsers = async(_req: Request, res: Response) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // gets a single user
  export const getSingleUser = async(req: Request, res: Response) => {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        res.status(404).json({ message: 'No user with that ID' });
      } else {
        res.json(user);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // create a new user
  export const createUser = async(req: Request, res: Response) => {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // updates a single user
  export const updateUser = async(req: Request, res: Response) => {
    try {
      
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // deletes a single user
  export const deleteUser = async(req: Request, res: Response) => {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.studentId });

      if (!user) {
          return res.status(404).json({ message: 'No such user exists' });
      }

      // const friend = await Friend.findOneAndUpdate(
      //     { users: req.params.userId },
      //     { $pull: { users: req.params.userId } },
      //     { new: true }
      // );

      // if (!friend) {
      //     return res.status(404).json({
      //         message: 'User deleted, but no friends found',
      //     });
      // }

      return res.json({ message: 'User successfully deleted' });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // creates a friends
  export const createFriend = async(req: Request, res: Response) => {
    try {

    } catch (err) {
      res.status(500).json(err);
    }
  }

  // deletes a friend
  export const deleteFriend = async(req: Request, res: Response) => {
    try {
      // const student = await Student.findOneAndUpdate(
      //     { _id: req.params.studentId },
      //     { $pull: { assignments: { assignmentId: req.params.assignmentId } } },
      //     { runValidators: true, new: true }
      // );

      // if (!student) {
      //     return res
      //         .status(404)
      //         .json({ message: 'No student found with that ID :(' });
      // }

      // return res.json(student);
    } catch (err) {
      res.status(500).json(err);
    }
  }
