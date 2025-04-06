import mongoose from 'mongoose';
import { Task } from '../models/task.models.js';
import { User } from '../models/users.models.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/AsyncHandler.js';

// Creating task

const createTask = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user?._id);

  //   console.log(user.username);
  if (!user) {
    throw new ApiError(401, 'Unauthorized Access!!');
  }

  const { title, description } = req.body;

  if (!(title && description)) {
    throw new ApiError(400, 'Both Fields are required!!');
  }

  const createdTask = await Task.create({
    title,
    description,
    user: req.user._id,
  });

  if (!createdTask) {
    throw new ApiError(500, 'Something went wrong while creating the task!!');
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        { createdTask, user: user.username },
        'Task has created success fully',
      ),
    );
});

// get task

const getAllTask = asyncHandler(async (req, res) => {
  const task = await Task.find({ user: req.user?._id });
  //   console.log(task);
  return res
    .status(200)
    .json(new ApiResponse(200, task, 'Task fetched Successfully!!'));
});

// Get Task by Id

const getTaskById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const task = await Task.findById(id);

  if (!task) {
    throw new ApiError(404, 'Task not found!!');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, task, 'Task fetched Successfully!!'));
});

// Updaate Task

const updateTask = asyncHandler(async (req, res) => {
  const { title, description, completed } = req.body;
  const { id } = req.params;

  //   console.log(req.body);
  //   console.log(req.params);
  if (!(title && description && completed)) {
    throw new ApiError(400, 'All fields are required');
  }

  const task = await Task.findByIdAndUpdate(
    id,
    {
      $set: {
        title,
        description,
        completed,
      },
    },
    { new: true },
  );

  return res
    .status(200)
    .json(new ApiResponse(200, task, 'Details Updated Successfully!!'));
});

// Delete task that completed

const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await Task.findByIdAndDelete(id);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, 'Task deleted Successfully!!'));
});

export { createTask, getAllTask, getTaskById, updateTask, deleteTask };
